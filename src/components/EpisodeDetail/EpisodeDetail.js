import React, { useState, useEffect } from 'react'

import PodcastSummary from '../PodcastDetail/PodcastSummary'
import './episodeDetail.scss'

const EpisodeDetail = ({
  podcastId,
  title,
  author,
  image,
  episodes,
  episodeInfo,
}) => {
  return (
    <React.Fragment>
      <PodcastSummary
        podcastId={podcastId}
        title={title}
        author={author}
        image={image}
        episodes={episodes}
      />
      <div className="episode__container">
        <h3 className="episode__title">
          {episodeInfo?.title?.replace('<![CDATA[', '').replace(']]>', '')}
        </h3>
        {episodeInfo.description && (
          <p
            dangerouslySetInnerHTML={{
              __html: episodeInfo?.description
                .replace('<![CDATA[', '')
                .replace(']]>', ''),
            }}
          />
        )}
        <audio className="episode__player" controls>
          <source src={episodeInfo.audio} />
          Your browser does not support the audio tag.
        </audio>
      </div>
    </React.Fragment>
  )
}

export default EpisodeDetail
