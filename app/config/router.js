import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from '../containers/Home'
import Results from '../containers/Results'
import SuperFrugal from '../containers/SuperFrugal'


// every component defined as a screen here will have a this.props.navigation property
export const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home'
    }
  }
})

export const ResultsStack = StackNavigator({
  Results: {
    screen: Results,
    navigationOptions: {
      title: 'Recipes'
    }
  }
})

export const SuperFrugalStack = StackNavigator({
  SuperFrugal: {
    screen: SuperFrugal,
    navigationOptions: {
      title: 'Super Frugal'
    }
  }
})

// each key in TabNavigator represents a screen
// you can also define navigation options on the components themselves (via static navigationOptions), but here we're keeping it separate
export const Tabs = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name='home' size={35} color={tintColor}/>
    }
  },
  Results: {
    screen: ResultsStack,
    navigationOptions: {
      tabBarLabel: 'Recipes',
      tabBarIcon: ({ tintColor }) => <Icon name='list' size={35} color={tintColor}/>
    }
  },
  SuperFrugal: {
    screen: SuperFrugalStack,
    navigationOptions: {
      tabBarLabel: 'Super Frugal',
      tabBarIcon: ({ tintColor }) => <Icon name='star' size={35} color={tintColor}/>
    }
  }
})
