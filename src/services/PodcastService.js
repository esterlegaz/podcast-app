export const getAllPodcasts = async () => {
  const url =
    'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
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
