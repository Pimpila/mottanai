import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native'

import ActionCreators from '../actions/index'
import Home from './Home'
import Results from './Results'
import Recipe from './Recipe'

/* this.props = {
  recipes:
  getRecipes:
}
*/
class AppContainer extends Component {

  render() {
    return (
      <Navigator
        initialRoute={{
          id: 'Home'
        }}
        renderScene={
          this.navigatorRenderScene
        }
      />
    )
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator
    switch (route.id) {
      case 'Home':
        return(<Home navigator={navigator} title='Home'/>)
      case 'Results':
        return(<Results navigator={navigator} title='Results'/>)
      case 'Recipe':
        return(<Recipe navigator={navigator} title='Recipe'/>)
    }
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
