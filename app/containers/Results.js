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

class Results extends Component {

  onSuperFrugalPress() {
    this.props.navigation.navigate('SuperFrugal')
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
                      <View>
                        <Image
                        source={{uri: imageUrl}}
                        style={{height: 240}} />
                          <Text>{recipe.name}</Text>
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
}

const styles = StyleSheet.create({
  scene: {
    flex: 1, // flex of 1 is entire screen. if you had two children component also flex 1, they each would be 1/2 of that parent container.
    flexDirection: 'column',
    marginTop: 20
  },
  scrollSection: {
    flex: 0.8
  }
});

const mapState = (state) => ({
  recipes: state.recipes
})

export default connect(mapState, null)(Results)
