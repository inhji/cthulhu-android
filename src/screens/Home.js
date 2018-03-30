import React from 'react'
import { Text, View, Button, FlatList, StyleSheet, RefreshControl, Alert } from 'react-native'
import { graphql } from 'react-apollo'
import { allHabitsQuery, createHabitLogMutation } from '../lib/queries'
import weeklyLogs from '../lib/weekly_logs'

class Habit extends React.Component {
  state = {
    addDisabled: false
  }

  addHabitLog = async () => {
    try {
      this.setState({ addDisabled: true })
      await this.props.createHabitLogMutation({
        variables: {
          id: this.props.habit.id
        }
      })
    } catch (e) {
      console.log(JSON.stringify(e))
      Alert.alert('Error while talking to api')
    } finally {
      this.setState({ addDisabled: false })
    }
  }

  render () {
    const { habit } = this.props
    const logsThisWeek = weeklyLogs(habit.logs).reduce((count, log) => {
      return count + (log.value === -1 ? 0 : log.value)
    }, 0)

    return (
      <View>
        <View style={styles.conainer}>
          <View style={{ flex: 5 }}>
            <Text style={styles.habitTitle}>{habit.name}</Text>
            <Text style={{ color: '#aaa' }}>{logsThisWeek} this week</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title="1 UP" onPress={this.addHabitLog} />
          </View>
        </View>
      </View>
    )
  }
}

const HabitWithMutation = graphql(createHabitLogMutation, {
  name: 'createHabitLogMutation'
})(Habit)

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20
  },
  habitTitle: {
    fontSize: 18
  },
  button: {
    flex: 1,
    flexGrow: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
})

class Home extends React.Component {
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

  render () {
    const { allHabitsQuery } = this.props

    if (allHabitsQuery && allHabitsQuery.loading) {
      return <Text>loading..</Text>
    }

    const habits = allHabitsQuery.habits

    return (
      <View>
        <FlatList
          data={habits}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => <HabitWithMutation habit={item} />}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refetch} />
          }
        />
      </View>
    )
  }
}

export default graphql(allHabitsQuery, { name: 'allHabitsQuery' })(Home)
