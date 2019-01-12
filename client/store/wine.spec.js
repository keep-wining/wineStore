/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getAllWines} from './wine'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

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
