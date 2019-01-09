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

router.get('/allWines', async (req, res, next) => {
  try {
    const allWines = await Wine.findAll()
    res.json(allWines)
  } catch (err) {
    next(err)
  }
})

router.get('/:wineId', async (req, res, next) => {
  try {
    const wine = await Wine.findById(req.params.wineId)
    res.json(wine)
  } catch (error) {
    next(error)
  }
})
