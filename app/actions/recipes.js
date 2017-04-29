export const SET_SELECTED_RECIPES = 'SET_SELECTED_RECIPES'
export const SET_SEARCH_TERMS = 'SET_SEARCH_TERMS'
export const SET_SUPER_FRUGAL = 'SET_SUPER_FRUGAL'

// sync action creator:
// this action takes an array of recipes
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

export const setSuperFrugal = (superRecipe) => {
  return {
    type: SET_SUPER_FRUGAL,
    superRecipe
  }
}

// thunk creators:
export const getRecipesFromApi = (ingredients) => {
  const params = `${ingredients.split(' ').join('+')}&requirePictures=true`
  return (dispatch) => {
    fetch(`https://api.yummly.com/v1/api/recipes?q=${params}`, {  // yummly search api call
      method: 'GET',
      headers: {
        'X-Yummly-App-ID': '876954d0',
        'X-Yummly-App-Key': '1d084b3e15747d6ecd45de07821117bd'
      }
    })
      .then(response => response.json())
      .then(recipes => {  // recipes.matches = arr that you then sort. take just the 1st three to filter by num ingredients
        const sorted = recipes.matches.sort((a, b) => a.ingredients.length - b.ingredients.length)
        const selectedRecipes = sorted.slice(0, 3)
        console.log('selectedRecipes', selectedRecipes) // am logging this
        const actions = selectedRecipes.map((recipe) => { // for each selected recipe, do a yummly get recipe call for an arr of promises
          return fetch(`https://api.yummly.com/v1/api/recipe/${recipe.id}`, {
            method: 'GET',
            headers: {
              'X-Yummly-App-ID': '876954d0',
              'X-Yummly-App-Key': '1d084b3e15747d6ecd45de07821117bd'
            }
          })
            .then(response => response.json())
            .then(recipe => recipe)
            .catch(error => console.error(error))
        }) // end of map

        Promise.all(actions)
          .then(results => { // results should be an arr of resolved promises
            console.log('results after promise.all', results) // results showing as arr of undefineds
            dispatch(setRecipes(results)) // dispatch setRecipes passing in the recipes arr.
          })
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error))
  }
}

export const getSuperRecipeFromApi = (ingredients) => {
  const params = `${ingredients.split(' ').join('+')}&requirePictures=true`
  return (dispatch) => {
    fetch(`https://api.yummly.com/v1/api/recipes?q=${params}`, {  // yummly search api call
      method: 'GET',
      headers: {
        'X-Yummly-App-ID': '876954d0',
        'X-Yummly-App-Key': '1d084b3e15747d6ecd45de07821117bd'
      }
    })
      .then(response => response.json())
      .then(recipes => {
        console.log(recipes)
        const recipe = recipes.matches[0].id
        fetch(`https://api.yummly.com/v1/api/recipe/${recipe}`, {
          method: 'GET',
          headers: {
            'X-Yummly-App-ID': '876954d0',
            'X-Yummly-App-Key': '1d084b3e15747d6ecd45de07821117bd'
          }
        })
        .then(response => response.json())
        .then(recipe => dispatch(setSuperFrugal(recipe)))
        .catch(error => console.error(error))
      })
      .catch(error => console.error(error))
  }
}
