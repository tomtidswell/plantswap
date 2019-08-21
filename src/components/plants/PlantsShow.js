import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Comment from '../common/Comment'
import Auth from '../../lib/Auth'
import Time from '../../lib/Time'

class PlantsShow extends Component {
  constructor(){
    super()
    this.state = { data: {} }
    this.likeClicked = this.likeClicked.bind(this)
    this.deleteClicked = this.deleteClicked.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange({ target: { name, value }}){
    const data = {...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmitComment(text){
    const id = this.props.match.params.id
    const data = {...this.state.data, text: '' }
    axios.post(`/api/plants/${id}/comments`, text, Auth.buildAuthHeader() )
      .then(res => this.setState({ plant: res.data.data, data }))
      .catch(err => console.log(err.response))
  }

  componentDidMount(){
    //console.log(this.props.match.params.id)
    const id = this.props.match.params.id
    axios.get(`/api/plants/${id}`)
      .then(res => this.setState({ plant: res.data.data }))
  }

  likeClicked(commentId){
    //console.log('like the comment', commentId)
    const id = this.props.match.params.id
    axios.put(`/api/plants/${id}/comments/${commentId}/like`, null, Auth.buildAuthHeader() )
      .then(res => {
        //console.log(res.data.data)
        this.setState({ plant: res.data.data })
      })
      .catch(err => console.log(err))
  }

  deleteClicked(commentId){
    //console.log('like the comment', commentId)
    const id = this.props.match.params.id
    //console.log('token', { Authorization: Auth.getToken() })
    axios.delete(`/api/plants/${id}/comments/${commentId}`, Auth.buildAuthHeader())
      .then(res => {
        //console.log(res.data.data)
        this.setState({ plant: res.data.data })
      })
      .catch(err => console.log(err))
  }

  watchClicked(){
    const id = this.props.match.params.id
    console.log('watch the plant', id)
    axios.put(`/api/plants/${id}/watch`, null, Auth.buildAuthHeader())
      .then(res => {
        //console.log(res.data.data)
        this.setState({ plant: res.data.data })
      })
      .catch(err => console.log(err))
  }

  render(){
    if(!this.state.plant) return null
    console.log('State:',this.state)
    const plant = this.state.plant
    const user = Auth.getUser()
    const owner = user === plant.createdBy._id
    return (
      <section className="section plant-show">

        <section className="section">
          <nav className="level title-level">
            <div className="level-left">
              <div className="level-item">
                <p>
                  <span className="title">{plant.nickname}</span>
                  <br />
                  {owner && 'Your '}
                  {!owner && <strong>{plant.createdBy.username}&apos;s </strong>}
                  <span className="subtitle">{plant.name} ({plant.scientificName})</span>
                </p>
              </div>
            </div>

            <div className="level-right">
              <p className="level-item"><Link to="/plants"><strong>All swaps</strong></Link></p>
              <p className="level-item"><Link to={`/plants?name=${plant.name}`}>Other {plant.name}s</Link></p>
            </div>
          </nav>

          <nav className="level">
            <div className="level-left">
              <p className="level-item">Listed: {Time.timeSince(plant.createdAt)}</p>
            </div>
            <div className="level-right">
              {owner && Auth.isAuthenticated() && <Fragment>
                <p className="level-item"><a className="button is-success">Edit listing</a></p>
                <p className="level-item"><a className="button is-danger">Delete listing</a></p>
              </Fragment>}
              {!owner && Auth.isAuthenticated() &&
                <p className="level-item"><button className="button is-success" onClick={()=>this.watchClicked()}>Watch listing</button></p>
              }
            </div>
          </nav>

        </section>

        <section className="section">
          <div className="columns">
            <div className="column plant-advice-column">
              <p className="plant-advice">
                <strong>{plant.nickname}</strong>
                <br />
                {plant.advice}
              </p>
            </div>
            <div className="column plant-pic-column">
              <img className="plant-pic" src={`../../assets/${plant.picture}`} />
            </div>
          </div>
        </section>

        <section className="section">
          <nav className="level vital-statistics">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Users watching</p>
                <p className="subtitle tooltip">{plant.watching}
                  {plant.watchingUsers.some(userObj => userObj.user.username) &&
                    <span className="notification is-primary tooltiptext">
                      {plant.watchingUsers.map(userObj => userObj.user.username)}
                    </span>
                  }
                </p>


              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Water Frequency</p>
                <p className="subtitle">{plant.waterFrequency}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Ease of care</p>
                <p className="subtitle">{plant.easeOfCare}/5</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Favourite place</p>
                <p className="subtitle">{plant.location}</p>
              </div>
            </div>
          </nav>
        </section>

        <section className="section all-comments">
          {plant.comments.map((comment, index) =>
            <Comment key={index}
              commentData={comment}
              onLikeClick={this.likeClicked}
              onDeleteClick={this.deleteClicked}
              currentUser={user}/>
          )}


          {Auth.isAuthenticated() &&
            <article className="media">
              <figure className="media-left">
                <span className="icon is-large"><i className={`${Auth.getTokenPayload().avatar} fa-3x`}></i></span>
              </figure>
              <div className="media-content">
                <div className="field">
                  <p className="control">
                    <textarea
                      className="textarea comment-text"
                      placeholder="Add a comment..."
                      name="text"
                      onChange={this.handleChange}
                      value={this.state.data.text}>
                    </textarea>
                  </p>
                </div>
                <button
                  className="button is-info"
                  onClick={()=>this.handleSubmitComment(this.state.data)}>
                  Submit
                </button>
              </div>
            </article>
          }
        </section>


      </section>
    )
  }
}

export default PlantsShow
