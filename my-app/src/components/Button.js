import {TouchableOpacity, StyleSheet,Text} from 'react-native'
import React from 'react'

export const Button = ({title, onPress})=>{
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={onPress}>
      <Text style={styles.text_button}>
       {title}
      </Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginTop: 30,
    padding: 10,
    backgroundColor: 'black'
  },
  text_button: {
    color: 'white',
    textAlign: 'center'
  }
})