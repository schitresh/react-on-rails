import React, { Component } from 'react'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Grid, TextField, Typography, Button, IconButton, CssBaseline, Avatar } from '@material-ui/core'
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
})

class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      remember_me: false,
      errors: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { email, password, remember_me } = this.state
    let user = {
      email: email,
      password: password,
      remember_me: remember_me
    }

    axios.post(`/users/sign_in`, {user})
          .then(response => {
            if(response.status === 200) {
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
        <ul>
          { this.state.errors.map(error => {
            return <li key={error}>{error}</li>
          })
          }
        </ul>
      </div>
    )
  }

  render(){
    if(this.props.loggedIn){
      this.redirect()
    }

    const { classes } = this.props

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIGN IN
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <TextField
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              onChange={this.handleChange}
              control={<Checkbox value="true" color="primary" />}
              name="remember_me"
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <div>
            { this.state.errors ? this.handleErrors() : null }
          </div>
        </div>

      </Container>
    )
  }
}

export default withStyles(useStyles)(Login)
