import { SET_SELECTED_RECIPES } from '../actions/recipes'


function setRecipesInStore (state = [], action) {
  switch (action.type) {
    case SET_SELECTED_RECIPES:
      return action.recipes;
    default:
      return state;
  }
}

export default setRecipesInStore



