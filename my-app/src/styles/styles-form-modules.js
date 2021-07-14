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
  label: {
    width: '100%',
    marginVertical:  10,
  },
  input: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  textarea: {
    borderRadius: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  error: {
    color: 'red'
  },

})