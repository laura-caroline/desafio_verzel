import React, { useEffect, useState } from 'react'
import { Text, ScrollView, View, Button, Alert, ActivityIndicator } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../../../services/api'

import {styles} from '../../../../styles/styles-classes'

export const ListClassesOfModule = () => {
  const [loadingPage, setLoadingPage] = useState(true)
  const [classes, setClasses] = useState([])

  const navigation = useNavigation()
  const { id_module } = useRoute().params

  

  useEffect(() => {
    const readClasses = navigation.addListener('focus', async () => {
      setLoadingPage(true)
      const readAllClasse = await api.get(`/classes/modules/${id_module}`)
      const data = readAllClasse.data
      const ordenedData = data.sort((a,b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

      setClasses(ordenedData)
      setTimeout(()=>{
        return setLoadingPage(false)
      }, 1000)
    })
    return readClasses
  }, [id_module])

  

  const deleteClass = async (classId)=>{
    Alert.alert('', 'Você tem certeza que deseja deletar esta aula?',[
      {text: "Cancelar"
      },
      {
        text: "Deletar",
        onPress: async ()=> {
          const deleteMyClass = await api.delete(`/classes/${classId}`)
          const data = deleteMyClass.data

          const updateState = classes.filter((classe)=>{
            return classe.id !== classId
          })
          setClasses(updateState)
          
          Alert.alert('', data.msg)
          }
        }
    ])
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loadingPage ? (
        <ActivityIndicator size="large" color="black"/>
      ):(
        (classes.length > 0 ? classes.map((classe) => (
          <View style={styles.box_content}>
            <View style={styles.content}>
              <Text style={styles.subject}>Assunto: {classe.name}</Text>
              <Text style={styles.description}>Descrição: {classe.description}</Text>
              <Text style={styles.time}>Tempo: {classe.time} minutos</Text>
              <Text style={styles.date}>Data: {classe.date}</Text>
              <View style={styles.box_actions_buttons}>
                <Icon
                  name="create"
                  color="black"
                  size={35}
                  onPress={()=> navigation.navigate('UpdateClass', {id_class: classe.id, id_module: classe.module.id})}
                />
                <Icon
                  name="delete"
                  color="black"
                  size={35}
                  onPress={()=> deleteClass(classe.id)}
                />
              </View>
            </View>
          </View>
        )):(
          <View style={styles.box_empty_content}>
            <Text style={styles.error}>Não tem aulas neste modulo</Text>
          </View>
        ))
      )}
      
    </ScrollView>
  )
} 