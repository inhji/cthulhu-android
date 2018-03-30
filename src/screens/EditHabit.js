import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  Picker
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
    const { name, description, isGood, threshold } = habit

    this.setState({
      name,
      description,
      isGood,
      threshold
    })
  }

  render () {
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
        <TextInput
          keyboardType="numeric"
          defaultValue={habit.threshold.toString()}
          onChangeText={threshold => {
            threshold = parseInt(threshold.replace(/[^0-9]/g, ''))
            this.setState({ threshold })
          }}
          style={styles.input}
          placeholder="Threshold"
        />
        <Picker
          selectedValue={this.state.isGood}
          onValueChange={(itemValue, itemIndex) => this.setState({ isGood: itemValue })}
        >
          <Picker.Item label="Good Habit" value={true} />
          <Picker.Item label="Bad Habit" value={false} />
        </Picker>
        <View style={styles.buttons}>
          <MyButton onPress={this.handleSave} title="Save" />
          <View style={{ flex: 1 }} />
          <MyButton onPress={this.handleSave} title="Delete" />
        </View>
      </View>
    )
  }
}

class MyButton extends React.Component {
  getStyles = () =>
    StyleSheet.create({
      button: {
        borderRadius: 2,
        backgroundColor: '#7E57C2',
        height: 40,
        padding: 10,
        paddingRight: 20,
        paddingLeft: 20,
        elevation: 5
      },
      text: {
        color: '#fff',
        fontWeight: 'bold'
      }
    })

  render () {
    const s = this.getStyles()
    const title = this.props.title || 'Unnamed'

    return (
      <TouchableOpacity style={s.button} onPress={this.props.onPress}>
        <Text style={s.text}>{title.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  buttonContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row'
  },
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
    height: 50,
    flexDirection: 'row'
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
