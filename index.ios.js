import React, { Component } from 'react'
import { Provider } from 'react-redux'
import AppContainer from './app/containers/AppContainer'
import store from './app/store'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

console.disableYellowBox = true;

// this func, passed to AppRegistry just wraps our AppContainer with the store and runs the AppContainer
const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

// AppRegistry is the JS entry point to running all React Native apps. App root components should register themselves with AppRegistry.registerComponent, then the native system can load the bundle for the app and then actually run the app when it's ready by invoking AppRegistry.runApplication
AppRegistry.registerComponent('mottanai', () => App);
