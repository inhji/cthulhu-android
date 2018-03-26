import gql from 'graphql-tag'

export const allHabitsQuery = gql`
  query AllHabitsQuery {
    habits {
      id
      name
      description
      days
      isGood
      threshold
      logs
      author {
        id
        name
      }
    }
  }
`

export const habitQuery = gql`
  query HabitQuery($id: ID!) {
    habit(id: $id) {
      id
      name
      description
      days
      isGood
      threshold
      logs
      author {
        id
        name
      }
    }
  }
`

export const updateHabitMutation = gql`
  mutation UpdateHabitMutation(
    $id: ID!
    $name: String!
    $description: String
    $isGood: Boolean!
    $threshold: Int!
    $days: Int!
  ) {
    updateHabit(
      id: $id
      name: $name
      description: $description
      isGood: $isGood
      threshold: $threshold
      days: $days
    ) {
      id
      name
      description
      days
      isGood
      threshold
      author {
        id
        name
      }
    }
  }
`

export const deleteHabitMutation = gql`
  mutation DeleteHabitMutation($id: ID!) {
    deleteHabit(id: $id) {
      id
    }
  }
`

export const createHabitLogMutation = gql`
  mutation CreateHabitLogMutation($id: ID!) {
    createHabitLog(id: $id) {
      id
      logs
    }
  }
`
