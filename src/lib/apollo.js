import { AsyncStorage } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const httpLink = new HttpLink({ uri: 'https://api.inhji.de/graphql' })

const authLink = setContext(
  (request, previousContext) =>
    new Promise(async (success, fail) => {
      const token = await AsyncStorage.getItem('API_AUTH_TOKEN')

      if (token) {
        success({
          headers: {
            authorization: `Bearer ${token}`
          }
        })
      } else {
        success({
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
