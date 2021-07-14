import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: "white",
    flexGrow: 1,
    alignItems: 'center',
  },
  box_list_modules:{
    width: '100%',
  },
  title:{
    fontSize: 16,
    marginBottom: 20,
  },
  box_module: {
    width: '100%', 
    padding: 10, 
    marginVertical: 5, 
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  box_content: {
    minWidth: '100%',
    minHeight: 150,
    justifyContent: 'space-evenly'
    
  },
  subject:{
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold'
  },
  description:{
    fontSize: 15,
    color: 'black',
  },
  info: {
    fontSize: 15,
    color: 'black',
  },
})
