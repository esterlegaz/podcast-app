const BASE_URL = 'https://itunes.apple.com'

export const getAllPodcasts = async () => {
  const url = `${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`
  const res = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const today = new Date()
      localStorage.setItem('podcasts_lastUpdated', today)
      localStorage.setItem('podcasts', JSON.stringify(data.feed.entry))
      return data.feed.entry
    })
  return res
}

export const getPodcastById = async (podcastId) => {
  const url = `${BASE_URL}/lookup?id=${podcastId}`
  const allowOriginsUrl = `https://api.allorigins.win/get?charset=ISO-8859-1&url=${url}`

  const res = await fetch(allowOriginsUrl)
    .then((response) => response.json())
    .then((data) => {
      const enrichedData = {
        ...JSON.parse(data.contents),
        lastUpdated: new Date(),
      }
      localStorage.setItem(`podcast_${podcastId}`, JSON.stringify(enrichedData))
      return enrichedData
    })
  return res
}
