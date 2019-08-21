import React, { Fragment, Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'


class Navigation extends Component{
  constructor(){
    super()
    this.state = {}
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.logoutScript = this.logoutScript.bind(this)
  }

  toggleNavbar(){
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  //be careful with this - if we set state from this, it can end up in a loop
  componentDidUpdate(){
    //console.log('nav updated')
  }

  logoutScript(){
    Auth.logOut()
    this.props.history.push('/')
  }

  render(){
    //console.log('props',this.props.history)
    return (
      <Fragment>
        <nav className="navbar is-light">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">PlantSwap</Link>
            <Link to="/plants" className="navbar-item">Available swaps</Link>
            <Link to="/plants/new" className="navbar-item">Swap a plant</Link>
            <div className="navbar-item">
              <div className="buttons">
                {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item button is-dark">Log in</Link>}
                {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item button is-warning">Sign up</Link>}
                {Auth.isAuthenticated() && <a onClick={()=>this.logoutScript()} className="navbar-item button is-dark">Log out</a>}
              </div>
            </div>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">

            </div>

            <div className="navbar-end">
            </div>
          </div>
        </nav>
      </Fragment>
    )
  }
}

export default withRouter(Navigation)
