import React from 'react'
import {connect} from 'react-redux'
import {thunk_gotSingleWine} from '../store/wine'
import {Link} from 'react-router-dom'
import {thunk_addToCart} from '../store/user'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import ButtonBase from '@material-ui/core/ButtonBase'
import InputBase from '@material-ui/core/InputBase'
import Input from '@material-ui/core/Input'

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 800
  },
  image: {
    width: 140,
    height: 180
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  }
})
import toastr from 'toastr'

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
    this.handleChange = this.handleChange.bind(this)
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
    toastr.success(`${this.state.quantity} ${this.state.brand} added to cart!`)
  }

  handleChange(evt) {
    this.setState({
      quantity: evt.target.value
    })
  }

  render() {
    const {classes} = this.props
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
      <React.Fragment>
        <div>
          <CssBaseline />
          {/* <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <CameraIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Wine Store
            </Typography>
          </Toolbar>
        </AppBar> */}
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={16}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src={imageURL} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={16}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {brand} {vintage}
                      </Typography>
                      <Typography gutterBottom>{varietal}</Typography>
                      <Typography color="textSecondary">
                        {description}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography style={{cursor: 'pointer'}}>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          name="quantity"
                          value={this.state.quantity}
                          onChange={this.handleChange}
                        />
                        <Button
                          type="submit"
                          onClick={this.handleClick}
                          size="small"
                          color="primary"
                        >
                          Add to Cart
                        </Button>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">${price}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </div>
        <div>
          <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Browse our complete list of wines:
            </Typography>
            <Link to="/wines/allWines">
              <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
                component="p"
              >
                View All Wines
              </Typography>
            </Link>
          </footer>
        </div>
      </React.Fragment>
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

SingleWine.propTypes = {
  classes: PropTypes.object.isRequired
}

const ConnectedSingleWine = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SingleWine)
)

export default ConnectedSingleWine
