import { AsyncStorage } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const httpLink = new HttpLink({ uri: 'https://inhji.de/api/graphql' })

const authLink = setContext(
  (request, previousContext) =>
    new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('API_AUTH_TOKEN')

      if (token) {
        resolve({
          headers: {
            authorization: `Bearer ${token}`
          }
        })
      } else {
        resolve({
          headers: {}
        })
      }
    })
)

const link = authLink.concat(httpLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client
