import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    backgroundColor: 'white', 
    alignItems: 'center', 
  },
  box_content: {
    width: '80%', 
    padding: 20,
  },
  box_picker:{
    marginVertical: 10,
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 5,
    padding: 5
  },  
  picker:{
    width: '100%'
  }, 
  label: {
    width: '100%',
    marginVertical:  10,
  },
  textarea: {
    borderRadius: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  input: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  error: {
    color: 'red'
  },
})