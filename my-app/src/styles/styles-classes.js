import {StyleSheet} from 'react-native'


export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems:'center'  
  },
  box_content: {
    marginTop: 20,
    width: '90%',
    padding: 10, 
    marginVertical: 5, 
    borderWidth: 1,
    borderColor: "#ddd"
  },

  content: {
    width: '100%',
    minHeight: 300,
    justifyContent: 'space-evenly',
    padding: 20,
  }, 
  box_empty_content: {
    width: '100%',
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  box_actions_buttons:{
    marginTop: 30, 
    flexDirection: 'row', 
    justifyContent: 'space-evenly'
  },
  box_button_conclued: {
    width: '100%', 
    alignItems: 'flex-end'
  },
  button_conclued: {
    width: '50%',
    padding: 10,
    backgroundColor: '#939596',
    marginVertical: 10,
    borderRadius: 5,
  },
  text_conclued: {
    color: 'black'
  },  
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15
  },
  date: {
    fontSize: 15
  },
  time: {
    fontSize: 15,
  },
})