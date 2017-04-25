// Required libraries
import axios from 'axios'

// ----------- Actions
const FETCH_ORDERS = 'FETCH_ORDERS'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
// ----------- Action Creators
export const receiveOrders = (orders) => ({
  type: FETCH_ORDERS,
  orders
})

// ----------- Reducer
const initialState = {
  allOrders: [{}],
  cart: { Products: [] }
}

export default function orderReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case FETCH_ORDERS:
    nextState.allOrders = action.orders
    break
  case ADD_TO_CART:
    {
      let cart = JSON.parse(window.localStorage.cart)
      let added = false
      cart.Products.forEach(purchase => {
        if (purchase.product===action.product) {
          added=true
          purchase.quantity+=1
        }
      })
      if (!added) {
        cart.Products.push({product: action.product, quantity: 1})
      }
      window.localStorage.cart=JSON.stringify(cart)
      break
  }
  case REMOVE_FROM_CART:
    let cart = JSON.parse(window.localStorage.cart)
    cart.Products.forEach(purchase => {
      if (purchase.product===action.product) {
        purchase.quantity-=1
      }
    })
    window.localStorage.cart=JSON.stringify(cart)
    break
  default:
    return state
  }
  return nextState
}

// ----------- Disptachers
export const fetchOrders = () => (dispatch) => {
  axios.get('/api/orders')
      .then(response => {
        dispatch(receiveOrders(response.data))
      })
      .catch(console.error)
}

export const addOrder = (orderData) => (dispatch) => {
  axios.post('/api/orders/', orderData)
      .then(() => {
        // dispatch(newOrder(response.data));
        dispatch(fetchOrders())
      })
      .catch(console.error)
}

export const removeOrder = (orderId) => (dispatch) => {
  axios.delete(`/api/orders/delete/${orderId}`)
      .then(() => {
        dispatch(fetchOrders())
      })
      .catch(console.error)
}

export const addToCart = (productId) => {
  return {
    type: ADD_TO_CART,
    product: productId
  }
}

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    product: productId
  }
}
