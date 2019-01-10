import React from 'react'
import {authNewAccount} from '../store'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class NewAccount extends React.Component {
  render() {
    const {name, displayName, handleSubmit, error} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" />
          </div>
          <div>
            <label htmlFor="zip">
              <small>Zip Code</small>
            </label>
            <input name="zip" type="number" />
          </div>
          <div>
            <label htmlFor="city">
              <small>City</small>
            </label>
            <input name="city" type="text" />
          </div>
          <div>
            <label htmlFor="address1">
              <small>Address 1</small>
            </label>
            <input name="address1" type="text" />
          </div>
          <div>
            <label htmlFor="address2">
              <small>Address 2</small>
            </label>
            <input name="address2" type="text" />
          </div>
          <div>
            <label htmlFor="state">
              <small>State</small>
            </label>
            <input name="state" type="text" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    )
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.userReducer.error
  }
}

const mapDispatchNewAccount = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const zip = evt.target.zip.value
      const city = evt.target.city.value
      const address1 = evt.target.address1.value
      const address2 = evt.target.address2.value
      const state = evt.target.state.value
      dispatch(
        authNewAccount({
          email,
          password,
          formName,
          firstName,
          lastName,
          zip,
          city,
          address1,
          address2,
          state
        })
      )
    }
  }
}

/**
 * PROP TYPES
 */
NewAccount.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

const ConnectedNewAccount = connect(mapSignup, mapDispatchNewAccount)(
  NewAccount
)
export default ConnectedNewAccount
