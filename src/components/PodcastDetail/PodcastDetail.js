import React from 'react'
import { Link } from 'react-router-dom'

import './podcastDetail.scss'
import PodcastSummary from './PodcastSummary'

const PodcastDetail = ({ podcastId, title, author, image, episodes }) => {
  return episodes ? (
    <div className="detail__container">
      <PodcastSummary
        podcastId={podcastId}
        title={title}
        author={author}
        image={image}
        episodes={episodes}
      />
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
              <Link to={`./episode/${episode.id}`}>
                <span className="detail__episodes--title">
                  {episode.title.replace('<![CDATA[', '').replace(']]>', '')}
                </span>
              </Link>
              <p>{new Date(episode.date).toLocaleDateString('es')}</p>
              {/* Some of them have this info formatted and some of them do not
              <p>
                {new Date(episode?.duration * 1000)
                  .toISOString()
                  .slice(11, 19) || episode.duration}
              </p> */}
              <p>{episode.duration}</p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p>Page is loading...</p>
  )
}

export default PodcastDetail
