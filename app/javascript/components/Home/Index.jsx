import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Grid, Typography, Button, IconButton, CssBaseline } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import home_image from './home_image.jpg';

const useStyles = (theme) => ({
  root: {
    height: '100vh',
    color: 'white',
  },
  image: {
    backgroundImage: `url(${home_image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  homeButtons: {
    marginTop: theme.spacing(4),
  },
  homeContainer: {
    marginTop: theme.spacing(4)
  }
})

class Index extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const {classes} = this.props

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} className={classes.image}>
            <Container maxWidth="sm" className={classes.homeContainer}>
              <Typography component="h1" variant="h2" align="center" gutterBottom>
                Welcome to SHIFTS
              </Typography>
              { !this.props.loggedIn ? (
                <div className={classes.homeButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button variant="contained" size="large" color="primary" href="/login">
                        Login
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" size="large" color="secondary" href="/signup">
                        Signup
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              ):(
                <Typography component="h4" variant="h5" align="center" gutterBottom>
                  You are Logged In
                </Typography>
              )
              }
            </Container>

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(useStyles)(Index)