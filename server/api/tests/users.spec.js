/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Tests single user cart', () => {
    const userCody = {
      firstName: 'Cody',
      lastName: 'Pug',
      email: 'cody@puppybook.com',
      cart: [{id: 1}, {id: 2}]
    }

    beforeEach(() => {
      return User.create(userCody)
    })

    it('PUT /api/users/:userId/cart', async () => {
      const res = await request(app)
        .put('/api/users/1/cart', {id: 3})
        .expect(200)
      console.log(res)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(3)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
