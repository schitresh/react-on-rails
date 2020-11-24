import React, { Component } from "react"
import axios from 'axios'
import { ApiHost } from "../constants"

import { withStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Grid, TextField, Typography, Button, IconButton, CssBaseline, Avatar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { FormControlLabel, Checkbox, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})

class Signup extends Component{
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      referral: props.match.params.key,
      errors: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  handleSubmit= (event) => {
    event.preventDefault()
    const { name, email, password, password_confirmation, referral } = this.state
    let user = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    }

    axios.post(`/users/?referrer=${referral}`, {user})
          .then(response => {
            if (response.status === 200) {
              this.props.loginStatus()
              this.redirect()
            } else {
                alert(`HTML Error: ${response.status}`)
            }
          })
          .catch(error => alert(error))
  }

  redirect = () => {
    this.props.history.push("/profile")
  }

  handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul>
      </div>
    )
  }

  render(){
    const { classes } = this.props

    if(this.props.loggedIn){
      this.redirect()
    }
    
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
          <Typography component="h1" variant="h5">SIGN UP</Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                onChange={this.handleChange}
                variant="outlined"
                required
                fullWidth
                id="name"
                name="name"
                label="Name"
                autoFocuss
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Password Confirmation"
                  type="password"
                  id="password_confirmation"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
  }
}

export default withStyles(useStyles)(Signup)