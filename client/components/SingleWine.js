import React from 'react'
import {connect} from 'react-redux'
import {thunk_gotSingleWine} from '../store/wine'
import {withRouter, Link} from 'react-router-dom'

class SingleWine extends React.Component {
  async componentDidMount() {
    const wineId = this.props.location.pathname.slice(7)
    await this.props.getSingleWine(wineId)
  }

  render() {
    const singleWine = this.props.singleWine
    if (!singleWine) {
      return <div>....loading</div>
    }

    const {
      brand,
      varietal,
      vintage,
      imageURL,
      description,
      price
    } = this.props.singleWine

    return (
      <div>
        <h1>{brand}</h1>
        <h3>{varietal}</h3>
        <h3>{vintage}</h3>
        <img src={imageURL} />
        <h4>Qty:</h4>
        <input type="number" min="1" max="100" value="1" />
        <button>Add to Cart</button>
        <p>Description: {description}</p>
        <p>On sale! {price}</p>
        <h3>Browse our complete list of wines:</h3>
        <Link to="/wines">View All Wines</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleWine: state.wineReducer.singleWine
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleWine: wineId => {
      return dispatch(thunk_gotSingleWine(wineId))
    }
  }
}

const ConnectedSingleWine = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleWine)
)

export default ConnectedSingleWine
