import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import 'bulma'

import './style.scss'

import Home from './components/common/Home'
import PlantsIndex from './components/plants/PlantsIndex'
import PlantsShow from './components/plants/PlantsShow'
import Navigation from './components/common/Navigation'
// import Wines from './components/wines/Wines'
// import Wine from './components/wines/Wine'
// import WineEdit from './components/wines/WineEdit'
// import WineNew from './components/wines/WineNew'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import Auth from './lib/Auth'

class App extends Component {
  render() {
    console.log('Authenticated', Auth.isAuthenticated())
    console.log('User', Auth.getUser())
    return (
      <Fragment>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route exact path="/plants/:id" component={PlantsShow} />
            <Route exact path="/" component={Home} />
            <Route exact path="/plants" component={PlantsIndex} />
          </Switch>
        </BrowserRouter>
      </Fragment>
    )
  }
}


// <Route path="/wines/:id/edit" component={WineEdit} />
// <Route path="/wines/new" component={WineNew} />
// <Route path="/wines/:id" component={Wine} />
// <Route exact path="/wines" component={Wines} />

ReactDOM.render(<App />,document.getElementById('root'))
