export const SET_SELECTED_RECIPES = 'SET_SELECTED_RECIPES'
export const SET_SEARCH_TERMS = 'SET_SEARCH_TERMS'
export const SET_FRUGAL_SEARCH_TERMS = 'SET_FRUGAL_SEARCH_TERMS'
export const SET_SUPER_FRUGAL = 'SET_SUPER_FRUGAL'

// sync action creators:

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
export const getRecipesFromApi = (ingredients) => {
  const params = `${ingredients.split(' ').join('+')}&requirePictures=true`
  return (dispatch) => {
    fetch(`https://api.yummly.com/v1/api/recipes?q=${params}`, {  // yummly search api call
      method: 'GET',
      headers: {
        'X-Yummly-App-ID': '***REMOVED***',
        'X-Yummly-App-Key': '***REMOVED***'
      }
    })
      .then(response => response.json())
      .then(recipes => {  // recipes.matches = arr that you then sort. sort by num ingredient then take first 10
        const sorted = recipes.matches.sort((a, b) =>  b.rating - a.rating).sort((a,b) => a.ingredients.length - b.ingredients.length)
        const selectedRecipes = sorted.slice(0, 10)
        const actions = selectedRecipes.map((recipe) => { // for each selected recipe, do a yummly get recipe call for an arr of promises
          return fetch(`https://api.yummly.com/v1/api/recipe/${recipe.id}`, {
            method: 'GET',
            headers: {
              'X-Yummly-App-ID': '***REMOVED***',
              'X-Yummly-App-Key': '***REMOVED***'
            }
          })
            .then(response => response.json())
            .then(recipe => recipe)
            .catch(error => console.error(error))
        }) // end of map

        Promise.all(actions)
          .then(results => { // results should be an arr of resolved promises
            dispatch(setRecipes(results)) // dispatch setRecipes passing in the recipes arr.
          })
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error))
  }
}


// export const getSuperRecipeFromApi = (ingredients) => {
//   console.log('Super ingredients', ingredients)
//   const params = `${ingredients.split(' ').join('+')}&requirePictures=true`
//   console.log('params', params)
//   return (dispatch) => {
//     fetch(`https://api.yummly.com/v1/api/recipes?q=${params}`, {
//       method: 'GET',
//       headers: {
//         'X-Yummly-App-ID': '***REMOVED***',
//         'X-Yummly-App-Key': '***REMOVED***'
//       }
//     })
//       .then(response => response.json())
//       .then(recipes => {
//         const recipe = recipes.matches[0].id
//         fetch(`https://api.yummly.com/v1/api/recipe/${recipe}`, {
//           method: 'GET',
//           headers: {
//             'X-Yummly-App-ID': '***REMOVED***',
//             'X-Yummly-App-Key': '***REMOVED***'
//           }
//         })
//         .then(response => response.json())
//         .then(recipe => dispatch(setSuperFrugal(recipe)))
//         .catch(error => console.error(error))
//       })
//       .catch(error => console.error(error))
//   }
// }

export const getSuperRecipeFromApi = (ingredients) => {
  const params = `${ingredients.split(' ').join('+')}&requirePictures=true`
  return (dispatch) => {
    fetch(`https://api.yummly.com/v1/api/recipes?q=${params}`, {
      method: 'GET',
      headers: {
        'X-Yummly-App-ID': '***REMOVED***',
        'X-Yummly-App-Key': '***REMOVED***'
      }
    })
      .then(response => response.json())
      .then(recipes => {
        const sorted = recipes.matches.sort((a,b) => a.ingredients.length - b.ingredients.length)
        const selectedRecipes = sorted.slice(0, 3)
        const actions = selectedRecipes.map((recipe) => {
          return fetch(`https://api.yummly.com/v1/api/recipe/${recipe.id}`, {
            method: 'GET',
            headers: {
              'X-Yummly-App-ID': '***REMOVED***',
              'X-Yummly-App-Key': '***REMOVED***'
            }
          })
            .then(response => response.json())
            .then(recipe => recipe)
            .catch(error => console.error(error))
        }) // end of map

        Promise.all(actions)
          .then(results => dispatch(setSuperFrugal(results)))
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error))
  }
}

export const getFrugalSearchTerms = (oldSearch) => {
  console.log('inside thunk to set frugal search terms, OLD', oldSearch)
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
    console.log('newSearch', newSearch, 'boolean', !!newSearch)

      return (dispatch) => {
        if (!!newSearch) {
          dispatch(setFrugalSearchTerms(newSearch))
          dispatch(getSuperRecipeFromApi(newSearch))
        }
        else {
          dispatch(setFrugalSearchTerms(''))
          dispatch(setSuperFrugal([]))
        }
      }

}
