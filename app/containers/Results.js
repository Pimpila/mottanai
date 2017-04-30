import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableHighlight} from 'react-native'

import Sorry from './Sorry'

class Results extends Component {

  render() {
    if (this.props.recipes.length > 0) {
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
                        <View>
                          <Image
                          source={{uri: imageUrl}}
                          style={styles.image}>
                            <Text style={styles.recipeName}>{recipe.name}</Text>
                          </Image>
                        </View>
                      </TouchableHighlight>
                    </View>
                  )
                })
            }
          </ScrollView>
        </View>
      )
    }
    else {
      return <Sorry />
    }
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    justifyContent: 'space-between'
  },
  scrollSection: {
    flex: 0.8
  },
  image: {
    height: 240,
    margin: 20,
    flex: 1,
    justifyContent: 'flex-end'
  },
  recipeName: {
    fontFamily: 'Avenir-Heavy',
    color: 'white',
    fontSize: 20,
    flexDirection: 'row',
    textAlign: 'right',
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 15,
    backgroundColor: 'rgba(0,0,0, 0.35)'
  }
});

const mapState = (state) => ({
  recipes: state.recipes
})

export default connect(mapState, null)(Results)
