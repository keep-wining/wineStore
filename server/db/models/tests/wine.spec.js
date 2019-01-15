/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../index')
const Wine = db.model('wine')

describe('Wine model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // describe('The `Wine` model', function() {
  //initial force sync to clear the db

  //create wine BEFORE EACH test
  let wine
  let brand = 'Fullstack Vineyards'
  let varietal = 'Developer Noir'
  let vintage = 2019
  let color = 'Red'
  let description =
    'California - A bold, enticing blend with notes of coffee and tobacco. Drinkt this now or put it away in your cellar - it will age into a beautiful wine to be enjoyed for many years to come'
  let price = 17000
  let imageURL =
    'https://yspimages-yoursurprisecom.netdna-ssl.com/articleimage/67/670aba5d20cf37e7c8b8306843cb2baa/belvy-red-with-printed-label_small.jpg'

  beforeEach(function() {
    wine = Wine.build({
      brand,
      varietal,
      vintage,
      color,
      description,
      price,
      imageURL
    })
  })

  afterEach(function() {
    return Wine.truncate({cascade: true})
  })

  describe('Checks on model definition', () => {
    // OB/LM: this tests the sequelize library more than your code
    it('includes `brand`, `varietal`, `vintage`, and `color` fields', () => {
      return wine.save().then(savedWine => {
        expect(savedWine.brand).to.equal('Fullstack Vineyards')
        expect(savedWine.varietal).to.equal('Developer Noir')
        expect(savedWine.vintage).to.equal(2019)
        expect(savedWine.color).to.equal('Red')
      })
    })

    it('requires `brand`', () => {
      wine.brand = null
      // OB/LM: you could look into chai-as-promised, could shorten this code to something like `expect(wine.validate()).to.eventually.be.rejected()`
      return wine.validate().then(
        () => {
          throw new Error('validation should fail when brand is null')
        },
        createdError => expect(createdError).to.be.an.instanceOf(Error)
      )
    })

    it('requires `varietal`', () => {
      wine.varietal = null
      return wine.validate().then(
        () => {
          throw new Error('validation should fail when varietal is null')
        },
        createdError => expect(createdError).to.be.an.instanceOf(Error)
      )
    })

    it('requires `vintage`', () => {
      wine.vintage = null
      return wine.validate().then(
        () => {
          throw new Error('validation should fail when vintage is null')
        },
        createdError => expect(createdError).to.be.an.instanceOf(Error)
      )
    })

    it('requires `color` to be Red or White', () => {
      wine.color = 'Green'
      return wine.validate().then(
        () => {
          throw new Error(
            'validation should fail when color is not in Red or White'
          )
        },
        createdError => {
          expect(createdError).to.be.an.instanceOf(Error)
          expect(createdError.message).to.contain('Validation error')
        }
      )
    })
    //end of `attributes definition` describe block
  })
})
