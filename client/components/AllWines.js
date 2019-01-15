import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {thunk_gotAllWines} from '../store/wine'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
})

class AllWines extends React.Component {
  async componentDidMount() {
    await this.props.getAllWines()
  }

  render() {
    const {classes} = this.props
    const wines = this.props.wines
    if (!wines) {
      return <div>...loading</div>
    }

    return (
      <React.Fragment>
        <CssBaseline />
        {/* <AppBar position="static" className={classes.appBar}> */}
        {/* <Toolbar>
            <CameraIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Wine Store
            </Typography>
          </Toolbar> */}
        {/* </AppBar> */}
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Our Wines
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                We have traveled the world to bring you the best possible
                variety of wines. Browse our collection below, and you are sure
                to find a wine to delight your taste buds.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Link to="/signup">
                      <Button variant="contained" color="primary">
                        Sign Up
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/review">
                      <Button variant="outlined" color="primary">
                        View Cart
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={40}>
              {wines.map(wine => (
                <Grid item key={wine.id} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <Link to={`/wines/${wine.id}`}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={wine.imageURL}
                        height={2}
                        title="Image title"
                      />
                    </Link>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {wine.brand} {wine.vintage}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h3">
                        {wine.varietal}
                      </Typography>
                      <Typography>${(wine.price / 100).toFixed(2)}</Typography>
                    </CardContent>
                    <CardActions>
                      <Link to={`/wines/${wine.id}`}>
                        <Button size="small" color="primary">
                          View
                        </Button>
                      </Link>
                      <Button size="small" color="primary">
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            About Us
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Meet the members of our team
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    wines: state.wineReducer.wines,
    singleWine: state.wineReducer.singleWine
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllWines: () => {
      return dispatch(thunk_gotAllWines())
    }
  }
}

AllWines.propTypes = {
  classes: PropTypes.object.isRequired
}

const ConnectedAllWines = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AllWines)
)

export default ConnectedAllWines
