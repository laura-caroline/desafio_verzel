import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
    alignItems: 'center',
  },  
  box_list_modules:{
    width: '90%',
    minHeight: 200,
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 20,
    marginBottom: 20,
  },
  box_action_buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  subject:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  description:{
    fontSize: 15
  },
  button_navigate: {
    backgroundColor: 'gray',
    width: '50%',
    padding: 10,

  }
})
