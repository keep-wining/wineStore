/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {thunk_gotAllWines} from '../wine'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

const wineTest = [
  {
    brand: 'Fullstack Vineyards',
    varietal: 'Developer Noir',
    vintage: 2019,
    color: 'Red',
    description:
      'California - A bold, enticing blend with notes of coffee and tobacco. Drink this now or put it away in your cellar - it will age into a beautiful wine to be enjoyed for many years to come',
    price: 17000,
    imageURL:
      'https://yspimages-yoursurprisecom.netdna-ssl.com/articleimage/67/670aba5d20cf37e7c8b8306843cb2baa/belvy-red-with-printed-label_small.jpg'
  },
  {
    brand: 'CodeSLO Vineyards',
    varietal: 'Coder Blanc',
    vintage: 2017,
    color: 'White',
    description: 'California - Good stuff',
    price: 200,
    imageURL:
      'https://yspimages-yoursurprisecom.netdna-ssl.com/articleimage/67/670aba5d20cf37e7c8b8306843cb2baa/belvy-red-with-printed-label_small.jpg'
  }
]

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {allWines: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('all wines', () => {
    it('eventually dispatches the GET_ALL_WINES action', async () => {
      const fakeWines = wineTest
      mockAxios.onGet('/api/wines/allWines').replyOnce(200, fakeWines)
      await store.dispatch(thunk_gotAllWines())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_WINES')
    })
    it('returns array of all wines', async () => {
      const fakeWines = wineTest
      mockAxios.onGet('/api/wines/allWines').replyOnce(200, fakeWines)
      await store.dispatch(thunk_gotAllWines())
      const actions = store.getActions()
      expect(actions[0].allWines.length).to.be.equal(2)
    })
  })
})
