const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.put('/:userId/cart', async (req, res, next) => {
  try {
    await User.update(
      {
        cart: [req.body]
      },
      {
        where: {
          id: req.params.userId
        },

        returning: true,
        plain: true
      }
    )
    res.send(req.body)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
