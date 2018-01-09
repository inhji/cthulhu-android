import React from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { ApolloProvider } from 'react-apollo'
import Main from './screens/Main'
import client from './lib/apollo'
import { Constants } from 'expo'

const Nav = StackNavigator(
  {
    Home: { screen: Main }
  },
  {
    headerMode: 'screen'
  }
)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  }
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.root}>
          <Nav />
        </View>
      </ApolloProvider>
    )
  }
}
