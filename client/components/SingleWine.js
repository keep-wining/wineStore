import React from 'react'
import {connect} from 'react-redux'
import {thunk_gotSingleWine} from '../store/wine'
import {Link} from 'react-router-dom'
import {thunk_addToCart} from '../store/user'

class SingleWine extends React.Component {
  constructor() {
    super()
    this.state = {
      brand: '',
      varietal: '',
      vintage: '',
      description: '',
      price: '',
      id: 0,
      quantity: 1
    }
    this.handleClick = this.handleClick.bind(this)
    this.handChange = this.handChange.bind(this)
  }
  async componentDidMount() {
    const wineId = this.props.match.params.wineId
    await this.props.getSingleWine(wineId)
    this.setState({
      brand: this.props.singleWine.brand,
      varietal: this.props.singleWine.varietal,
      vintage: this.props.singleWine.vintage,
      description: this.props.singleWine.description,
      price: this.props.singleWine.price,
      id: this.props.singleWine.id
    })
  }

  handleClick(evt) {
    evt.preventDefault()
    this.props.addToCart(this.props.user, this.state)
  }

  handChange(evt) {
    this.setState({
      quantity: evt.target.value
    })
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
        <input
          type="number"
          min="1"
          max="100"
          name="quantity"
          value={this.state.quantity}
          onChange={this.handChange}
        />
        <button type="submit" onClick={this.handleClick}>
          Add to Cart
        </button>
        <p>Description: {description}</p>
        <p>On sale! {price}</p>
        <h3>Browse our complete list of wines:</h3>
        <Link to="/wines/allWines">View All Wines</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleWine: state.wineReducer.singleWine,
    user: state.userReducer.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleWine: wineId => {
      return dispatch(thunk_gotSingleWine(wineId))
    },
    addToCart: (userId, item) => {
      return dispatch(thunk_addToCart(userId, item))
    }
  }
}

const ConnectedSingleWine = connect(mapStateToProps, mapDispatchToProps)(
  SingleWine
)

export default ConnectedSingleWine
