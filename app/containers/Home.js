import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import ActionCreators from '../actions/index'


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
        // first param passed to navigate is the screen you want to navigate to, second optional param is any param you want to pass onto the next screen which would be avail as state.params
        return this.props.navigation.navigate('Results')
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
        <Image
        source={{uri: 'http://theinspirationgrid.com/wp-content/uploads/2014/05/photography-julie-lee-02.jpg'}}
        style={styles.scene}>
          <View style={styles.container}>
            <Text style={styles.header}>What's Left?</Text>
            <Text style={styles.intro}>Leftover ingredients in the fridge? Not sure what to do with your carrot tops? Enter an ingredient below for inspiration</Text>
            {/*
            <View style={styles.searchSection}>
              <TextInput style={styles.searchInput}
                autoCapitalize='none'
                placeholder='Ingredients'
                returnKeyType='search'
                onChangeText={(input) => this.setState({ searchTerms: input })}
                value={this.state.searchTerms} />
              <TouchableHighlight
                onPress={this.onButtonPress.bind(this)}
                color='#3d5c5c'>
                <Text>Get Recipes</Text>
              </TouchableHighlight>
            </View>
          */}
        </View>
        </Image>
    )
  }
}

// flex of 1 is entire screen. if you had two children component also flex 1, they each would be 1/2 of that parent container.
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  container: {
    flex: .5
  },
  header: {
    flex: 2,
    fontSize: 50,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#3d5c5c',
    marginTop: 30,
    textAlign: 'center',
  },
  intro: {
    flex: 2,
    color: '#3d5c5c',
    backgroundColor: 'rgba(0,0,0,0)',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  searchSection: {
    flex: 1,
    height: 30,
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
  },
  searchInput: {
    flex: 0.7,
  },
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

export default connect(null, mapDispatch)(Home)
