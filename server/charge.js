const router = require('express').Router()
const keySecret = process.env.SECRET_KEY
const stripe = require('stripe')(keySecret)

router.post('/', async (req, res, next) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email
    })
    const source = await stripe.customers.createSource(customer.id, {
      source: req.body.token
    })
    console.log(source)
    let {status} = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      description: 'An example charge',
      source: source
    })
    console.log('charge: ', status)
    res.json(status)
  } catch (error) {
    next(error)
  }
})

module.exports = router
