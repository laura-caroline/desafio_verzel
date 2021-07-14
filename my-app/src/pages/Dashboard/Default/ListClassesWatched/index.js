import React, { useEffect, useState } from 'react'
import {Text, View, ScrollView} from 'react-native'
import api from '../../../../services/api'
import {useAuth} from '../../../../hooks/useAuth'
import { styles } from './styles'

export const ListClassesWatched = ()=>{
  const {user} = useAuth()
  const [classes, setClasses] = useState([])

  useEffect(()=>{
    const readClassesWatchedByUser = async ()=>{
      const response = await api.get(`/watch_classes/user/${user.id}`)
      const data = response.data
      const ordenedData = data.sort((a,b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      return setClasses(ordenedData)
    }
    readClassesWatchedByUser()
  },[])

  return(
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box_list_classes}>
        {classes.length > 0 ? classes.map((classe)=>(
          <View style={styles.box_content}>
            <Text style={styles.subject_module}>
              Modulo: {classe.module.name}
            </Text>
            <View style={styles.content}>
              <Text style={styles.subject_class}>
                Aula: {classe.name}
              </Text>
              <Text style={styles.description}>
                Descrição: {classe.description}
              </Text>
              <Text style={styles.time}>
                Tempo de aula: {classe.time} minutos
              </Text>
            </View>
          </View>
        )):(
          <View style={styles.box_empty_classes}>
            <Text>Voce não concluiu nenhuma aula</Text>
          </View>
        )}
        
      </View>
    </ScrollView>
  )
}