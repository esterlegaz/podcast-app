import React from 'react'
import { Link } from 'react-router-dom'

import './podcastDetail.scss'

const PodcastDetail = ({ podcastId, title, author, image, episodes }) => {
  console.log(episodes)
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
  )
}

export default PodcastDetail
