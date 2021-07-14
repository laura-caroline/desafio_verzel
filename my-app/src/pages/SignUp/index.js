import React, {useEffect, useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import { TextInput, Text, ScrollView, View, Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Spinner from 'react-native-loading-spinner-overlay'
import api from '../../services/api'

import {styles} from '../../styles/styles-form-sign'
import {Button} from '../../components/Button'


export const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState([])

  const navigation = useNavigation()

  const FormSchema = Yup.object().shape({
    user: Yup
      .string()
      .matches(/^(\w+)\@(\w+)(\W+\w+)+/, "email invalido")
      .required('Campo obrigatório')
    ,
    password: Yup
      .string()
      .required('Campo obrigatório')
    ,
  })

  useEffect(()=>{
    const unsubscribe = navigation.addListener('blur', ()=>{
      setFormData({})
    })
    return unsubscribe
  },[navigation])
  
  const submitForm = async (values, setFieldError) => {
    setLoading(true)
    try{
      const newUser = await api.post('/users', values)
      const data = newUser.data
      setLoading(false)
      Alert.alert('Sucess', data.msg)

      return navigation.navigate('SignIn')
    }
    catch(error){
      setLoading(false)
      return setFieldError('password', error.response.data.msg)
    }
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Spinner
        visible={loading}
        textContent="Loading..."
        textStyle={{color: "#fff"}}
      />
      <Formik
        initialValues={formData}
        enableReinitialize={true}
        validationSchema={FormSchema}
        onSubmit={async (values, { setFieldError }) => {
          return await submitForm(values, setFieldError)
        }}
      >
        {({ handleSubmit, errors }) => (
          <View style={styles.box_content}>
            <Text style={styles.label}>Digite seu email</Text>
            <TextInput
              value={formData.user}
              style={styles.input}
              autoCapitalize="none"
              placeholder="Digite seu email:"
              onChangeText={(user)=> setFormData({...formData, user})}
            />
            <Text style={styles.error}>{errors.user}</Text>
            <Text style={styles.label}>Digite sua senha</Text>
              <TextInput
                value={formData.password}
                style={styles.input}  
                secureTextEntry
                autoCapitalize="none"
                placeholder="Digite sua senha:"
                onChangeText={(password)=> setFormData({...formData, password })}
              />
              <Text style={styles.error}>{errors.password}</Text>
            <Button 
              title="Criar conta"
              onPress={()=> handleSubmit()}
            />
          </View>
        )}

      </Formik>

    </ScrollView>
  )
}