// Required libraries
import axios from 'axios'
import {findObjectByName} from './utility'

// ----------- Actions
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const SELECT_PRODUCT = 'SELECT_PRODUCT'

// ----------- Action Creators
export const receiveProducts = (products) => ({
  type: FETCH_PRODUCTS,
  products
})

export const selectedProduct = (product) => ({
  type: SELECT_PRODUCT,
  product
})

// ----------- Reducer
const initialState = {
  allProducts: [],
  selectedProduct: {}
}

export default function productReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case FETCH_PRODUCTS:
    nextState.allProducts = action.products
    break

  case SELECT_PRODUCT:
    nextState.selectedProduct = findObjectByName(state.allProducts, action.product)
    break

  default:
    return state
  }
  return nextState
}

// ----------- Disptachers
export const fetchProducts = () => (dispatch) => {
  console.log('fetching products')
  axios.get('/api/products')
      .then(response => {
        dispatch(receiveProducts(response.data))
      })
      .catch(console.error)
}

export const addProduct = (productData) => (dispatch) => {
  axios.post('/api/products/add', productData)
      .then(() => {
        // dispatch(newProduct(response.data));
        dispatch(fetchProducts())
      })
      .catch(console.error)
}

export const removeProduct = (productId) => (dispatch) => {
  axios.delete(`/api/products/delete/${productId}`)
      .then(() => {
        dispatch(fetchProducts())
      })
      .catch(console.error)
}
