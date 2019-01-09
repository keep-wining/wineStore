import React from 'react'
import {connect} from 'react-redux'
import {thunk_gotFeaturedWines} from '../store/wine'

class FeaturedWines extends React.Component {
  async componentDidMount() {
    await this.props.getFeaturedWines()
  }

  render() {
    const featuredWines = this.props.featuredWines
    if (!featuredWines) {
      return <div>....loading</div>
    }

    return (
      <div>
        {featuredWines.map(wine => {
          return (
            <ul key={wine.id}>
              <li>{wine.brand}</li>
              <img src={wine.imageURL} />
              <li>{wine.price}</li>
              <li>{wine.description}</li>
              <li>{wine.vintage}</li>
            </ul>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    featuredWines: state.wineReducer.featuredWines
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFeaturedWines: () => {
      return dispatch(thunk_gotFeaturedWines())
    }
  }
}

const ConnectedFeaturedWines = connect(mapStateToProps, mapDispatchToProps)(
  FeaturedWines
)

export default ConnectedFeaturedWines
