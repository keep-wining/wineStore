import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import FeaturedWines from './components/FeaturedWines'
import ConnectedAllWines from './components/AllWines'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
