import React from 'react'
import {authNewAccount} from '../store'
import {thunk_removeError} from '../store/user'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import toastr from 'toastr'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
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
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },

  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  }
})

class NewAccount extends React.Component {
  render() {
    const {classes} = this.props
    const {name, displayName, handleSubmit, error, removeError} = this.props
    if (error) {
      toastr.error('Please fill out all required fields')
      removeError()
    }
    return (
      <main className={classes.layout}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create an account
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} name={name}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <label htmlFor="email">Email address</label>
                <input name="email" type="text" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor="password">Create password</label>
                <input name="password" type="password" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" type="text" />
                <br />
              </Grid>

              <Grid item xs={12} sm={6}>
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" type="text" />
              </Grid>
              <FormControl margin="normal" required fullWidth>
                <label htmlFor="address1">Street Address</label>
                <input name="address1" type="text" />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <label htmlFor="address2">Apt/Unit/Ste</label>
                <input name="address2" type="text" />
              </FormControl>
              <Grid item xs={12} sm={6}>
                <label htmlFor="city">City</label>
                <input name="city" type="text" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor="state">State</label>
                <input name="state" type="text" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor="zip">Zip Code</label>
                <input name="zip" type="number" />
              </Grid>
            </Grid>
            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              {displayName}
            </Button>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </Paper>
      </main>
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

const mapDispatchNewAccount = (dispatch, ownProps) => {
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
        authNewAccount(
          {
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
          },
          ownProps.history
        )
      )
    },
    removeError: () => {
      dispatch(thunk_removeError())
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
  withStyles(styles)(NewAccount)
)
export default ConnectedNewAccount
