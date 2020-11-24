import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Index from './Home/Index'
import Navbar from './Home/Navbar'
import Login from './User/Login'
import Signup from './User/Signup'
import Profile from './User/Profile'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      currentUser: null
    }
  }

  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    axios.get(`/users/logged_in`)
          .then(response => {
            if (response.data.status) {
              this.handleLogin(response.data.user)
            } else {
              this.handleLogout()
            }
          })
          .catch(error => console.log(error))
  }

  handleLogin = (data) => {
    this.setState({
      loggedIn: true,
      currentUser: data
    })
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      currenUser: null
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar history={this.props.history} handleLogout={this.handleLogout} loggedIn={this.state.loggedIn}/>
          <Switch>
            <Route
              exact path='/'
              render={props => (
              <Index {...props} loggedIn={this.state.loggedIn}/>
              )}
            />
            <Route
              exact path='/login'
              render={props => (
              <Login {...props} loginStatus={this.loginStatus} loggedIn={this.state.loggedIn}/>
              )}
            />
            <Route
              exact path='/signup/:key?'
              render={props => (
              <Signup {...props} loginStatus={this.loginStatus} loggedIn={this.state.loggedIn}/>
              )}
            />
            <Route
              exact path='/profile'
              render={props => (
              <Profile {...props} currentUser={this.currenUser} loggedIn={this.state.loggedIn}/>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App
