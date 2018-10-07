import React from 'react'
import { View, Button } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import HomeScreen from './screens/Home'
import EditHabit from './screens/EditHabit'
import AddHabit from './screens/AddHabit'
import Settings from './screens/Settings'

const HabitNav = createStackNavigator(
  {
    Add: { screen: AddHabit },
    Home: { screen: HomeScreen },
    EditHabit: { screen: EditHabit },
    Settings: { screen: Settings }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#673AB7'
      }
    }
  }
)

export default class App extends React.Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <HabitNav />
      </View>
    )
  }
}
