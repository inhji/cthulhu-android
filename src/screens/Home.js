import React from 'react'
import { Text, View, Button, FlatList, StyleSheet, RefreshControl, Alert } from 'react-native'
import { getHabits, addHabitLog } from '../lib/storage'
import weeklyLogs from '../lib/weekly_logs'
import WeeklyLogs from '../components/WeeklyLogs'

class Habit extends React.Component {
  state = {
    addDisabled: false
  }

  addHabitLog = async () => {
    try {
      this.setState({ addDisabled: true })

      await addHabitLog(this.props.habit.id)

      this.props.onUpdated()

    } catch (e) {
      console.log(JSON.stringify(e))
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
        <WeeklyLogs
          logMap={weeklyLogs(habit.logs)}
          threshold={habit.threshold}
          isGood={habit.isGood}
        />
      </View>
    )
  }
}

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
  state = { habits: [], refreshing: false }

  async componentDidMount() {
    await this.loadHabits()
  }

  loadHabits = async () => {
    const habits = await getHabits()
    this.setState({ habits })
  }

  refetch = async () => {
    if (this.state.refreshing) {
      return
    }

    this.setState({ refreshing: true })
    await this.loadHabits()
    this.setState({ refreshing: false })
  }

  render () {
    return (
      <View>
        <FlatList
          data={this.state.habits}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => <Habit habit={item} onUpdated={this.refetch} />}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refetch} />
          }
        />
      </View>
    )
  }
}

export default Home
