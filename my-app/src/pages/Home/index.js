import React, { useEffect, useState } from 'react'
import { Text, ScrollView, View, TouchableOpacity , Button} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/useAuth'
import api from '../../services/api'
import { styles } from './styles'

export const Home = () => {
  const [modules, setModules] = useState([])
  const { user, signOut } = useAuth()
  const navigation = useNavigation()


  useEffect(() => {
    const readModules = navigation.addListener('focus', async()=>{
      if (user.authorization == 'default') {
        const classesWatchedOrNotByUser = await api.get(`/user/modules/${user.id}`)
        const data = classesWatchedOrNotByUser.data
  
        const parsedClassesWatchedByUser = data.map((module) => {
          let numberClassesWatched = 0
          module.classes.forEach(user => {
            if (user.watch_classes[0]?.watched) {
              numberClassesWatched += 1
            }
          })
          return {
            ...module,
            numberClassesWatched,
          }
        })
        const ordenedData = parsedClassesWatchedByUser.sort((a,b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        return setModules(ordenedData)
      }
      else{
        const modules = await api.get('/modules')
        const data = modules.data
        const ordenedData = data.sort((a,b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        return setModules(ordenedData)
      } 
    })
    return readModules
  }, [navigation])

  const navigateClassesOfModule = (moduleId) => {
    return navigation.navigate('Classes', { id_module: moduleId })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box_list_modules}>
      <Text style={styles.title}>
        {modules.length > 0 && 'Selecione os modulos para ver as aulas disponiveis:'}
      </Text>
        {modules.length > 0 ? modules.map((module) => (
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.box_module}
            onPress={() => navigateClassesOfModule(module.id)
          }>
            <View style={styles.box_content}>
              <Text style={styles.subject}>Assunto: {module.name}</Text>
              <Text style={styles.description}>Descrição: {module.description}</Text>
              <Text style={styles.info}>
                {user.authorization == 'default'? (
                    `Aulas assistidas: ${module.numberClassesWatched ?? 0}/${module.classes.length}`
                ):(
                  `Aula: ${module.classes.length}/${module.classes.length}`
                )}
              </Text>
            </View>
          </TouchableOpacity>
        )):(
          <Text>Não há modulos disponiveis ;(</Text>
        )}
      </View>
    </ScrollView>
  )
}