import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  render(){
    return (
      <section className="hero homepage is-primary is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <Link to="/plants">
              <p className="title is-1">PlantSwap</p>
              <p className="subtitle">take me to the plants</p>
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

export default Home
