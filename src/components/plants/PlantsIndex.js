import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Time from '../../lib/Time'

class PlantsIndex extends Component {
  constructor(){
    super()
    this.state = {}
  }

  componentDidMount(){
    //console.log('Props', this.props)
    axios.get(`/api/plants${this.props.location.search}`)
      .then(res => {
        console.log(res.data.data)
        this.setState({ plants: res.data.data })
      })
  }

  componentDidUpdate(oldProps){
    if(oldProps.location.search === this.props.location.search) return
    console.log('Search string changed')
    axios.get(`/api/plants${this.props.location.search}`)
      .then(res => {
        console.log(res.data.data)
        this.setState({ plants: res.data.data })
      })
  }

  render(){
    //console.log('State:',this.state)
    if(!this.state.plants) return null
    return (
      <Fragment>
        <section className="hero index-page is-primary is-medium">
          <div className="hero-body">
            <p className="title">Browse through our plants</p>
          </div>
        </section>
        <section className="main-content index-page">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-mobile is-multiline">


                {this.state.plants.map(plant => (
                  <div className="column is-full-mobile is-half-tablet is-third-desktop" key={plant._id}>
                    <div className="card">
                      <div className="card-content">
                        <div className="columns">
                          <div className="column">
                            <Link to={`plants/${plant._id}`}>
                              <img className="plant-pic" src={`../../assets/${plant.picture}`} />
                            </Link>
                          </div>
                          <div className="column">
                            <div className="media">
                              <div className="media-left">
                                <i className={`${plant.createdBy.avatar} fa-2x`}></i>
                              </div>
                              <div className="media-content">
                                <p className="title is-7">{plant.createdBy.username}</p>
                                <p className="subtitle is-7">{plant.createdBy.email}</p>
                              </div>
                            </div>
                            <p className="is-size-6">Listed: {Time.timeSince(plant.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                      <footer className="card-footer">
                        <div className="card-footer-item">
                          <div className="foot-wrapper">
                            <Link to={`plants/${plant._id}`}>
                              <div className="title is-6">{plant.name}</div>
                              <div className="subtitle is-6 message-text">{plant.advice}</div>
                            </Link>
                          </div>
                        </div>
                      </footer>
                    </div>
                  </div>
                ))}


              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}

export default PlantsIndex
