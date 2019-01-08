import React from 'react'
import {connect} from 'react-redux'

class FeaturedWines extends React.Component {
  componentDidMount() {
    this.props.getFeaturedWines()
  }

  render() {
    const featuredWines = this.props.featuredWines
    return (
      <div>
        {featuredWines.map(wine => {
          return (
            <ul key={wine.id}>
              <li>{wine.brand}</li>
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
    featuredWines: state.featuredWines
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFeaturedWines: () => {
      return dispatch(action_getFeaturedWines())
    }
  }
}

const ConnectedFeaturedWines = connect(mapStateToProps, mapDispatchToProps)(
  FeaturedWines
)

export default ConnectedFeaturedWines
