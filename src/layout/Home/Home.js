import React, { useState, useEffect } from 'react'
import './Home.scss'
import Layout from '../../components/Layout/Layout'
import PodcastCard from '../../components/PodcastCard/PodcastCard'
import SearchInput from '../../components/SearchInput/SearchInput'
import { getAllPodcasts } from '../../services/PodcastService'
import { checkDaysDifference } from '../../utils/utils'

const Home = () => {
  const [podcasts, setPodcasts] = useState([])
  const [filteredPodcasts, setFilteredPodcasts] = useState([])

  useEffect(() => {
    const lastTimeUpdated = localStorage.getItem('podcasts_lastUpdated')

    const infoNeedsToBeFetched = checkDaysDifference(
      lastTimeUpdated ? lastTimeUpdated : new Date('1/1/2023')
    )
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
        <p>{filteredPodcasts.length}</p>
        <SearchInput handleChange={onHandleChange} />
      </div>
      <div className="podcasts__container">
        {filteredPodcasts.map((podcast) => (
          <div key={podcast.id.attributes['im:id']}>
            <PodcastCard
              id={podcast.id.attributes['im:id']}
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
