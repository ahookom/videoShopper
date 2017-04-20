// Required libraries
import axios from 'axios'

// ----------- Actions
const FETCH_USERS = 'FETCH_USERS'

// ----------- Action Creators
export const receiveUsers = (users) => ({
  type: FETCH_USERS,
  users
})

// ----------- Reducer
const initialState = {
  allUsers: []
}

export default function userReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case FETCH_USERS:
    nextState.allUsers = action.users
    break

  default:
    return state
  }
  return nextState
}

// ----------- Disptachers
export const fetchUsers = () => (dispatch) => {
  axios.get('/api/users')
      .then(response => {
        dispatch(receiveUsers(response.data))
      })
      .catch(console.error)
}

export const addUser = (userData) => (dispatch) => {
  axios.post('/api/users/add', userData)
      .then(() => {
        // dispatch(newUser(response.data));
        dispatch(fetchUsers())
      })
      .catch(console.error)
}

export const removeUser = (userId) => (dispatch) => {
  axios.delete(`/api/users/delete/${userId}`)
      .then(() => {
        dispatch(fetchUsers())
      })
      .catch(console.error)
}
