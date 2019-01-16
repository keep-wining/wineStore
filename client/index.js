import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import store from './store'
import App from './app'
import {StripeProvider} from 'react-stripe-elements'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <StripeProvider apiKey="pk_test_zCMznHtGgXltFEp76KGbZlSZ">
        <App />
      </StripeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
