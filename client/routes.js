import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  UserHome,
  SingleWine,
  AllWines,
  NewAccount,
  Checkout,
  Review
} from './components'

import {me} from './store'
import FeaturedWines from './components/FeaturedWines'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors who are not logged in */}
        <Route exact path="/wines/allWines" component={AllWines} />
        <Route exact path="/wines/:wineId" component={SingleWine} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={NewAccount} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/review" component={Review} />
        <Route exact path="/" component={FeaturedWines} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/wines/allWines" component={AllWines} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/review" component={Review} />
            <Route exact path="/home" component={UserHome} />
          </Switch>
        )}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.userReducer.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
