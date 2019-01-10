import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {thunk_gotAllWines} from '../store/wine'

class AllWines extends React.Component {
  async componentDidMount() {
    await this.props.getAllWines()
  }

  render() {
    const wines = this.props.wines
    if (!wines) {
      return <div>...loading</div>
    }

    return (
      <div>
        {wines.map(wine => (
          <div key={wine.id}>
            <h3>
              {wine.brand} {wine.varietal}
            </h3>
            <div>{wine.vintage} </div>
            <Link to={`/wines/${wine.id}`}>
              <img src={wine.imageURL} />
            </Link>
            <div>${wine.price}</div>
            <button type="submit">Click to view/order</button>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    wines: state.wineReducer.wines
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllWines: () => {
      return dispatch(thunk_gotAllWines())
    }
  }
}

const ConnectedAllWines = connect(mapStateToProps, mapDispatchToProps)(AllWines)

export default ConnectedAllWines
