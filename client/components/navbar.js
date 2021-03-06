import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import toastr from 'toastr'

const Navbar = ({handleClick, isLoggedIn, firstName}) => (
  <div>
    <div className="navh1">
      <Link to="/">
        <h1>Keep Wining</h1>
      </Link>
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/wines/allWines">Wines</Link>
          <Link to="/checkout">Checkout</Link>
          <Link
            to="/"
            onClick={() => {
              handleClick(firstName)
            }}
          >
            Logout
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/wines/allWines">Wines</Link>
          <Link to="/checkout">Checkout</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.userReducer.id,
    firstName: state.userReducer.firstName
  }
}

const mapDispatch = dispatch => {
  return {
    async handleClick(firstName) {
      await dispatch(logout())
      toastr.success(`Goodbye ${firstName}!`)
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
