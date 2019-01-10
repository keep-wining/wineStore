const router = require('express').Router()
const {Wine} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

// OB/LM: could combine two routes below into one route, and use the query string for feature or not, e.g. instead of GET /api/wines/, do GET /api/wines?featured=trued, then access that via `req.query` (i.e. that will be `{featured: true}`)

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
