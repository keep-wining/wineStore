import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'
import {thunk_sendToStripe} from '../store/user'
import {connect} from 'react-redux'
import {Elements} from 'react-stripe-elements'
import {injectStripe} from 'react-stripe-elements'

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
})

const steps = ['Shipping address', 'Payment details', 'Review your order']

function getStepContent(step, state1, handleChange) {
  switch (step) {
    case 0:
      return <AddressForm state={state1} handleChange={handleChange} />
    case 1:
      return <PaymentForm state={state1} handleChange={handleChange} />
    case 2:
      return <Review />
    default:
      throw new Error('Unknown step')
  }
}

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      activeStep: 0,
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      cardName: '',
      cardNumber: '',
      expDate: '',
      cvv: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  // state = {
  //   activeStep: 0
  // }
  handleChange = evt => {
    this.setState({
      [evt.target.id]: evt.target.value
    })
  }

  handleNext = () => {
    if (this.state.activeStep === 2) {
      const total = this.props.userData.cart.reduce((accum, elem) => {
        accum = accum + elem.price * elem.quantity
        return accum
      }, 0)
      this.props.sendToStripe({...this.state, amount: total})
    }
    // this.props.stripe.createToken().then(r => {
    //   console.log(r, 'blbhabdf')
    // })

    this.setState(state => ({
      activeStep: state.activeStep + 1
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }))
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    })
  }

  render() {
    const {classes} = this.props
    const {activeStep} = this.state
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Wine Store
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep, this.state, this.handleChange)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    userData: state.userReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendToStripe: stripeData => {
      dispatch(thunk_sendToStripe(stripeData))
    }
  }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Checkout)
)

export default injectStripe(connectedComponent)
