import React from 'react'
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
  LayoutAnimation,
  NavigationActions,
  TouchableNativeFeedback
} from 'react-native'
import ActionButton from 'react-native-action-button'
import { MaterialIcons } from '@expo/vector-icons'
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

  editHabit = () => {
    this.props.onEdit(this.props.habit.id)
  }

  render () {
    const { habit } = this.props

    return (
      <TouchableNativeFeedback onLongPress={this.editHabit} onPress={this.addHabitLog}>
        <View onPress={() => alert('lol')}>
          <View style={styles.conainer}>
            <View style={{ flex: 5 }}>
              <Text style={styles.habitTitle}>{habit.name}</Text>
              <Text style={{ color: '#aaa' }}>{habit.description}</Text>
            </View>
          </View>
          <WeeklyLogs
            logMap={weeklyLogs(habit.logs)}
            threshold={habit.threshold}
            isGood={habit.isGood}
          />
        </View>
      </TouchableNativeFeedback>
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
  static navigationOptions = {
    title: 'Cthulhu'
  }

  state = {
    habits: [],
    refreshing: false,
    actionButtonVisible: true
  }

  listViewOffset = 0

  async componentDidMount () {
    await this.loadHabits()
  }

  loadHabits = async () => {
    const habits = await getHabits()
    this.setState({ habits })
  }

  editHabit = id => {
    this.props.navigation.navigate('EditHabit', { id })
  }

  refetch = async () => {
    if (this.state.refreshing) {
      return
    }

    this.setState({ refreshing: true })
    await this.loadHabits()
    this.setState({ refreshing: false })
  }

  onClickAddHabit = () => {
    this.props.navigation.navigate('Add')
  }

  onClickSettings = () => {
    this.props.navigation.navigate('Settings')
  }

  // https://gist.github.com/mmazzarolo/cfd467436f9d110e94a685b06eb3900f
  onScroll = event => {
    const CustomLayoutLinear = {
      duration: 100,
      create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
    }

    const currentOffset = event.nativeEvent.contentOffset.y
    const direction = currentOffset > 0 && currentOffset > this.listViewOffset ? 'down' : 'up'
    const actionButtonVisible = direction === 'up'
    if (actionButtonVisible !== this.state.actionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear)
      this.setState({ actionButtonVisible })
    }

    this.listViewOffset = currentOffset
  }

  render () {
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <FlatList
          data={this.state.habits}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <Habit habit={item} onUpdated={this.refetch} onEdit={this.editHabit} />
          )}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refetch} />
          }
          onScroll={this.onScroll}
        />
        {this.state.actionButtonVisible ? (
          <ActionButton buttonColor="#673AB7">
            <ActionButton.Item
              buttonColor="#673AB7"
              title="New Habit"
              onPress={this.onClickAddHabit}
            >
              <MaterialIcons name="add" color="white" size={20} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#263238"
              title="Settings"
              onPress={this.onClickSettings}
            >
              <MaterialIcons name="settings" color="white" size={20} />
            </ActionButton.Item>
          </ActionButton>
        ) : null}
      </View>
    )
  }
}

export default Home
