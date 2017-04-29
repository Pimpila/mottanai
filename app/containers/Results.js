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
  Linking,
  TouchableHighlight} from 'react-native'

import ActionCreators from '../actions/index'
import Header from '../components/Header'

/*
this.props = getRecipes
*/

class Results extends Component {

  onSuperFrugalPress() {
    console.log('this.props', this.props)
    let newSearchTerm
    switch (this.props.searchTerms) {
      case 'Carrots':
        newSearchTerm = 'Carrot Tops'
        break
      default:
        newSearchTerm = this.props.searchTerms
    }
    console.log('newSearchTerm', newSearchTerm)
    this.props.getSuperRecipe(newSearchTerm)
  }

  render() {
    return (
      <View style={styles.scene}>
        <ScrollView style={styles.scrollSection}>
          {
            !!this.props.recipes.length &&
              this.props.recipes.map((recipe) => {
                const imageUrl = recipe.images[0].hostedLargeUrl
                const recipeUrl = recipe.source.sourceRecipeUrl
                const openRecipe = () => {
                  Linking.openURL(recipeUrl)
                }
                return (
                  <View key={recipe.id}>
                    <TouchableHighlight onPress={openRecipe}>
                      <Image source={{uri: imageUrl}} style={{height: 150}} />
                    </TouchableHighlight>
                    <Text>{recipe.name}</Text>
                  </View>
                )
              })
          }
          <Button
            title='Feeling Super Frugal'
            color='#841584'
            onPress={this.onSuperFrugalPress.bind(this)}
          />
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
  },
  getSuperRecipe: (query) => {
    dispatch(ActionCreators.RecipeActions.getSuperRecipeFromApi(query))
  }
})

export default connect(mapState, mapDispatch)(Results)
