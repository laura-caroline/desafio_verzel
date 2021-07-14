import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const api = axios.create({
  baseURL: "http://192.168.1.48:8080",
  timeout: 1500,
})

api.interceptors.request.use(async (config)=>{

  try{
      const token = await AsyncStorage.getItem('@token')
      if(token){
          config.headers.Authorization = `Bearer ${token}`
      }
      return config
  }       
  catch(err){
      console.log(error)
  }
})
api.interceptors.response.use(async (response)=>{
  return response;
},async (error) => {
  if(error.response.status === 401){
    const {msg} = error.response.data
    if(msg === 'Token invalid'){
      await AsyncStorage.setItem('@token', '')
      await AsyncStorage.setItem('@user', JSON.stringify({}))
    }
    return Promise.reject(error)
  }
})




export default api