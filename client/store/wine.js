import axios from 'axios'

// ACTION TYPES
const GET_FEATURED_WINES = 'GET_FEATURED_WINES'

// ACTION CREATORS

const getFeaturedWines = wines => ({
  type: GET_FEATURED_WINES,
  wines
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

// INITIAL STATE
const initialState = {
  featuredWines: []
}

// WINE SUB-REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEATURED_WINES:
      return {...state, featuredWines: action.wines}
    default:
      return state
  }
}
