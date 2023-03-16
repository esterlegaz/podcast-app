import React from 'react'
import { Link } from 'react-router-dom'

import './podcastDetail.scss'

const PodcastSummary = ({ podcastId, title, author, image, episodes }) => {
  return (
    <div className="detail__container">
      <div className="detail__podcast">
        <Link to={`/podcast/${podcastId}`}>
          <div className="detail__image">
            <img src={image} alt={`${title} logo`} />
          </div>

          <p className="detail__podcast--title">{title}</p>
        </Link>
        <p className="detail__podcast--description">
          by: <i> {author}</i>
        </p>

        <p className="detail__podcast--title">Description:</p>
        <p
          className="detail__podcast--description"
          dangerouslySetInnerHTML={{
            __html: episodes?.description
              .replace('<![CDATA[', '')
              .replace(']]>', ''),
          }}
        />
      </div>
    </div>
  )
}

export default PodcastSummary
