import React, { useState, useEffect } from 'react'
import './Home.scss'
import Layout from '../../components/Layout/Layout'
import PodcastCard from '../../components/PodcastCard/PodcastCard'
import { getAllPodcasts } from '../../services/PodcastService'

const App = () => {
  const [podcasts, setPodcasts] = useState([])

  useEffect(() => {
    const podcasts = getAllPodcasts()
    console.log(podcasts.feed.entry)
    setPodcasts(podcasts.feed.entry)
  }, [])

  return (
    <Layout>
      <div className="podcasts__container">
        {podcasts.map((podcast) => (
          <div key={podcast.id.attributes['im:id']}>
            <PodcastCard
              title={podcast['im:name'].label}
              author={podcast['im:artist'].label}
              image={podcast['im:image'][0].label}
            />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default App
