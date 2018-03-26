import React from 'react'
import { View, Text, TextInput, StyleSheet, Button, Alert, AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

class Login extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Login'
  }

  state = { email: 'johnnie@posteo.de', password: '271090lotd' }

  handleLogin = async e => {
    try {
      const { email, password } = this.state

      const response = await fetch('https://inhji.de/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email, password
        })
      })

      if (response.ok) {
        const body = await response.json()
        console.log(body)

        await AsyncStorage.setItem('API_USER_ID', body.id)
        await AsyncStorage.setItem('API_AUTH_TOKEN', body.token)

        const action = NavigationActions.back()
        this.props.navigation.dispatch(action)
      } else {
        Alert.alert('Server said no', response.statusCode)
      }
    } catch (e) {
      Alert.alert('Exception while login', e.message)
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

export default Login
