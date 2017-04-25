// Required libraries
import axios from 'axios'

// ----------- Actions
const FETCH_ORDERS = 'FETCH_ORDERS'

// ----------- Action Creators
export const receiveOrders = (orders) => ({
  type: FETCH_ORDERS,
  orders
})

// ----------- Reducer
const initialState = {
  allOrders: [{}]
}

export default function orderReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case FETCH_ORDERS:
    nextState.allOrders = action.orders
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

