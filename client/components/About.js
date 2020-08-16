import React from 'react'
import {Link} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

const styles = theme => ({
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

const About = props => {
  const {classes} = props
  return (
    <React.Fragment>
      <div>
        <CssBaseline />
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={16}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      Our Team
                    </Typography>
                    <Typography gutterBottom>The Keep Wining Team</Typography>
                    <Typography color="textSecondary">
                      We are a team of four extraordinary wine lovers. In our
                      spare time we like to create awesome web applications.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
      <div>
        <footer className={classes.footer}>
          <div className={classes.heroButtons}>
            <Grid container spacing={16} justify="center">
              <Grid item>
                <Link to="/wines/allWines">
                  <Button variant="contained" color="primary">
                    View our full selection of wines
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </div>
        </footer>
      </div>
    </React.Fragment>
  )
}

About.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(About)
