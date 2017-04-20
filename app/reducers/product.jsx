// Required libraries
import axios from 'axios'

// ----------- Actions
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'

// ----------- Action Creators
export const receiveProducts = (products) => ({
  type: FETCH_PRODUCTS,
  products
})

// ----------- Reducer
const initialState = {
  allProducts: []
}

export default function productReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case FETCH_PRODUCTS:
    nextState.allProducts = action.products
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
