import { combineReducers } from 'redux'
import  { setSearching, setRecipesInStore, setSearchTermsInStore, setFrugalSearchTermsInStore, setSuperFrugal } from './recipes'

export default combineReducers({
  searching: setSearching,
  recipes: setRecipesInStore,
  searchTerms: setSearchTermsInStore,
  frugalSearchTerms: setFrugalSearchTermsInStore,
  superRecipe: setSuperFrugal
})
