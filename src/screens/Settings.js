/* global fetch */

import React from 'react'
import { View, TextInput, StyleSheet, Button, Alert, AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: '#263238'
    }
  }

  handleDelete = async e => {
    await AsyncStorage.removeItem('HABITS')
    Alert.alert('All habits deleted!')
  }

  render () {
    return (
      <View>
        <View style={styles.form}>
          <Button title="Delete Habits" onPress={this.handleDelete} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 10
  },
  input: {
    height: 50,
    fontSize: 16
  }
})

export default Settings
