import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Button,
  Linking,
  StyleSheet,
  TouchableHighlight} from 'react-native'

import ActionCreators from '../actions/index'
import Header from '../components/Header'

/*
this.props = getRecipes
*/

class Recipe extends Component {


  render() {
    return (
      <View style={styles.scene}>
        <ScrollView style={styles.scrollSection}>
          {
            !!this.props.recipes.length && // not hitting this block b/c recipes.length === 0
              this.props.recipes.map((recipe) => {
                const imageUrl = recipe.images[0].hostedLargeUrl
                return (
                  <View key={recipe.id}>
                    <Image source={{uri: imageUrl}} style={{height: 150}} onPress={openRecipe}/>
                    <Text>{recipe.name}</Text>
                  </View>
                )
              })
          }
        </ScrollView>
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
  searchTerms: state.searchTerms
})

const mapDispatch = (dispatch) => ({
  getRecipes: (query) => {
    dispatch(ActionCreators.RecipeActions.getRecipesFromApi(query));
  }
})

export default connect(mapState, mapDispatch)(Recipe)
