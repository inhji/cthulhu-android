import { AsyncStorage } from 'react-native'

export default async function checkAuth () {
  try {
    const token = await AsyncStorage.getItem('API_AUTH_TOKEN')

    if (token !== null) {
      return true
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}
