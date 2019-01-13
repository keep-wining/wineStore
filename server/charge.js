const router = require('express').Router()
const keySecret = process.env.SECRET_KEY
const stripe = require('stripe')(keySecret)

router.post('/', async (req, res, next) => {
  console.log(req.body)

  try {
    const source = await stripe.createSource({
      type: 'ideal',
      amount: 1099
    })
    const amount = req.body.amount
    const customer = await stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    const charge = await stripe.charges.create({
      amount,
      description: 'Sample Charge',
      currency: 'usd',
      customer: customer.id
    })
    console.log('charge: ', charge)
  } catch (error) {
    next(error)
  }
})

module.exports = router
