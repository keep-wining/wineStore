import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_FEATURED_WINES = 'GET_FEATURED_WINES'
const GET_SINGLE_WINE = 'GET_SINGLE_WINE'

// ACTION CREATORS

const getFeaturedWines = wines => ({
  type: GET_FEATURED_WINES,
  wines
})

const getSingleWine = wine => ({
  type: GET_SINGLE_WINE,
  wine
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

export const thunk_gotSingleWine = wineId => {
  return async dispatch => {
    const response = await axios.get(`/api/wines/${wineId}`)
    dispatch(getSingleWine(response.data))
  }
}

// INITIAL STATE
const initialState = {
  featuredWines: [],
  singleWine: {}
}

// WINE SUB-REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEATURED_WINES:
      return {...state, featuredWines: action.wines}
    case GET_SINGLE_WINE:
      return {...state, singleWine: action.wine}
    default:
      return state
  }
}
