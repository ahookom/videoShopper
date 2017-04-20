import { combineReducers } from 'redux'
import authReducer from './auth'
import userReducer from './user'
import productReducer from './product'
import orderReducer from './order'

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  products: productReducer,
  orders: orderReducer
})

export default rootReducer
