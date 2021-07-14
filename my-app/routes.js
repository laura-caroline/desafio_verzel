import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from './src/pages/Home/index'
import { Classes } from './src/pages/Classes/index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SignIn } from './src/pages/SignIn/index'
import { SignUp } from './src/pages/SignUp'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from './src/hooks/useAuth'
import { CreateClass } from './src/pages/Dashboard/Admin/CreateClass/index'
import { CreateModule } from './src/pages/Dashboard/Admin/CreateModule/index'
import { UpdateModule } from './src/pages/Dashboard/Admin/UpdateModule/index'
import { UpdateClass } from './src/pages/Dashboard/Admin/UpdateClass/index'
import { ListModules } from './src/pages/Dashboard/Admin/ListModules/index'
import { ListClassesOfModule } from './src/pages/Dashboard/Admin/ListClassesOfModule/index'
import { ListClassesWatched } from './src/pages/Dashboard/Default/ListClassesWatched/index'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()


export const getHeaderTitle = (route)=> {
  const routeName = getFocusedRouteNameFromRoute(route)

  switch (routeName) {
    case 'ListClassesWatched':
      return 'Aulas assistidas';
    case 'ListModules':
      return 'Lista de modulos'
    case 'CreateClass':
      return 'Criar aula'
    case 'CreateModule':
      return 'Criar modulo'
    case 'UpdateModule':
      return 'Atualizar modulo'
    case 'UpdateClass': 
      return 'Atualizar aula'
    case 'ListClassesOfModule':
      return 'Aulas do modulo'
  }
}


export const Routes = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={StackNavigation}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: () => <Icon name="home" size={30} color="black" />
        }}
      />
      <Tab.Screen
        name="SignIn"
        component={SignIn}
        options={{
          tabBarLabel: 'Entrar',
          tabBarIcon: () => <Icon name="login" size={30} color="black" />

        }}
      />
    </Tab.Navigator>
  )
}

export const StackNavigation = () => {
  const { user } = useAuth()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: 'Home' }} 
      />
      <Stack.Screen
        name="Classes"
        component={Classes}
        options={{ headerTitle: "Aulas" }} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUp} 
        options={{ headerTitle: 'Criar conta' }} 
      />

      {user.authorization && (
        <Stack.Screen 
          name="DrawerNavigation" 
          component={DrawerNavigation} 
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })} 
        />
      )}

    </Stack.Navigator>
  )
}

export const DrawerNavigation = () => {
  const { user } = useAuth()

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      {user.authorization === 'admin' ? (
        <>
          <Drawer.Screen name="ListModules" component={ListModules}/>
          <Drawer.Screen name="CreateClass" component={CreateClass}/>
          <Drawer.Screen name="CreateModule" component={CreateModule}/>
          <Drawer.Screen name="UpdateClass" component={UpdateClass}/>
          <Drawer.Screen name="UpdateModule" component={UpdateModule}/>
          <Drawer.Screen name="ListClassesOfModule" component={ListClassesOfModule}/>
        </>
      ) : (
          <Drawer.Screen name="ListClassesWatched" component={ListClassesWatched}/>
        )}
    </Drawer.Navigator>
  )
}

export const CustomDrawer = (props) => {
  const navigation = useNavigation()
  const { user, signOut } = useAuth()

  const logout = async () => {
    await signOut()
    return navigation.navigate('SignIn')
  }

  return (
    <DrawerContentScrollView {...props}>
      {user.authorization == 'admin' ? (
        <>
          <DrawerItem 
            label="Listar modulos" 
            onPress={() => navigation.navigate('ListModules')} 
          />
          <DrawerItem 
            label="Criar aula" 
            onPress={() => navigation.navigate('CreateClass')} 
          />
          <DrawerItem 
            label="Criar modulo" 
            onPress={() => navigation.navigate('CreateModule')}
          />
          <DrawerItem 
            label="Sair" 
            onPress={() => logout()}
           />
        </>
      ) : (
          <>
            <DrawerItem 
              label="Aulas assistidas" 
              onPress={()=> navigation.navigate('ListClassesWatched')} 
            />
            <DrawerItem 
              label="Sair" 
              onPress={() => logout()} 
            />
          </>
        )}
    </DrawerContentScrollView>
  )
}
