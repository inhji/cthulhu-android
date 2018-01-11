import React from 'react'
import { Text, View, StyleSheet, StatusBar, Button } from 'react-native'
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation'
import { ApolloProvider } from 'react-apollo'
import LoginScreen from './screens/Login'
import HomeScreen from './screens/Home'
import HabitScreen from './screens/Habits'
import EditHabit from './screens/EditHabit'
import client from './lib/apollo'
import { Constants } from 'expo'

// const HabitNav = StackNavigator(
//   {
//     ListHabits: { screen: HabitScreen },
//     EditHabit: { screen: EditHabit }
//   },
//   { headerMode: 'none' }
// )

const DrawerNav = DrawerNavigator({
  Home: { screen: HomeScreen },
  Habits: { screen: HabitScreen }
})

const Nav = StackNavigator(
  {
    Main: {
      screen: DrawerNav,
      navigationOptions: ({ navigation }) => {
        return {
          headerRight: (
            <Button
              title="Login"
              onPress={props => {
                const action = NavigationActions.navigate({ routeName: 'Login' })
                navigation.dispatch(action)
              }}
            />
          )
        }
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login'
      }
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
    flex: 1,
    paddingTop: Constants.statusBarHeight
  }
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.root}>
          <Nav
            onNavigationStateChange={(prevState, currentState) => {
              console.log('onNavigationStateChange')
              console.log(currentState)
            }}
          />
        </View>
      </ApolloProvider>
    )
  }
}
