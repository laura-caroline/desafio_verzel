import React, { useEffect, useState } from 'react'
import { TextInput, Text, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Spinner from 'react-native-loading-spinner-overlay'
import {useAuth} from '../../hooks/useAuth'

import api from '../../services/api'
import { styles } from '../../styles/styles-form-sign'
import {Button} from '../../components/Button'


export const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState([])
  
  const {user, signIn} = useAuth()
  const navigation = useNavigation()

  const FormSchema = Yup.object().shape({
    user: Yup
      .string()
      .required('Campo obrigatório')
    ,
    password: Yup
      .string()
      .required('Campo obrigatório')
    ,
  })

  useEffect(()=>{
    navigation.addListener('focus', ()=>{
      if(user.authorization){
        const redirectUserLogged = user.authorization === 'admin' ? 'ListModules' : 'ListClassesWatched'
        return navigation.navigate('DrawerNavigation', {screen: redirectUserLogged})
      }
    })
    navigation.addListener('blur', ()=>{
      return setFormData({})
    })
  },[navigation, user])

  const submitForm = async (values, setFieldError) => {
    setLoading(true)
    
    try{
      const authUser = await api.post('/users/auth', values)
      const data = authUser.data
      setLoading(false)
      await signIn(data)

      if(data.user.authorization === 'admin'){
        return navigation.navigate('DrawerNavigation', {screen: 'ListModules'})
      }
      return navigation.navigate('DrawerNavigation',{screen: 'ListClassesWatched'})
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
        textStyle={{ color: '#fff' }}
      />
        <Formik
          initialValues={formData}
          validationSchema={FormSchema}
          enableReinitialize={true}
          onSubmit={async (values, { setFieldError }) => {
            return await submitForm(values, setFieldError)
          }}
        >
          {({ errors, handleSubmit }) => (
            <View style={styles.box_content}>
              <Text style={styles.title}>Acesse sua conta</Text>
              <Text style={styles.label}>Usuário:</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  placeholder="Digite seu email"
                  value={formData.user}
                  onChangeText={(user) => setFormData({ ...formData, user})}
                />
                <Text style={styles.error}>{errors.user}</Text>
              <Text style={styles.label}>Senha:</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  secureTextEntry
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChangeText={(password) => setFormData({ ...formData, password })}
                />
                <Text style={styles.error}>{errors.password}</Text>
              <Button title="ENTRAR" onPress={()=> handleSubmit()}/>

              <View style={styles.box_navigations}>
                <Text 
                  style={styles.link} 
                  onPress={()=> navigation.navigate('SignUp')}
                >
                    Crie sua conta
                </Text>
              </View>
            </View>
          )}
        </Formik>
    </ScrollView>
  )
}