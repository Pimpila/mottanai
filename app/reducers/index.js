import { combineReducers } from 'redux'
import  { setRecipesInStore, setSearchTermsInStore, setFrugalSearchTermsInStore, setSuperFrugal } from './recipes'

export default combineReducers({
  recipes: setRecipesInStore,
  searchTerms: setSearchTermsInStore,
  frugalSearchTerms: setFrugalSearchTermsInStore,
  superRecipe: setSuperFrugal
})
