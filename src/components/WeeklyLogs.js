import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import moment from 'moment'

const DAY_NONE = 'DAY_NONE'
const DAY_GOOD = 'DAY_GOOD'
const DAY_BAD = 'DAY_BAD'

class WeeklyLogs extends React.Component {
  dayType = (value, weekday) => {
    const { threshold, isGood } = this.props
    const currentWeekday = moment().weekday()
    const isCurrentDay = currentWeekday === weekday
    // const goodDay = isCurrentDay ? classes.dayGoodCurrent : classes.dayGood
    // const badDay = isCurrentDay ? classes.dayBadCurrent : classes.dayBad
    let type

    if (value === -1) {
      type = DAY_NONE
      return { type, isCurrentDay }
    }

    if (isGood) {
      if (value >= threshold) {
        type = DAY_GOOD
      } else {
        type = DAY_BAD
      }
    } else {
      if (value > threshold) {
        type = DAY_BAD
      } else {
        type = DAY_GOOD
      }
    }

    return { type, isCurrentDay }
  }

  renderDay = (day, index) => {
    const { type } = this.dayType(day.value, index)
    const style = styles[type]

    return (
      <View key={index} style={style}>
        <Text style={styles.text}>{day.text}</Text>
        <Text style={styles.text}>{day.value === -1 ? '-' : day.value}</Text>
      </View>
    )
  }

  render() {
    const { logMap, threshold } = this.props
    return <View style={styles.root}>{logMap.map(this.renderDay)}</View>
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    textAlign: 'center'
  },
  day: {
    flex: 1
  },
  DAY_GOOD: {
    flex: 1,
    padding: 3,
    backgroundColor: '#66BB6A'
  },
  DAY_BAD: {
    flex: 1,
    padding: 3,
    backgroundColor: '#EF5350'
  },
  DAY_NONE: {
    flex: 1,
    padding: 3,
    backgroundColor: '#fff'
  }
})

export default WeeklyLogs
