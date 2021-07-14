import React from 'react';
import { LogBox } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {Routes} from './routes'
import {AuthProvider} from './src/contexts/authenticate'

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  return(
    <AuthProvider>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </AuthProvider>
  )
}
