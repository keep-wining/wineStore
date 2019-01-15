import axios from 'axios'
// import history from '../history'
import AddQuantity, {uniqueItems} from './HelperFunction'
// OB/LM: might want to prune some of the unnecessary dependencies related to toastr (script, node module toastr, node module react-toastr)
import toastr from 'toastr'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_TO_CART = 'ADD_TO_CART'
const ADD_TO_CART_GUEST = 'ADD_TO_CART_GUEST'
const REMOVE_ERROR = 'REMOVE_ERROR'
const CLEAR_CART = 'CLEAR_CART'

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const addToCart = item => ({
  type: ADD_TO_CART,
  item
})
const addToCartGuest = item => ({
  type: ADD_TO_CART_GUEST,
  item
})
const removeError = () => ({type: REMOVE_ERROR})
const clearCart = () => ({
  type: CLEAR_CART
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, history) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
    if (res.data.firstName) {
      toastr.success(`Welcome ${res.data.firstName}!`)
    } else {
      toastr.success(`Welcome ${res.data.email}!`)
    }
  } catch (authError) {
    dispatch(getUser({error: authError}))
    history.push('/login')
    return undefined
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

//firstName,lastName,zip,city,address1,address2,state
export const authNewAccount = function(inputs, history) {
  return async dispatch => {
    let res
    try {
      res = await axios.post(`/auth/${inputs.formName}`, {
        email: inputs.email,
        password: inputs.password,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        zip: inputs.zip,
        city: inputs.city,
        address1: inputs.address1,
        address2: inputs.address2,
        state: inputs.state
      })
      if (res.data.firstName) {
        toastr.success(`Welcome ${res.data.firstName}!`)
      } else {
        toastr.success(`Welcome ${res.data.email}!`)
      }
    } catch (authError) {
      dispatch(getUser({error: authError}))
      history.push('/signup')
      return undefined
    }
    try {
      dispatch(getUser(res.data))
      history.push('/home')
    } catch (dispatchOrHistoryErr) {
      console.error(dispatchOrHistoryErr)
    }
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}

export const thunk_addToCart = (userId, item) => {
  return async dispatch => {
    if (userId) {
      item.passwordtest = 'test test'
      item.quantity = item.quantity * 1
      const response = await axios.put(`/api/users/${userId}/cart`, item)
      const action = addToCart(response.data)
      dispatch(action)
    } else {
      const action = addToCartGuest(item)
      dispatch(action)
    }
  }
}

export const thunk_sendToStripe = stripeData => {
  return async dispatch => {
    const response = await axios.post('/charge', stripeData)
    // OB/LM: rotten log
    console.log(response)
    const action = clearCart()
    dispatch(action)
  }
}

export const thunk_removeError = () => dispatch => {
  dispatch(removeError())
}

/**
 * INITIAL STATE
 */
const defaultUser = {
  cart: []
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case ADD_TO_CART:
      return {...state, cart: action.item}
    case ADD_TO_CART_GUEST:
      let newCart = state.cart.reduce((accum, elem) => {
        if (elem.id === action.item.id) {
          action.item.quantity = action.item.quantity * 1 + elem.quantity * 1
          accum.push(action.item)
          return accum
        }
        accum.push(elem)
        return accum
      }, [])

      return {...state, cart: [...state.cart, action.item]}
    case REMOVE_ERROR:
      delete state.error
      return state
    case CLEAR_CART:
      return {...state, cart: []}
    default:
      return state
  }
}
