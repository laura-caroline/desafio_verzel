import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  box_list_classes:{
    width: '80%',
    marginTop: 40,
  },
  box_content: {
    width: '100%', 
    minHeight: 200,
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 20,
    marginVertical: 10,
    justifyContent: 'space-evenly'
  },
  content: {
    minHeight: 150,
    justifyContent: 'space-evenly'
  },
  subject_module: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  subject_class: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 15
  },
  time: { 
    fontSize: 15
  },
  box_empty_classes: {
    justifyContent: 'center',
     alignItems: 'center'
  },

})