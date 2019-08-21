import React, { Component, Fragment } from 'react'
import Time from '../../lib/Time'
import Auth from '../../lib/Auth'

const Comment = ({commentData, onLikeClick, onDeleteClick, currentUser})=> (
  <article className="media">
    <figure className="media-left">
      <span className="icon is-large"><i className={`${commentData.createdBy.avatar} fa-3x`}></i></span>
    </figure>
    <div className="media-content">
      <div className="content">
        <p>
          <strong>{commentData.createdBy.username} </strong>
          <small> {commentData.createdBy.email} </small>
          <br />
          {commentData.text}
        </p>
      </div>
      <nav className="level is-mobile">
        <div className="level-left">
          <span className="level-item">
            <span className="icon is-small"><i className="far fa-clock"></i></span>
            &nbsp;{Time.timeSince(commentData.createdAt)}
          </span>
          <span className="level-item">|</span>
          <span className="level-item">
            <span className="icon is-small"><i className="fas fa-heart"></i></span>
            &nbsp;{commentData.likeCount}
          </span>
          {Auth.isAuthenticated() &&
            <Fragment>
              <span className="level-item">|</span>
              <a className="level-item" onClick={()=>onLikeClick(commentData._id)}>Like</a>
            </Fragment>
          }
        </div>
      </nav>
    </div>
    <div className="media-right">
      {currentUser===commentData.createdBy._id &&
        <button onClick={()=>onDeleteClick(commentData._id)} className="delete"></button>}
    </div>
  </article>

)

export default Comment
