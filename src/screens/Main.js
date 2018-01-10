import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons'
import HomeScreen from './Home'
import HabitScreen from './Habits'
import LoginScreen from './Login'
import EditHabit from './EditHabit'

const HabitNav = StackNavigator(
  {
    ListHabits: { screen: HabitScreen },
    EditHabit: { screen: EditHabit }
  },
  { headerMode: 'none' }
)

const DrawerNav = DrawerNavigator({
  // Home: { screen: HomeScreen },
  Habits: { screen: HabitNav },
  Login: { screen: LoginScreen }
})

class Main extends React.Component {
  static navigationOptions = {
    title: 'Cthulhu',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#673AB7'
    }
  }

  render() {
    return <DrawerNav />
  }
}

export default Main
