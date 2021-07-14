import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexGrow:1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'white'
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 20,
  },
  box_content: {
    width: '80%',
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
  error: {
    color: 'red'
  },
  box_navigations: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'flex-end',
  },
  link: {
    textDecorationLine: "underline"
  }

})