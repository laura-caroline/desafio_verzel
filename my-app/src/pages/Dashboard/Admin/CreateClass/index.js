import React, { useEffect, useState } from 'react'
import {Picker} from '@react-native-picker/picker'
import { Text, ScrollView, View, TextInput, Alert } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { TextInputMask } from 'react-native-masked-text'
import Spinner from 'react-native-loading-spinner-overlay'
import { Formik } from 'formik'
import * as Yup from 'yup'
import api from '../../../../services/api'

import { styles } from '../../../../styles/styles-form-classes'
import {Button} from '../../../../components/Button'

export const CreateClass = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({})
  const [modules, setModules] = useState([])

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
    navigation.addListener('focus', async()=>{
      const modules = await api.get('/modules')
      const data = modules.data
      setModules(data)
    })
    navigation.addListener('blur', ()=>{
      setFormData({})
    })
  }, [navigation])

  const handleChange = (field, value) =>{
    return setFormData({...formData, [field]: value})
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

    const module = modules.find((module)=> module.name === moduleName)
    const newClass = await api.post('/classes', {name, time, date, description, id_module: module.id})
    
    const data = newClass.data
    Alert.alert('', data.msg)
    setLoading(false)

    navigation.navigate('ListModules')
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Spinner
        visible={loading}
        textContent="Loading..."
        textStyle={{color: '#fff'}}
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
            <Text>Escolha o modulo</Text>
            <View style={styles.box_picker}>
              <Picker
                style={styles.picker}
                selectedValue={formData.moduleName}
                onValueChange={(moduleName)=> handleChange('moduleName', moduleName)}
              >
                <Picker.Item label="Escolha seu modulo" value=""/>
                {modules.length > 0 && modules.map((module)=>(
                  <Picker.Item label={module.name} value={module.name}/>
                ))}
              </Picker>
            </View>
              <Text style={styles.error}>{errors.moduleName}</Text>
            <Text style={styles.label}>Nome da aula:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome da aula"
                value={formData.name}
                onChangeText={(name) => handleChange('name', name)}
              />
              <Text style={styles.error}>{errors.name}</Text>
            <Text style={styles.label}>Tempo em minutos:</Text>
              <TextInputMask
                style={styles.input}
                placeholder="Ex: 60 "
                value={formData.time}
                type="only-numbers"
                onChangeText={(time)=> handleChange('time', time)}
              />
              <Text style={styles.error}>{errors.time}</Text>
            <Text style={styles.label}>Data:</Text>
              <TextInputMask
                style={styles.input}
                value={formData.date}
                placeholder="DD/MM/YYYY"
                type="datetime"
                options={{format: 'DD/MM/YYYY'}}
                onChangeText={(date)=> handleChange('date', date)}
              />
              <Text style={styles.error}>{errors.date}</Text>
            <Text style={styles.label}>Descrição do modulo:</Text>
              <TextInput
                value={formData.description}
                style={styles.textarea}
                placeholder="Digite sua descrição"
                multiline={true}
                numberOfLines={5}
                onChangeText={(description) => handleChange('description', description)}
              />
            <Text style={styles.error}>{errors.description}</Text>
            <Button
              title="Criar aula"
              onPress={()=> handleSubmit()}
            />
          </View>
        )}

      </Formik>

    </ScrollView>
  )
}
