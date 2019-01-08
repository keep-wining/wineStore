const router = require('express').Router()
const {Wine} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const featuredWine = await Wine.findAll({
      where: {
        id: {
          [Op.or]: [1, 2, 3, 4, 5]
        }
      }
    })
    res.json(featuredWine)
  } catch (err) {
    next(err)
  }
})
