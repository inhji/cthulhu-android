import React from 'react'
import { graphql } from 'react-apollo'
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { allHabitsQuery } from '../lib/queries'
import Habit from '../components/Habit'

class Habits extends React.Component {
  state = { refreshing: false }

  refetch = () => {
    const { refetch } = this.props.allHabitsQuery

    if (this.state.refreshing) {
      return
    }

    this.setState({ refreshing: true })
    refetch().then(() => {
      this.setState({ refreshing: false })
    })
  }

  editHabit = id => {
    const action = NavigationActions.navigate({ routeName: 'EditHabit', params: { id } })
    this.props.navigation.dispatch(action)
  }

  render() {
    const { allHabitsQuery, navigation } = this.props

    if (allHabitsQuery && allHabitsQuery.loading) {
      return <Text>loading..</Text>
    }

    const habits = allHabitsQuery.habits

    return (
      <View>
        <FlatList
          data={habits}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => <Habit habit={item} editHabit={this.editHabit} />}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refetch} />
          }
        />
      </View>
    )
  }
}

export default graphql(allHabitsQuery, { name: 'allHabitsQuery' })(Habits)
