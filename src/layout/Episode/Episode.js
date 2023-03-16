import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import EpisodeDetail from '../../components/EpisodeDetail/EpisodeDetail'
import Layout from '../../components/Layout/Layout'

const Episode = () => {
  const { podcastId, episodeId } = useParams()

  const [episodeInfo, setEpisodeInfo] = useState({})
  const [podcastInfo, setPodcastInfo] = useState({})

  useEffect(() => {
    const localPodcastInfo = JSON.parse(
      localStorage.getItem(`podcast_${podcastId}`)
    )
    const bla = localPodcastInfo.podcastInfo.episodes.list.find(
      (episode) => episode.id === episodeId
    )

    setEpisodeInfo(bla)
    setPodcastInfo(localPodcastInfo.podcastInfo)
  }, [])

  return (
    <Layout>
      <div className="detail__container">
        <EpisodeDetail
          podcastId={podcastId}
          title={podcastInfo.collectionName}
          author={podcastInfo.artistName}
          image={podcastInfo.artworkUrl600}
          episodes={podcastInfo.episodes}
          episodeInfo={episodeInfo}
        />
      </div>
    </Layout>
  )
}

export default Episode
