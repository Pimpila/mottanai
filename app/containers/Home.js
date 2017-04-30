import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Button,
  StyleSheet,
  TouchableHighlight} from 'react-native'

import ActionCreators from '../actions/index'
import Header from '../components/Header'

/*
this.props = getRecipes
*/

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerms: ''
    }
  }

  onButtonPress() {
    const setSearch = this.props.setSearchTerms(this.state.searchTerms)
    const getFrugalSearch = this.props.getFrugalSearchTerms(this.state.searchTerms)
    const getRecipes = this.props.getRecipes(this.state.searchTerms)

    Promise.all([setSearch, getFrugalSearch, getRecipes])
      .then(resolvedArr => {
        console.log('this.props inside promise all home onButtonpress', this.props)
        // first param passed to navigate is the screen you want to navigate to, second optional param is any param you want to pass onto the next screen which would be avail as state.params
        return this.props.navigation.navigate('Results')
      })
      .catch(err => console.error(err))
  }


  render() {
    return (
      <View style={styles.scene}>
        <View>
          <Header />
        </View>
        <View style={styles.searchSection}>
          <TextInput style={styles.searchInput}
            autoCapitalize='none'
            placeholder='Ingredients'
            returnKeyType='search'
            onChangeText={(input) => this.setState({searchTerms: input})}
            value={this.state.searchTerms} />
          <TouchableHighlight
            onPress={this.onButtonPress.bind(this)}
            color='#3d5c5c'>
            <Text>Get Recipes</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1, // flex of 1 is entire screen. if you had two children component also flex 1, they each would be 1/2 of that parent container.
    flexDirection: 'column',
    marginTop: 20
  },
  searchSection: {
    height: 30,
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
  },
  scrollSection: {
    flex: 0.8
  },
  searchButton: {
    flex: 0.3,
  },
  searchInput: {
    flex: 0.7,
  },
});

const mapState = (state) => ({
  recipes: state.recipes,
  searchTerms: state.searchTerms,
  frugalSearchTerms: state.frugalSearchTerms
});

const mapDispatch = (dispatch) => ({
  getRecipes: (query) => {
    dispatch(ActionCreators.RecipeActions.getRecipesFromApi(query));
  },
  setSearchTerms: (searchTerms) => {
    dispatch(ActionCreators.RecipeActions.setSearchTerms(searchTerms))
  },
  getFrugalSearchTerms: (searchTerms) => {
    dispatch(ActionCreators.RecipeActions.getFrugalSearchTerms(searchTerms))
  },
  getSuperRecipe: (query) => {
    dispatch(ActionCreators.RecipeActions.getSuperRecipeFromApi(query))
  },
});

export default connect(mapState, mapDispatch)(Home)
