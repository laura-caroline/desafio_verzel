import React, {createContext, useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'



export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
  const [user, setUser] = useState({})
  
  useEffect(()=>{
    const readUserStoraged = async ()=>{
      const dataUser = JSON.parse(await AsyncStorage.getItem('@user')) || {}
      return setUser(dataUser)
    }
    readUserStoraged()
  },[])

  const signIn = async (data)=>{
    const storageToken = await AsyncStorage.setItem('@token', data.token)
    const storageUser = await AsyncStorage.setItem('@user', JSON.stringify(data.user))

    return setUser(data.user)
  }

  const signOut = async ()=>{
    await AsyncStorage.setItem('@token', '')
    await AsyncStorage.setItem('@user', JSON.stringify({}))

    setUser({})
  }

  return(
    <AuthContext.Provider value={{user, signIn, signOut, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

