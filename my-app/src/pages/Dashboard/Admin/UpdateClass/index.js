import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { Text, ScrollView, View, TextInput, Alert, ActivityIndicator } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { TextInputMask } from 'react-native-masked-text'
import Spinner from 'react-native-loading-spinner-overlay'
import { Formik } from 'formik'
import * as Yup from 'yup'
import api from '../../../../services/api'

import { styles } from '../../../../styles/styles-form-classes'
import { Button } from '../../../../components/Button'

export const UpdateClass = () => {
  const [loading, setLoading] = useState(false)
  const [loadingPage, setLoadingPage] = useState(true)
  const [formData, setFormData] = useState([])
  const [modules, setModules] = useState([])

  const { id_class } = useRoute().params
  const navigation = useNavigation()

  const FormSchema = Yup.object().shape({
    moduleName: Yup
      .string()
      .required('Campo obrigatório')
    ,
    name: Yup
      .string()
      .required('Campo obrigatório')
    ,
    description: Yup
      .string()
      .max(255)
      .required('Campo obrigatório')
    ,
    date: Yup
      .string()
      .required('Campo obrigatório')
    ,
    time: Yup
      .string()
      .required('Campo obrigatório')
    ,
  })
  

  useEffect(() => {
    const readModules = async () => {
      setLoadingPage(true)
      const modules = await api.get('/modules')
      const data = modules.data
      setModules(data)
      
      setTimeout(()=>{
        return setLoadingPage(false)
      }, 1000)
    }
    readModules()
  }, [id_class])

  useEffect(() => {
    const readClass = async () => {
      setLoadingPage(true)
      const classe = await api.get(`/classes/${id_class}`)
      const data = classe.data

      const parsedClass = {
        name: data.name,
        description: data.description,
        time: data.time,
        date: data.date,
        moduleName: data.module.name,
      }
      setFormData(parsedClass)
      setTimeout(()=>{
        return setLoadingPage(false)
      }, 1000)
    }
    readClass()
  }, [id_class])

  const handleChange = (field, value) => {
    return setFormData({ ...formData, [field]: value })
  }

  const submitForm = async (values) => {
    setLoading(true)
    const {
      moduleName,
      name,
      time,
      date,
      description,
    } = values

    const module = modules.find((module) => module.name === moduleName)
    const updateClass = await api.put(`/classes/${id_class}`, { name, time, date, description, id_module: module.id })

    const data = updateClass.data
    Alert.alert(data.msg)
    setLoading(false)

    navigation.navigate('ListModules')
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!loadingPage ? (
        <>
          <Spinner
            visible={loading}
            textContent="Loading..."
            textStyle={{ color: '#fff' }}
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
                <Text style={styles.label}>Escolha seu modulo</Text>
                <View style={styles.box_picker}>
                  <Picker
                    mode="dialog"
                    style={styles.picker}
                    selectedValue={formData.moduleName}
                    onValueChange={(moduleName) => handleChange('moduleName', moduleName)}>
                    <Picker.Item label='Escolha seu modulo' value='' />

                    {modules.length > 0 && modules.map((module) => (
                      <Picker.Item label={module.name} value={module.name} />
                    ))}
                  </Picker>
                </View>

                <Text style={styles.label}>Nome da aula</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite o nome da aula"
                    value={formData.name}
                    onChangeText={(name) => handleChange('name', name)}
                  />
                  <Text style={styles.error}>{errors.name}</Text>
                <Text style={styles.label}>Tempo em minutos</Text>
                  <TextInputMask
                    style={styles.input}
                    value={formData.time}
                    placeholder="Ex: 60"
                    type="only-numbers"
                    onChangeText={(time) => handleChange('time', time)}
                  />
                  <Text style={styles.error}>{errors.time}</Text>
                <Text style={styles.label}>Date</Text>
                  <TextInputMask
                    style={styles.input}
                    placeholder="DD/MM/YYYY"
                    value={formData.date}
                    type="datetime"
                    options={{
                      format: 'DD/MM/YYYY'
                    }}
                    onChangeText={(date) => handleChange('date', date)}
                  />
                  <Text style={styles.error}>{errors.date}</Text>
                <Text style={styles.label}>Descrição da aula</Text>
                  <TextInput
                    style={styles.textarea}
                    value={formData.description}
                    placeholder="Digite sua descrição"
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(description) => handleChange('description', description)}
                  />
                  <Text style={styles.error}>{errors.description}</Text>
                <Button
                  title='Atualizar aula'
                  onPress={() => handleSubmit()}
                />
              </View>
            )}
          </Formik>
        </>
      ):(
        <ActivityIndicator size="large" color="black" animating={loadingPage}/>
      )}

    </ScrollView>
  )
}
