import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ConnectedFeaturedWines from './FeaturedWines'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  //
  let welcome = ''
  if (email) {
    welcome = `Hello, ${email}!`
  } else {
    welcome = 'Hello, guest!'
  }

  return (
    <div>
      <h3>{welcome}</h3>
      <ConnectedFeaturedWines />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.userReducer.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
