import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllWines} from '../AllWines'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllWines', () => {
  let allWines

  beforeEach(() => {
    allWines = shallow(<AllWines email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Hello, cody@email.com!')
  })
})
