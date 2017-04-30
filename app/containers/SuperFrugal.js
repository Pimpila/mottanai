import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableHighlight
} from 'react-native'

class SuperFrugal extends Component {
  render() {
    if (Object.keys(this.props.superRecipe).length > 0) {
      const recipe = this.props.superRecipe
      const imageUrl = recipe.images[0].hostedLargeUrl
      const recipeUrl = recipe.source.sourceRecipeUrl
      const openRecipe = () => {
        Linking.openURL(recipeUrl)
      }

      return (
        <View key={recipe.id}>
          <TouchableHighlight onPress={openRecipe}>
            <Image
            source={{ uri: imageUrl }}
            style={{ height: 240}} />
          </TouchableHighlight>
          <Text>{recipe.name}</Text>
        </View>
      )
    }
    else {
      return <Text>Sorry, no Super Frugal recipe was found :(</Text>
    }
  }
}


const styles = StyleSheet.create({

});

const mapState = (state) => ({
  superRecipe: state.superRecipe
})

export default connect(mapState, null)(SuperFrugal)
