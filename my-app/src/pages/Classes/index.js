import React, { useEffect, useState } from 'react'
import { Text, ScrollView, View, TouchableOpacity, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useAuth } from '../../hooks/useAuth'
import api from '../../services/api'

import { styles } from '../../styles/styles-classes'
import {Button} from '../../components/Button'

export const Classes = () => {
  const { user } = useAuth()
  const [classes, setClasses] = useState([])

  const { id_module } = useRoute().params

  useEffect(() => {
    const readClasses = async () => {
      if (user.authorization === 'default') {
        const readClassesWatchedOrNot = await api.get(`/user/classes/module/${user.id}/${id_module}`)
        const data = readClassesWatchedOrNot.data
        const ordenedData = data.sort((a,b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        return setClasses(ordenedData)
      }
      else{
        const readOnlyClasses = await api.get(`/classes/modules/${id_module}`)
        const data = readOnlyClasses.data
        const ordenedData = data.sort((a,b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        return setClasses(ordenedData)
      }
    }
    readClasses()
  }, [])

  const markClass = async (classeId, indexClass) => {
    const findClass = classes.find((classe)=> classe.id === classeId)
    
    if(findClass.watch_classes[0]?.watched){
      const markOffClass = await api.delete(`/watch_classes/user/${user.id}/${classeId}`)
      const copyClasses = [...classes]
      copyClasses[indexClass] = {
        ...copyClasses[indexClass],
        watch_classes: {}
      }
      return setClasses(copyClasses)
    }
    else{
      const markClassAsConclued = await api.post(`/watch_classes/user/${user.id}/${classeId}`,)
      const copyClasses = [...classes]
      copyClasses[indexClass] = {
            ...copyClasses[indexClass],
            watch_classes: [{
              watched: true
            }]
          }
      return setClasses(copyClasses)
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {classes.length > 0 ? classes.map((classe, index) => (
        <View style={styles.box_content}>
          <View style={styles.box_button_conclued}>
            {user.authorization === 'default' && (
              <TouchableOpacity
                style={styles.button_conclued}
                activeOpacity={0.6}
                onPress={() => markClass(classe.id, index)}
              >
                <Text>
                  {classe.watch_classes[0]?.watched ? 'Concluida' : 'Marcar como concluida'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.content}>
            <Text style={styles.subject}>Assunto: {classe.name}</Text>
            <Text style={styles.description}>Descrição: {classe.description}</Text>
            <Text style={styles.date}>Data: {classe.date}</Text>
            <Text style={styles.time}>Tempo: {classe.time} minutos</Text>
            <Button
              title="Acessar aula"
              onPress={()=> Alert.alert('Não tem link ;)')}
            />
          </View>
        </View>
      )):(
        <View style={styles.box_empty_content}>
          <Text style={styles.error}>Não tem aulas neste modulo</Text>
        </View>
      )}
    </ScrollView>
  )
} 