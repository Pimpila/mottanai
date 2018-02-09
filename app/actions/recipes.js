import {appId, appKey} from '../config/keys';

export const SET_SEARCHING = 'SET_SEARCHING'
export const SET_SELECTED_RECIPES = 'SET_SELECTED_RECIPES'
export const SET_SEARCH_TERMS = 'SET_SEARCH_TERMS'
export const SET_FRUGAL_SEARCH_TERMS = 'SET_FRUGAL_SEARCH_TERMS'
export const SET_SUPER_FRUGAL = 'SET_SUPER_FRUGAL'


// sync action creators:

export const setSearching = (bool) => {
  return {
    type: SET_SEARCHING,
    searching: bool
  }
}

export const setRecipes = (recipes) => {
  return {
    type: SET_SELECTED_RECIPES,
    recipes
  }
}

export const setSearchTerms = (searchTerms) => {
  return {
    type: SET_SEARCH_TERMS,
    searchTerms
  }
}

export const setFrugalSearchTerms = (searchTerms) => {
  return {
    type: SET_FRUGAL_SEARCH_TERMS,
    searchTerms
  }
}

export const setSuperFrugal = (superRecipe) => {
  return {
    type: SET_SUPER_FRUGAL,
    superRecipe
  }
}

// thunk creators:
export const getRecipesFromApi = (ingredients, bool) => {
  const params = `${ingredients.split(' ').join('+')}&requirePictures=true`
  return (dispatch) => {
    fetch(`https://api.yummly.com/v1/api/recipes?q=${params}`, {  // yummly search api call
      method: 'GET',
      headers: {
        'X-Yummly-App-ID': appId,
        'X-Yummly-App-Key': appKey
      }
    })
      .then(response => response.json())
      .then(recipes => {  // recipes.matches = arr that you then sort. sort by num ingredient then take first 10 or 5 (if it's a super frugal recipe)
        const sorted = recipes.matches.sort((a, b) =>  b.rating - a.rating).sort((a,b) => a.ingredients.length - b.ingredients.length)
        const selectedRecipes = bool? sorted.slice(0, 5) : sorted.slice(0,10);
        const actions = selectedRecipes.map((recipe) => { // for each selected recipe, do a yummly get recipe call for an arr of promises
          return fetch(`https://api.yummly.com/v1/api/recipe/${recipe.id}`, {
            method: 'GET',
            headers: {
              'X-Yummly-App-ID': appId,
              'X-Yummly-App-Key': appKey
            }
          })
            .then(response => response.json())
            .then(recipe => recipe)
            .catch(error => console.error(error))
        }) // end of map

        Promise.all(actions)
          .then(results => { // results should be an arr of resolved promises
            if (bool) {
              dispatch(setSuperFrugal(results))
            }
            else {
              dispatch(setRecipes(results)) // dispatch setRecipes passing in the recipes arr.
            }
          })
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error))
  }
}


export const getFrugalSearchTerms = (oldSearch) => {
    let newSearch
    if (oldSearch.includes('carrot')) newSearch = 'carrot tops'
    if (oldSearch.includes('beets')) newSearch = 'beet greens'
    if (oldSearch.includes('chicken')) newSearch = 'chicken skin'
    if (oldSearch.includes('watermelon')) newSearch = 'watermelon rind'
    if (oldSearch.includes('parmesan')) newSearch = 'parmesan rind'
    if (oldSearch.includes('radish')) newSearch = 'radish greens'
    if (oldSearch.includes('turnip')) newSearch = 'turnip greens'
    if (oldSearch.includes('lemon')) newSearch = 'lemon peel'
    if (oldSearch.includes('orange')) newSearch = 'orange peel'

      return (dispatch) => {
        if (!!newSearch) {
          dispatch(setFrugalSearchTerms(newSearch))
          dispatch(getRecipesFromApi(newSearch, true))
        }
        else {
          dispatch(setFrugalSearchTerms(''))
          dispatch(setSuperFrugal([]))
        }
      }

}
