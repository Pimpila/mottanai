import React from 'react'

import {
  Animated,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default function Header() {
  return (
    <View>
      <Text style={styles.header}>Mottanai</Text>
      <Text style={styles.intro}>Leftover ingredients in the fridge? Not sure what to do with your carrot tops? Enter an ingredient below for inspiration</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
    color: '#3d5c5c',
    marginTop: 30,
    textAlign: 'center',
  },
  intro: {
    color: '#3d5c5c',
    marginVertical: 20,
    marginHorizontal: 20,
  }
})
