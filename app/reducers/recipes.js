import { SET_SELECTED_RECIPES, SET_SEARCH_TERMS, SET_SUPER_FRUGAL } from '../actions/recipes'


export function setRecipesInStore (state = [], action) {
  switch (action.type) {
    case SET_SELECTED_RECIPES:
      return action.recipes
    default:
      return state
  }
}

export function setSearchTermsInStore (state = '', action) {
  switch (action.type) {
    case SET_SEARCH_TERMS:
      return action.searchTerms
    default:
      return state
  }
}

export function setSuperFrugal (state = {}, action) {
  switch (action.type) {
    case SET_SUPER_FRUGAL:
      return action.superRecipe
    default:
      return state
  }
}
