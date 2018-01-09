import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  AsyncStorage,
  Switch
} from 'react-native'
import { graphql, compose } from 'react-apollo'
import { habitQuery, deleteHabitMutation, updateHabitMutation } from '../lib/queries'

class EditHabit extends React.Component {
  state = {
    name: '',
    description: '',
    threshold: 0,
    isGood: false,
    days: 0
  }

  handleSave = async () => {
    const userId = await AsyncStorage.getItem('API_USER_ID')
    const { name, description, threshold, isGood, days } = this.state

    try {
      await this.props.updateHabitMutation({
        variables: {
          id: this.props.navigation.state.params.id,
          name,
          description,
          threshold,
          isGood,
          days
        }
      })
      this.props.navigation.goBack()
    } catch (e) {
      Alert.alert(e.message)
    }
  }

  handleDelete = async () => {
    Alert.alert('delete!')
  }

  componentWillReceiveProps = props => {
    const { habit } = props.habitQuery
    const { name, description, isGood } = habit

    this.setState({
      name,
      description,
      isGood
    })
  }

  render() {
    const { habitQuery } = this.props

    if (habitQuery && habitQuery.loading) {
      return <Text>loading..</Text>
    }

    const { habit } = habitQuery

    return (
      <View style={styles.form}>
        <TextInput
          defaultValue={habit.name}
          onChangeText={name => this.setState({ name })}
          style={styles.input}
          keyboardType="email-address"
          placeholder="Name"
        />
        <TextInput
          defaultValue={habit.description}
          onChangeText={description => this.setState({ description })}
          style={styles.input}
          placeholder="Description"
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ height: 50 }}>LOL</Text>
          <Switch
            style={{ height: 50 }}
            value={this.state.isGood}
            onValueChange={isGood => this.setState({ isGood })}
          />
        </View>
        <View style={styles.buttons}>
          <Button title="Save" onPress={this.handleSave} style={styles.button} />
          <Button title="Delete" onPress={this.handleDelete} style={styles.button} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 10,
    flex: 1
  },
  input: {
    height: 50,
    fontSize: 16
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  button: {
    // flex: 1
    // flexGrow: 2
  }
})

export default compose(
  graphql(deleteHabitMutation, { name: 'deleteHabitMutation' }),
  graphql(updateHabitMutation, { name: 'updateHabitMutation' }),
  graphql(habitQuery, {
    name: 'habitQuery',
    options: ({ navigation }) => ({ variables: { id: navigation.state.params.id } })
  })
)(EditHabit)
