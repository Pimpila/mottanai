import { SET_SELECTED_RECIPES, SET_SEARCH_TERMS } from '../actions/recipes'


export function setRecipesInStore (state = [], action) {
  switch (action.type) {
    case SET_SELECTED_RECIPES:
      return action.recipes;
    default:
      return state;
  }
}

export function setSearchTermsInStore (state = '', action) {
  switch (action.type) {
    case SET_SEARCH_TERMS:
      return action.searchTerms;
    default:
      return state;
  }
}
