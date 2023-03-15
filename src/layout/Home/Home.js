import React, { useState, useEffect } from 'react'
import './Home.scss'
import Layout from '../../components/Layout/Layout'
import PodcastCard from '../../components/PodcastCard/PodcastCard'
import SearchInput from '../../components/SearchInput/SearchInput'
import { getAllPodcasts } from '../../services/PodcastService'

const App = () => {
  const [podcasts, setPodcasts] = useState([])
  const [filteredPodcasts, setFilteredPodcasts] = useState([])

  useEffect(() => {
    const podcasts = getAllPodcasts()
    setPodcasts(podcasts.feed.entry)
    setFilteredPodcasts(podcasts.feed.entry)
  }, [])

  const onHandleChange = (event) => {
    const filteredPodcasts = podcasts.filter(
      (podcast) =>
        podcast['im:name'].label
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        podcast['im:artist'].label
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    )
    console.log('filteredPodcast', filteredPodcasts)
    setFilteredPodcasts(filteredPodcasts)
  }

  return (
    <Layout>
      <div className="podcasts__search">
        <p>{podcasts.length}</p>
        <SearchInput handleChange={onHandleChange} />
      </div>
      <div className="podcasts__container">
        {filteredPodcasts.map((podcast) => (
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
