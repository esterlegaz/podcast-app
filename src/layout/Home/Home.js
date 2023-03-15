import React, { useState, useEffect } from 'react'
import './Home.scss'
import Layout from '../../components/Layout/Layout'
import PodcastCard from '../../components/PodcastCard/PodcastCard'
import SearchInput from '../../components/SearchInput/SearchInput'
import { getAllPodcasts } from '../../services/PodcastService'

const Home = () => {
  const [podcasts, setPodcasts] = useState([])
  const [filteredPodcasts, setFilteredPodcasts] = useState([])

  useEffect(() => {
    const infoNeedsToBeFetched = checkDaysDifference()
    if (infoNeedsToBeFetched) {
      getAllPodcasts().then((data) => {
        setPodcasts(data)
        setFilteredPodcasts(data)
      })
    } else {
      const localPodcastsInfo = JSON.parse(localStorage.getItem('podcasts'))
      setPodcasts(localPodcastsInfo)
      setFilteredPodcasts(localPodcastsInfo)
    }
  }, [])

  const checkDaysDifference = () => {
    const today = new Date()
    const lastTimeUpdated = localStorage.getItem('podcasts_lastUpdated')

    const diffTime = Math.abs(new Date(lastTimeUpdated) - today)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const isUpdateNeeded = diffDays > 1 ? true : false
    return isUpdateNeeded
  }

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

export default Home
