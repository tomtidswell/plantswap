import React, { Component } from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

class Login extends Component {
  constructor(){
    super()
    this.state = { data: null }
    this.submitForm = this.submitForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  submitForm(e){
    e.preventDefault()
    //post registration
    console.log('Sending:', this.state.data)
    axios.post('/api/login', this.state.data)
      .then(res => {
        console.log('got back:',res.data.data, this.state.data.email)
        Auth.setToken(res.data.data)
        this.props.history.push('/plants')
      })
      .catch(err => console.log(err.response) )
  }

  handleChange(e){
    //set state and add to the data object
    this.setState({data: {...this.state.data, [e.target.name]: e.target.value }})
  }

  render(){
    console.log('Login props',this.props)
    return (
      <section className="section">

        <form onSubmit={this.submitForm}>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                name="email"
                onChange={this.handleChange}
                placeholder="e.g. alexsmith@email.com"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password"
                onChange={this.handleChange}
                placeholder="Choose a password"
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>

        </form>

      </section>
    )
  }

}

export default Login
