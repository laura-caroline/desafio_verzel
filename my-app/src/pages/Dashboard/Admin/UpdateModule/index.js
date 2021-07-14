import React, { useEffect, useState } from 'react'
import { Text, ScrollView, View, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import { Formik } from 'formik'
import * as Yup from 'yup'
import api from '../../../../services/api'
import { styles } from '../../../../styles/styles-form-modules'
import { Button } from '../../../../components/Button'

export const UpdateModule = () => {
  const [loading, setLoading] = useState(false)
  const [loadingPage, setLoadingPage] = useState(true)
  const [formData, setFormData] = useState([])

  const { id_module } = useRoute().params
  const navigation = useNavigation()

  const FormSchema = Yup.object().shape({
    name: Yup
      .string()
      .required('Campo obrigatório')
    ,
    description: Yup
      .string()
      .max(255)
      .required('Campo obrigatório')
    ,
  })


  useEffect(() => {
    const readModule = async () => {
      setLoadingPage(true)
      const module = await api.get(`/modules/${id_module}`)
      const data = module.data
      setFormData(data)
      
      setTimeout(()=>{
        return setLoadingPage(false)
      }, 1000)
    }
    readModule()
  }, [id_module])

  

  const submitForm = async (values) => {
    setLoading(true)
    const updateModule = await api.put(`/modules/${id_module}`, values)
    const data = updateModule.data
    Alert.alert(data.msg)
    setLoading(false)

    return navigation.navigate('ListModules')
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loadingPage ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
          <>
            <Spinner
              visible={loading}
              textContent="Loading..."
              textStyle={{ color: "#fff" }}
            />
            <Formik
              initialValues={formData}
              enableReinitialize={true}
              validationSchema={FormSchema}
              onSubmit={async (values) => {
                return await submitForm(values)
              }}
            >
              {({ errors, handleSubmit }) => (
                <View style={styles.box_content}>
                  <Text style={styles.label}>Nome do modulo:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do seu modulo"
                    value={formData.name}
                    onChangeText={(name) => setFormData({ ...formData, name })}
                  />
                  <Text style={styles.error}>{errors.name}</Text>
                  <Text style={styles.label}>Descrição do modulo:</Text>
                  <TextInput
                    style={styles.textarea}
                    value={formData.description}
                    placeholder="Digite sua descrição"
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(description) => setFormData({ ...formData, description })}
                  />
                  <Text style={styles.error}>{errors.description}</Text>
                  <Button
                    title="Atualizar modulo"
                    onPress={() => handleSubmit()}
                  />
                </View>
              )}
            </Formik>
          </>
        )}
    </ScrollView>
  )
}
