import React, { useEffect, useState } from 'react'
import { Text, ScrollView, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import api from '../../../../services/api'
import { styles } from './styles'

export const ListModules = () => {
  const [loading, setLoading] = useState(false)
  const [loadingPage, setLoadingPage] = useState(true)
  const [modules, setModules] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const modules = await api.get('/modules')
      const data = modules.data
      const ordenedData = data.sort((a,b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      setModules(ordenedData)
      
      setTimeout(()=>{
        return setLoadingPage(false)
      }, 1000)

    })
    return unsubscribe

  }, [navigation])

  const deleteModule = async (moduleId) => {
    Alert.alert('', 'Você tem certeza que deseja deletar este modulo?', [
      {
        text: "Cancelar"
      },
      {
        text: "Deletar",
        onPress: async () => {
          setLoading(true)
          const deleteMyModule = await api.delete(`/modules/${moduleId}`)
          const data = deleteMyModule.data

          const updateState = modules.filter((module) => {
            return module.id !== moduleId
          })
          setModules(updateState)

          Alert.alert('', data.msg)
          return setLoading(false)
        }
      }
    ])
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!loadingPage ? (
        (modules.length > 0 ? modules.map((module) => (
          <View style={styles.box_list_modules}>
            <View>
              <Text style={styles.subject}>Assunto: {module.name}</Text>
              <Text style={styles.description}>Descrição: {module.description}</Text>
            </View>
            <View style={styles.box_action_buttons}>
              <TouchableOpacity
                style={styles.button_navigate}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ListClassesOfModule', { id_module: module.id })}>
                <Text>
                  Mostrar as aulas
                  </Text>
              </TouchableOpacity>
              <Icon
                name="create"
                color="black"
                size={35}
                onPress={() => navigation.navigate('UpdateModule', { id_module: module.id })}
              />
              <Icon
                name="delete"
                color="black"
                size={35}
                onPress={() => deleteModule(module.id)}
              />
            </View>
          </View>
        )):(
          <Text>Não há modulos disponiveis</Text>
        ))
      ):(
        <ActivityIndicator size="large" color="black"/>
      )}
      
    </ScrollView>
  )
}