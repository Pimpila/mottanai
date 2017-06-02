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
    const setSearching = this.props.setSearching(true)
    const setSearchTerms = this.props.setSearchTerms(this.state.searchTerms)
    const getFrugalSearch = this.props.getFrugalSearchTerms(this.state.searchTerms)
    const getRecipes = this.props.getRecipes(this.state.searchTerms)

    Promise.all([ setSearching, setSearchTerms, getFrugalSearch, getRecipes])
      .then(resolvedArr => {
        // set searching to false so search results will render on results screen
        return this.props.setSearching(false)
      })
        // first param passed to navigate is the screen you want to navigate to, second optional param is any param you want to pass onto the next screen which would be avail as state.params
      .then(() => this.props.navigation.navigate('Results'))
      .catch(err => console.error(err))
  }

  render() {
    return (
        <Image
        source={{uri: 'http://theinspirationgrid.com/wp-content/uploads/2014/05/photography-julie-lee-02.jpg'}}
        style={styles.scene}>
          <View style={styles.container}>
              <Text style={styles.header}>What's Left?</Text>
              <Text style={styles.intro}>Leftover ingredients in the fridge? Not sure what to do with your carrot tops? Enter an ingredient below for inspiration.</Text>
              <View style={styles.searchSection}>
                <TextInput style={styles.searchInput}
                  autoCapitalize='none'
                  placeholder='Ingredients'
                  returnKeyType='search'
                  onChangeText={(input) => this.setState({ searchTerms: input })}
                  value={this.state.searchTerms}
                  />
                <TouchableHighlight
                  onPress={this.onButtonPress.bind(this)}
                  style={styles.searchButton}>
                  <Text color='#3d5c5c'>Get Recipes</Text>
                </TouchableHighlight>
              </View>
            </View>
        </Image>
    )
  }
}


const styles = StyleSheet.create({
  scene: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 300,
    height: 350,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .85)'
  },
  header: {
    fontSize: 50,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#3d5c5c',
    marginTop: 30,
    textAlign: 'center',
  },
  intro: {
    // flex: 1,
    color: '#3d5c5c',
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  searchSection: {
    flexDirection: 'row',

    alignItems: 'flex-end',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 25,
    marginHorizontal: 10
  },
  searchInput: {
    flex: 0.7,
    textAlign: 'left',
  },
  searchButton: {
    flex: 0.3,
  },
});

const mapState = ({state}) => ({
  searching: state.searching
})

const mapDispatch = (dispatch) => ({
  setSearching: (bool) => {
    dispatch(ActionCreators.RecipeActions.setSearching(bool))
  },
  getRecipes: (query) => {
    dispatch(ActionCreators.RecipeActions.getRecipesFromApi(query))
  },
  setSearchTerms: (searchTerms) => {
    dispatch(ActionCreators.RecipeActions.setSearchTerms(searchTerms))
  },
  getFrugalSearchTerms: (searchTerms) => {
    dispatch(ActionCreators.RecipeActions.getFrugalSearchTerms(searchTerms))
  },
});

export default connect(null, mapDispatch)(Home)
