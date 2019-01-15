const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.put('/:userId/cart', async (req, res, next) => {
  if (!req.user && process.env.NODE_ENV !== 'test') {
    res.status(401).send('Sorry not logged in')
  } else {
    try {
      let oldcart = await User.findById(req.params.userId)
      let newcart
      if (oldcart.cart.length > 0) {
        newcart = oldcart.cart.reduce((accum, elem) => {
          if (elem.id === req.body.id) {
            req.body.quantity = req.body.quantity + elem.quantity
            accum.push(req.body)
            return accum
          }
          accum.push(elem)
          return accum
        }, [])
        if (
          newcart.reduce((accum, elem) => {
            if (req.body.id === elem.id) {
              accum.push(req.body)
              return accum
            }
            return accum
          }, []).length === 0
        ) {
          newcart.push(req.body)
        }
      } else {
        newcart = [req.body]
      }
      await User.update(
        {
          cart: newcart
        },
        {
          where: {
            id: req.params.userId
          },

          returning: true,
          plain: true
        }
      )
      res.send(newcart)
    } catch (err) {
      next(err)
    }
  }
})

// router.get('/', async (req, res, next) => {
//   // this will show us all our users anyone who goes to our
//   // website and types /api/users
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })
