import React, { Component } from 'react';
import axios from 'axios'
import { Redirect, Link, useHistory, withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
})

class Navbar extends Component{
  constructor(props){
    super(props)
  }

  handleClick = (event) => {
    event.preventDefault()

    axios.get(`/users/sign_out`, {})
    // fetch(`/users/sign_out`, {method: 'DELETE', redirect: 'follow'})
        .then(response => {
          this.props.handleLogout()
          this.props.history.push('/')
        })
        .catch(error => console.log("error", error))
  }

  redirect = () => {
    this.props.history.push("/")
  }

  render(){
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              SHIFTS
            </Typography>
            <Button href="/" color="inherit" exact>Home</Button>

            { !this.props.loggedIn ? (
                <>
                  <Button href="/login" color="inherit" exact>Login</Button>
                  <Button href="/signup" color="inherit" exact>Sign Up</Button>
                </>
              )
              : (
                <>
                  <Button href="/profile" color="inherit" exact>Profile</Button>
                  <Button onClick={this.handleClick} color="inherit" exact>Log Out</Button>
                </>
              )
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navbar = withStyles(useStyles)(Navbar)
export default withRouter(Navbar)
// export default withStyles(useStyles)(Navbar)