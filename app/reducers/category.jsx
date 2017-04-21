// Required libraries
import axios from 'axios'
import {findObjectByName} from './utility'

// ----------- Actions
const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
const SELECT_CATEGORY = 'SELECT_CATEGORY'

// ----------- Action Creators
export const receiveCategories = (categories) => ({
  type: FETCH_CATEGORIES,
  categories
})

export const selectedCategory = (category) => ({
  type: SELECT_CATEGORY,
  category
})

// ----------- Reducer
const initialState = {
  allCategories: [],
  selectedCategory: {}
}

export default function categoryReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case FETCH_CATEGORIES:
    nextState.allCategories = action.categories
    break

  case SELECT_CATEGORY:
    nextState.selectedCategory = findObjectByName(state.allCategories, action.product)
    break

  default:
    return state
  }
  return nextState
}

// ----------- Disptachers
export const fetchCategories = () => (dispatch) => {
  axios.get('/api/categories')
      .then(response => {
        const categories = response.data
        dispatch(receiveCategories(categories))
      })
      .catch(console.error)
}

export const addCategory = (categoryData) => (dispatch) => {
  axios.post('/api/categories/add', categoryData)
      .then(() => {
        // dispatch(newCategory(response.data));
        dispatch(fetchCategories())
      })
      .catch(console.error)
}

export const removeCategory = (categoryId) => (dispatch) => {
  axios.delete(`/api/categorys/delete/${categoryId}`)
      .then(() => {
        dispatch(fetchCategories())
      })
      .catch(console.error)
}
