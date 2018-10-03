import React from 'react'
import { graphql } from 'react-apollo'
import { View, Text, FlatList, RefreshControl } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { allHabitsQuery } from '../lib/queries'
import { getHabits } from '../lib/storage'
import Habit from '../components/Habit'

class Habits extends React.Component {
  state = { refreshing: false, habits: [] }

  async componentDidMount() {
    const habits = await getHabits()
    console.log(habits)

    this.setState({ habits })
  }

  editHabit = id => {
    const action = NavigationActions.navigate({
      routeName: 'EditHabit',
      params: { id }
    })
    this.props.navigation.dispatch(action)
  }

  render () {
    return (
      <View>
        <FlatList
          data={this.state.habits}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => <Habit habit={item} editHabit={this.editHabit} />}
        />
      </View>
    )
  }
}

export default graphql(allHabitsQuery, { name: 'allHabitsQuery' })(Habits)
