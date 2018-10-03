import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { ApolloProvider } from 'react-apollo'
import LoginScreen from './screens/Login'
import HomeScreen from './screens/Home'
import HabitScreen from './screens/Habits'
import EditHabit from './screens/EditHabit'
import AddHabit from './screens/AddHabit'
import Settings from './screens/Settings'
import client from './lib/apollo'

const HabitNav = createStackNavigator(
  {
    ListHabits: { screen: HabitScreen },
    EditHabit: { screen: EditHabit }
  },
  { headerMode: 'none' }
)

const DrawerNav = createDrawerNavigator({
  Home: { screen: HomeScreen },
  Habits: { screen: HabitNav },
  Add: { screen: AddHabit },
  Settings: { screen: Settings }
})

const Nav = createStackNavigator(
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
