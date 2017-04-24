// Required libraries
import axios from 'axios'
import {findObjectById} from './utility'

// ----------- Actions
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const SELECT_PRODUCT = 'SELECT_PRODUCT'

// ----------- Action Creators
export const receiveProducts = (products) => ({
  type: FETCH_PRODUCTS,
  products
})

export const setSelectedProductId = (selectedProductId) => ({
  type: SELECT_PRODUCT,
  selectedProductId
})


// ----------- Reducer
const initialState = {
  allProducts: [],
  selectedProductId: 0
}

export default function productReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case FETCH_PRODUCTS:
    nextState.allProducts = action.products
    break

  case SELECT_PRODUCT:
    nextState.selectedProductId = action.selectedProductId
    break

  default:
    return state
  }
  return nextState
}

// ----------- Disptachers
export const fetchProducts = () => (dispatch) => {
  axios.get('/api/products')
      .then(response => {
        let products = response.data
        let productsWithRatings = products.map(product => ({...product, rating: product.reviews.reduce((acc, review) => acc+=review.stars, 0)/product.reviews.length}))
        dispatch(receiveProducts(productsWithRatings))
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
