import React, { Component } from 'react'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Grid, TextField, Typography, Button, IconButton, CssBaseline } from '@material-ui/core'

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
})

class Profile extends Component{
  constructor(props){
    super(props)
    this.state = {
      refer_email: ''
    }
  }

  componentDidUpdate(){
    if(!(this.props.loggedIn)){
      this.redirect()
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
    const refer_email = this.state.refer_email
    let refer = {
      refer_email: refer_email
    }
    axios.get(`/users/refer`, {refer})
          .then(response => {
            if(response.data.status === true) {
              alert("Referred")
              window.location.reload()
            } else {
              alert(`Error: ${response.data.error}`)
            }
          })
          .catch(error => alert(error))
  }

  redirect = () => {
    this.props.history.push("/")
  }

  render(){
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            Welcome to Your Profile {this.props.userName}!!
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <TextField
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="refer_email"
              label="Refer to Email Address"
              name="refer_email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Refer
            </Button>
          </form>
        </Container>
      </div>
    )
  }
}

export default withStyles(useStyles)(Profile)