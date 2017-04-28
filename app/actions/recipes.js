import axios from 'axios'

export const SET_SELECTED_RECIPES = "SET_SELECTED_RECIPES"

// sync action creator:
// this action takes an array of recipes
export const setRecipes = (recipes) => {
  return {
    type: SET_SELECTED_RECIPES,
    recipes
  }
}

// thunk creator:

export const getRecipesFromApi = (ingredients) => {
  // need to take out api id and key
  // assume ings are passed in as long string separated by spaces

  const params = `${ingredients.split(' ').join('+')}&requirePictures=true`

  return (dispatch) => {
    fetch(`https://api.yummly.com/v1/api/recipes?q=${params}`, {  // yummly search api call
      method: 'GET',
      headers: {

      }
    })
      .then(response => response.json())
      .then(recipes => {  // recipes.matches = arr that you then sort. take just the 1st three to filter by num ingredients
        const sorted = recipes.matches.sort((a,b) => a.ingredients.length - b.ingredients.length)
        const selectedRecipes = sorted.slice(0,3)
        console.log('selectedRecipes', selectedRecipes) // am logging this
        const actions = selectedRecipes.map((recipe) => { // for each selected recipe, do a yummly get recipe call for an arr of promises
          return fetch(`https://api.yummly.com/v1/api/recipe/${recipe.id}`, {
            method: 'GET',
            headers: {

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


// export const getRecipesFromApi = (ingredients) => {
//   // need to take out api id and key
//   // assume ings are passed in as long string separated by spaces

//   const params = `${ingredients.split(' ').join('+')}&requirePictures=true`
//   console.log('params', params)
//   console.log(`https://api.yummly.com/v1/api/recipes?_app_id=876954d0&_app_key=1d084b3e15747d6ecd45de07821117bd&q=${params}`)

//   return (dispatch) => {
//     fetch(`https://api.yummly.com/v1/api/recipes?q=${params}`, {  // yummly search api call
//       method: 'GET',
//       headers: {
//         'X-Yummly-App-ID': '876954d0',
//         'X-Yummly-App-Key': '1d084b3e15747d6ecd45de07821117bd'
//       }
//     })
//       .then(response => response.json())
//       .then(recipes => {  // recipes.matches = arr that you then sort. take just the 1st three to filter by num ingredients
//         const sorted = recipes.matches.sort((a,b) => a.ingredients.length - b.ingredients.length)
//         const selectedRecipes = sorted.slice(0,3)
//         console.log('selectedRecipes', selectedRecipes)
//         const results = []
//         selectedRecipes.forEach(recipe => { // for each selected recipe, do a yummly get recipe call. push results (objs) into an array.
//           fetch(`https://api.yummly.com/v1/api/recipe/${recipe.id}`, {
//             method: 'GET',
//             headers: {
//               'X-Yummly-App-ID': '876954d0',
//               'X-Yummly-App-Key': '1d084b3e15747d6ecd45de07821117bd'
//             }
//           })
//           .then(response => response.json())
//           .then(recipe => {
//             results.push(recipe)
//           })
//           .catch(error => console.error(error))
//         })
//         return results
//       })
//       .then(results => {
//         console.log('results', JSON.stringify(results))
//         dispatch(setRecipes(results)) // dispatch setRecipes passing in the recipes arr.
//       })
//       .catch(error => console.error(error))
//   }
// }

// export const getRecipesFromApi = (ingredients) => {
//   // need to take out api id and key
//   // assume ings are passed in as long string separated by spaces

//   const params = `${ingredients.split(' ').join('+')}&requirePictures=true`
//   console.log('params', params)
//   console.log(`http://api.yummly.com/v1/api/recipes?_app_id=876954d0&_app_key=1d084b3e15747d6ecd45de07821117bd&q=${params}`)
//   return (dispatch) => {
//     axios.get(`http://api.yummly.com/v1/api/recipes?app_id=876954d0&app_key=1d084b3e15747d6ecd45de07821117bd&q=${params}`)
//     .then(res => res.data)
//     .then(data => JSON.parse(data))
//     .then(parsedData => dispatch(setRecipes(parsedData.matches)))
//     .catch(err => console.error(err))
//   };
// };


