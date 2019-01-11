/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Wine = db.model('wine')

describe('Wine routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Tests allWines route', () => {
    const wineTest = {
      brand: 'Fullstack Vineyards',
      varietal: 'Developer Noir',
      vintage: 2019,
      color: 'Red',
      description:
        'California - A bold, enticing blend with notes of coffee and tobacco. Drink this now or put it away in your cellar - it will age into a beautiful wine to be enjoyed for many years to come',
      price: 17000,
      imageURL:
        'https://yspimages-yoursurprisecom.netdna-ssl.com/articleimage/67/670aba5d20cf37e7c8b8306843cb2baa/belvy-red-with-printed-label_small.jpg'
    }

    beforeEach(() => {
      return Wine.create(wineTest)
    })

    it('GET /api/wines/allWines', async () => {
      const res = await request(app)
        .get('/api/wines/allWines')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].brand).to.be.equal('Fullstack Vineyards')
    })
  }) // end describe('/api/wines')
}) // end describe('Wine routes')
