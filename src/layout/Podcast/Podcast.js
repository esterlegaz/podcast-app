import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import PodcastDetail from '../../components/PodcastDetail/PodcastDetail'
import { getPodcastById } from '../../services/PodcastService'
import { startLoading, stopLoading } from '../../store/global/globalActions'
import { checkDaysDifference } from '../../utils/utils'

const Podcast = () => {
  const dispatch = useDispatch()
  const { podcastId } = useParams()

  const [podcastInfo, setPodcastInfo] = useState({})
  const [error, setError] = useState(false)

  useEffect(() => {
    const localPodcastInfo = JSON.parse(
      localStorage.getItem(`podcast_${podcastId}`)
    )

    const infoNeedsToBeFetched = checkDaysDifference(
      localPodcastInfo ? localPodcastInfo?.lastUpdated : new Date('1/1/2023')
    )

    if (infoNeedsToBeFetched) {
      dispatch(startLoading())
      // API is being called twice but it seems to be something related to React.StrictMode and it only happens in development mode: https://stackoverflow.com/questions/72406486/react-fetch-api-being-called-2-times-on-page-load
      getPodcastById(podcastId)
        .then((data) => {
          setPodcastInfo(data.podcastInfo)
        })
        .catch((err) => {
          setError(true)
        })
        .finally(() => {
          dispatch(stopLoading())
        })
    } else {
      const localPodcastInfo = JSON.parse(
        localStorage.getItem(`podcast_${podcastId}`)
      )

      setPodcastInfo(localPodcastInfo.podcastInfo)
    }
  }, [])
  return error ? (
    <p>
      There's been an error loading this podcast. Please, check console for more
      information.
    </p>
  ) : (
    <Layout>
      <PodcastDetail
        podcastId={podcastId}
        title={podcastInfo.collectionName}
        author={podcastInfo.artistName}
        image={podcastInfo.artworkUrl600}
        episodes={podcastInfo.episodes}
      />
    </Layout>
  )
}

export default Podcast
