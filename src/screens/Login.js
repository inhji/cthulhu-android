import React from 'react'
import { View, Text, TextInput, StyleSheet, Button, Alert, AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { graphql } from 'react-apollo'
import { signinUserMutation } from '../lib/queries'

class Login extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Login'
  }

  state = { email: '', password: '' }

  handleLogin = async e => {
    try {
      const { email, password } = this.state
      const result = await this.props.signinUserMutation({
        variables: {
          email,
          password
        }
      })
      const id = result.data.authenticateUser.id
      const token = result.data.authenticateUser.token

      await AsyncStorage.setItem('API_USER_ID', id)
      await AsyncStorage.setItem('API_AUTH_TOKEN', token)

      const action = NavigationActions.navigate({ routeName: 'Habits' })
      this.props.navigation.dispatch(action)
    } catch (e) {
      Alert.alert('Fehler: ' + e.message)
    }
  }

  render() {
    return (
      <View>
        <View style={styles.form}>
          <TextInput
            onChangeText={email => this.setState({ email })}
            style={styles.input}
            keyboardType="email-address"
            placeholder="Email"
          />
          <TextInput
            onChangeText={password => this.setState({ password })}
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
          />
          <Button title="Login" onPress={this.handleLogin} />
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

export default graphql(signinUserMutation, { name: 'signinUserMutation' })(Login)
