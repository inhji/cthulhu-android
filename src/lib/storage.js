import { AsyncStorage } from 'react-native'
import uuidv4 from 'uuid/v4'

async function loadHabitsFromStorage () {
  try {
    const habitsString = await AsyncStorage.getItem('HABITS')
    const habits = JSON.parse(habitsString)

    return habits
  } catch (e) {
    console.log(e)
    return []
  }
}

export async function getHabits () {
  return await loadHabitsFromStorage()
}

export async function getHabit (id) {
  try {
    let habits = await loadHabitsFromStorage()

    return habits.filter(habit => habit.id === id)[0]
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function updateHabit (id, name, description, threshold, isGood) {
  try {
    const habits = await loadHabitsFromStorage()
    const index = habits.findIndex(habit => habit.id === id)

    habits[index].name = name
    ;(habits[index].description = description), (habits[index].threshold = threshold)
    habits[index].isGood = isGood

    const habitsString = JSON.stringify(habits)
    const result = await AsyncStorage.setItem('HABITS', habitsString)

    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export async function addHabitLog (id) {
  const habits = await loadHabitsFromStorage()
  const index = habits.findIndex(habit => habit.id === id)
  const date = new Date().valueOf()

  habits[index].logs.push(date)

  const habitsString = JSON.stringify(habits)
  const result = await AsyncStorage.setItem('HABITS', habitsString)
}

export async function addHabit (name, description, threshold, isGood) {
  try {
    const habits = await loadHabitsFromStorage()

    habits = habits || []
    habits.push({
      id: uuidv4(),
      created: new Date().valueOf(),
      name,
      description,
      threshold,
      isGood,
      logs: []
    })

    const habitsString = JSON.stringify(habits)
    const result = await AsyncStorage.setItem('HABITS', habitsString)

    return true
  } catch (e) {
    console.log('ERROR!')
    console.log(e)
    return false
  }
}
