import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Animated,
  StyleSheet,
  Text,
  View
} from 'react-native'

import ActionCreators from '../actions/index'
import Home from './Home'

/* this.props = {
  recipes:
  getRecipes:
}
*/
class AppContainer extends Component {

  render() {
    return <Home />
  }


}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

const mapState = (state) => {return {}}

const mapDispatch = (dispatch) => {return {}}

export default connect(mapState, null)(AppContainer)
