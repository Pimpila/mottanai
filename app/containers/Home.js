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

  handleSearch() {
    console.log('props', this.props)
    console.log('this.state', this.state)
    console.log('action creators', ActionCreators)
    console.log('searchTerms', this.state.searchTerms)
    this.props.getRecipes(this.state.searchTerms)
  }

  render() {
    console.log('props', this.props)
    console.log('props.recipes', this.props.recipes)
    console.log('props.recipes.length', this.props.recipes.length) // ?? why is this returning 0? see console.log
    return (
      <View style={styles.scene}>
        <View style={styles.searchSection}>
          <TextInput style={styles.searchInput}
            placeholder='Ingredients'
            returnKeyType='search'
            onChangeText={(input) => this.setState({searchTerms: input})}
            value={this.state.searchTerms} />
          <TouchableHighlight
            onPress={ () => this.handleSearch() }
            color='#3d5c5c'>
            <Text>Get Recipes</Text>
          </TouchableHighlight>
        </View>
        <ScrollView style={styles.scrollSection}>
          {
            !!this.props.recipes.length && // not hitting this block b/c recipes.length === 0
              this.props.recipes.map((recipe) => {
                console.log('recipe', recipe)
                console.log('imageURL', recipe.images[0].hostedLargeUrl)
                const imageUrl = recipe.images[0].hostedLargeUrl
                console.log('type', typeof imageUrl)
                return (
                  <View key={recipe.id}>
                    <Image source={{uri: imageUrl}} style={{height: 150}}/>
                    <Text>{recipe.recipeName}</Text>
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
    flex: 1,
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
  recipes: state.recipes
});

const mapDispatch = (dispatch) => ({
  getRecipes: (query) => {
    dispatch(ActionCreators.RecipeActions.getRecipesFromApi(query));
  }
});

export default connect(mapState, mapDispatch)(Home)
