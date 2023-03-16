import React from 'react'
import { Link } from 'react-router-dom'

import './podcastDetail.scss'

const PodcastDetail = ({ title, author, image, episodes }) => {
  console.log(episodes)
  return (
    <div className="detail__container">
      <div className="detail__podcast">
        <img src={image} alt={`${title} logo`} />
        <p>Title: {title}</p>
        <p>By: {author}</p>

        <p>Description: {episodes?.description}</p>
      </div>
      <div className="detail__episodes">
        <p className="detail__episodes--number">
          Episodes: {episodes?.list.length}
        </p>

        <div className="detail__episodes--list">
          <h3>Title</h3>
          <h3>Date</h3>
          <h3>Duration</h3>
          {episodes?.list.map((episode, index) => (
            <React.Fragment key={index}>
              <Link to={`./episode/${episode.id}`}>{episode.title}</Link>
              <p>{new Date(episode.date).toLocaleDateString('es')}</p>
              <p>
                {new Date(episode.duration * 1000).toISOString().slice(11, 19)}
              </p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PodcastDetail
