import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'

const payments = [
  {name: 'Card type', detail: 'Visa'},
  {name: 'Card holder', detail: 'Ms Emily Winelover'},
  {name: 'Card number', detail: 'xxxx-xxxx-xxxx-42424'},
  {name: 'Expiry date', detail: '04/2024'}
]

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing.unit * 2
  }
})

class Review extends React.Component {
  render() {
    let products = this.props.wine
    const user = this.props.user
    const {classes} = this.props
    const total =
      products.reduce((accum, elem) => {
        accum = accum + elem.price * elem.quantity
        return accum
      }, 0) / 100

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {products.map(product => {
            return (
              <ListItem className={classes.listItem} key={product.id}>
                <ListItemText
                  primary={`${product.brand} x ${product.quantity}`}
                  secondary={`${product.varietal}`}
                />
                <Typography variant="body2">{`$${(
                  product.price *
                  product.quantity /
                  100
                ).toFixed(2)}`}</Typography>
              </ListItem>
            )
          })}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" className={classes.total}>
              {'$' + total.toFixed(2)}
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Shipping
            </Typography>
            <Typography gutterBottom>{`${user.firstName} ${
              user.lastName
            }`}</Typography>
            <Typography gutterBottom>{`${user.address1}, ${user.address2}, ${
              user.city
            }, ${user.state}`
            /* addresses.join(', ') */
            }</Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Payment details
            </Typography>
            <Grid container>
              {payments.map(payment => (
                <React.Fragment key={payment.name}>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.detail}</Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

Review.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    wine: state.userReducer.cart,
    user: state.userReducer
  }
}

const connectReview = connect(mapStateToProps, null)(withStyles(styles)(Review))

export default connectReview
