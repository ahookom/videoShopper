// Required libraries
import axios from 'axios'

// ----------- Actions
const FETCH_PURCHASE = 'FETCH_PURCHASE'

// ----------- Action Creators
export const receivePurchase = (purchase) => ({
  type: FETCH_PURCHASE,
  purchase
})

// ----------- Reducer
const initialState = {
  purchases: [{}]
}

export default function purchaseReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case FETCH_PURCHASE:
    nextState.purchases = action.purchase
    break

  default:
    return state
  }
  return nextState
}

// ----------- Disptachers

// export const fetchPurchaseByOrderId = (orderId) => (dispatch) => {
//   axios.get(`/api/purchase/${orderId}`)
//     .then(response => {
//         dispatch(receivePurchase(response.data))
//       })
//       .catch(console.error)
// }

export const fetchPurchases = () => (dispatch) => {
  axios.get(`/api/purchase`)
    .then(response => {
        dispatch(receivePurchase(response.data))
      })
      .catch(console.error)
}
