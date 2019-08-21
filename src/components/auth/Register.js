// paw
// otter
// hippo
// dog
// spider
// kiwi-bird
// horse-head
// horse
// frog
// fish
// feather-alt
// feather
// dragon
// dove
// crow
// cat



import React, { Component } from 'react'
import axios from 'axios'

class Register extends Component {
  constructor(){
    super()
    this.state = { data: null }
    this.submitForm = this.submitForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  submitForm(e){
    e.preventDefault()
    //post registration
    axios.post('/api/register', this.state.data)
      .then(() => {
        this.props.history.push('/login')
      })
      .catch(err => console.log(err.response) )
  }

  handleChange(e){
    //set state and add to the data object
    this.setState({data: {...this.state.data, [e.target.name]: e.target.value }})
  }

  render(){
    //console.log(this.state.data)
    return (
      <section className="section">

        <form onSubmit={this.submitForm}>

          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="username"
                onChange={this.handleChange}
                placeholder="Choose a username" />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                name="email"
                onChange={this.handleChange}
                placeholder="e.g. alexsmith@gmail.com"
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
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="passwordConfirmation"
                onChange={this.handleChange}
                placeholder="Confirm your password"
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

export default Register
