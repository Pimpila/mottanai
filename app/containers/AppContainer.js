import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native'
// import { StackNavigator } from 'react-navigation'

import ActionCreators from '../actions/index'
import { Tabs } from '../config/router'
// import Home from './Home'
// import Results from './Results'

class AppContainer extends Component {
  render() {
    return <Tabs />
  }
}

export default AppContainer


