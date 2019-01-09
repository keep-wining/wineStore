import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_FEATURED_WINES = 'GET_FEATURED_WINES'

const GET_ALL_WINES = 'GET_ALL_WINES'

// ACTION CREATORS

const getFeaturedWines = wines => ({
  type: GET_FEATURED_WINES,
  wines
})

const getAllWines = allWines => ({
  type: GET_ALL_WINES,
  allWines
})

// THUNK CREATORS

export const thunk_gotFeaturedWines = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/wines')
    dispatch(getFeaturedWines(data))
  } catch (err) {
    console.error(err)
  }
}

export const thunk_gotAllWines = () => {
  return async dispatch => {
    const response = await axios.get('/api/wines/allWines')
    const action = getAllWines(response.data)
    dispatch(action)
  }
}

// INITIAL STATE
const initialState = {
  featuredWines: [],
  AllWines: []
}

// WINE SUB-REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEATURED_WINES:
      return {...state, featuredWines: action.wines}
    case GET_ALL_WINES:
      return {...state, wines: action.allWines}
    default:
      return state
  }
}
