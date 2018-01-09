import React from 'react'
import { Text, View, StyleSheet, Button, Alert } from 'react-native'
import weeklyLogs from '../lib/weekly_logs'
import WeeklyLogs from './WeeklyLogs'
import { graphql } from 'react-apollo'
import { createHabitLogMutation } from '../lib/queries'

class Habit extends React.Component {
  addHabitLog = async () => {
    try {
      await this.props.createHabitLogMutation({
        variables: {
          id: this.props.habit.id
        }
      })
    } catch (e) {
      Alert.alert(e.message)
    }
  }

  render() {
    const { habit, editHabit } = this.props

    return (
      <View>
        <View style={styles.container}>
          <View style={{ flexGrow: 1 }}>
            <Text style={{ fontSize: 18 }}>{habit.name}</Text>
            <Text color="#ccc" style={{ color: '#aaa' }}>
              {habit.description || 'A fine habit'}
            </Text>
          </View>
          <View style={{ width: 50 }}>
            <Button style={styles.button} color="#dd3344" title="+1" onPress={this.addHabitLog} />
            {/* <Button
              style={styles.button}
              color="#ccc"
              title="Edit"
              onPress={() => editHabit(habit.id)}
            /> */}
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
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20
  },
  button: {
    backgroundColor: '#fff'
  }
})

export default graphql(createHabitLogMutation, { name: 'createHabitLogMutation' })(Habit)
