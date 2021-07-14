import React, {useEffect, useState}from 'react'
import { Text, ScrollView, View, TextInput, Alert } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import { Formik } from 'formik'
import * as Yup from 'yup'
import api from '../../../../services/api'

import { styles } from '../../../../styles/styles-form-modules'
import {Button} from '../../../../components/Button'

export const CreateModule = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({})

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

  useEffect(()=>{
    const unsubscribe = navigation.addListener('blur', ()=>{
      return setFormData({})
    })
    return unsubscribe
  },[navigation])

  const submitForm = async (values) => {
    const newModule = await api.post('/modules', values)
    const data = newModule.data
    Alert.alert('', data.msg)
    setLoading(false)
    
    return navigation.navigate('ListModules') 
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Spinner
        visible={loading}
        textContent="Loading..."
        textStyle={{color: '#FFF'}}
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
            <Text style={styles.label}>Nome do modulo</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome do seu modulo"
                value={formData.name}
                onChangeText={(name) => setFormData({ ...formData, name })}
              />
              <Text style={styles.error}>{errors.name && errors.name}</Text>
            <Text style={styles.label}>Descrição do modulo</Text>
              <TextInput
                value={formData.description}
                style={styles.textarea}
                placeholder="Digite sua descrição"
                multiline={true}
                numberOfLines={5}
                onChangeText={(description) => setFormData({ ...formData, description })}
              />
              <Text style={styles.error}>{errors.description}</Text>
            <Button
              title="Criar modulo"
              onPress={()=> handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}
