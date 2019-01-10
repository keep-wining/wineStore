import axios from 'axios'
import history from '../history'
import {runInNewContext} from 'vm'

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
    // OB/LM: good that you're thinking about error handling, go further, report the error to the end user, such as a "toast" notification (e.g. check out react toastr: https://tomchentw.github.io/react-toastr/)
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
