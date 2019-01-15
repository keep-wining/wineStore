import axios from 'axios'

// ACTION TYPE
const ADD_TO_CART = 'ADD_TO_CART'
const PURCHASE = 'PURCHASE'

// ACTION CREATOR
const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

const purchase = () => ({
  type: PURCHASE
})

// THUNK CREATOR
export const thunk_addToCart = item => async dispatch => {
  try {
    const {data} = await axios.put('/api/:userId/cart', item)
    dispatch(addToCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const thunk_purchase = order => async dispatch => {
  try {
    await axios.post('api/order', order)
    dispatch(purchase())
  } catch (err) {
    console.error(err)
  }
}

// INITIAL STATE
// OB/LM: this seems like it doesn't need to be nested, could just be cart
const initialState = {
  cart: []
}

// ORDER SUB-REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, cart: action.item}
    case PURCHASE:
      return {...state, cart: []}
    default:
      return state
  }
}
