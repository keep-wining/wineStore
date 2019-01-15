import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

function PaymentForm(props) {
  console.log(props)
  // props.stripe
  //   .createToken('bank_account', {
  //     country: 'US',
  //     currency: 'usd',
  //     routing_number: '110000000',
  //     account_number: '000123456789',
  //     account_holder_name: 'Jenny Rosen',
  //     account_holder_type: 'individual'
  //   })
  //   .then(result => {
  //     console.log(result)
  //   })

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            value={props.state.cardName}
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            value={props.state.cardNumber}
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiration date"
            fullWidth
            value={props.state.expDate}
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            value={props.state.cvv}
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default PaymentForm
