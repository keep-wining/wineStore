const router = require('express').Router()
const keySecret = process.env.SECRET_KEY
const stripe = require('stripe')(keySecret)

router.post('/', async (req, res, next) => {
  try {
    const {status} = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      description: 'An example charge',
      source: req.body.token
    })

    res.json(status)
  } catch (error) {
    next(error)
  }
})

module.exports = router
