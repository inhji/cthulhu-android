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
import { TextField } from 'react-native-material-textfield'
import { getHabit, updateHabit } from '../lib/storage'

class EditHabit extends React.Component {
  static navigationOptions = {
    title: 'Edit Habit'
  }

  state = {
    name: '',
    description: '',
    threshold: 0,
    isGood: false
  }

  async componentDidMount () {
    const habit = await getHabit(this.props.navigation.state.params.id)
    const { name, description, threshold, isGood, id, logs } = habit

    this.setState({ name, description, threshold, isGood })
  }

  handleSave = async () => {
    const { name, description, threshold, isGood } = this.state

    await updateHabit(this.props.navigation.state.params.id, name, description, threshold, isGood)
    this.props.navigation.goBack()
  }

  handleDelete = async () => {
    Alert.alert('delete!')
  }

  render () {
    return (
      <View style={styles.form}>
        <TextField
          value={this.state.name}
          label="Habit Name"
          onChangeText={name => this.setState({ name })}
        />
        <TextField
          value={this.state.description}
          label="Habit Description"
          onChangeText={description => this.setState({ description })}
        />
        <TextField
          value={this.state.threshold.toString()}
          label="Threshold"
          keyboardType="numeric"
          onChangeText={threshold => {
            threshold = parseInt(threshold.replace(/[^0-9]/g, ''))
            this.setState({ threshold })
          }}
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

export default EditHabit
