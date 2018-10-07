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
import { addHabit } from '../lib/storage'

class AddHabit extends React.Component {
  static navigationOptions = {
    title: 'Add Habit'
  }

  state = {
    name: '',
    description: '',
    threshold: 0,
    isGood: true
  }

  handleSave = async () => {
    const { name, description, threshold, isGood } = this.state
    const result = await addHabit(name, description, threshold, isGood)

    this.props.navigation.goBack()
  }

  handleDelete = async () => {
    Alert.alert('delete!')
  }

  render () {
    return (
      <View style={styles.form}>
        <TextField label="Habit Name" onChangeText={name => this.setState({ name })} />
        <TextField
          label="Habit Description"
          onChangeText={description => this.setState({ description })}
        />
        <TextField
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

export default AddHabit
