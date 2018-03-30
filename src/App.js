import React from 'react'
import { View, StyleSheet } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { ApolloProvider } from 'react-apollo'
import LoginScreen from './screens/Login'
import HomeScreen from './screens/Home'
import HabitScreen from './screens/Habits'
import EditHabit from './screens/EditHabit'
import client from './lib/apollo'

const HabitNav = StackNavigator(
  {
    ListHabits: { screen: HabitScreen },
    EditHabit: { screen: EditHabit }
  },
  { headerMode: 'none' }
)

const DrawerNav = DrawerNavigator({
  Home: { screen: HomeScreen },
  Habits: { screen: HabitNav },
  Login: { screen: LoginScreen }
})

const Nav = StackNavigator(
  {
    Main: {
      screen: DrawerNav
    }
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      title: 'Cthulhu',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#673AB7'
      }
    }
  }
)

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})

export default class App extends React.Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <View style={styles.root}>
          <Nav />
        </View>
      </ApolloProvider>
    )
  }
}
