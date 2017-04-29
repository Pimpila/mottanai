import { combineReducers } from 'redux'
import  { setRecipesInStore, setSearchTermsInStore, setSuperFrugal } from './recipes'

// this is your root reducer. keys you pass to combineReducers ends up being the props on your global store
// left off here: recipes is set to undefined, not an empty array
export default combineReducers({
  recipes: setRecipesInStore,
  searchTerms: setSearchTermsInStore,
  superRecipe: setSuperFrugal
})
