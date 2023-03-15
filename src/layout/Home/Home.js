import React, { useState, useEffect } from 'react'
import './Home.scss'
import Layout from '../../components/Layout/Layout'
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
            <p>{podcast['im:name'].label}</p>
            <p>Author: {podcast['im:artist'].label} </p>
            <img
              src={podcast['im:image'][0].label}
              alt={`${podcast['im:name'].label} logo`}
            />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default App
