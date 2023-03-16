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
    .then(async (data) => {
      const parsedContent = JSON.parse(data.contents)
      const podcastFeed = await getPodcastFeed(
        parsedContent.results[0].feedUrl
      ).then((episodes) => {
        const enrichedData = {
          podcastInfo: parsedContent.results[0],
          lastUpdated: new Date(),
        }
        enrichedData.podcastInfo.episodes = episodes
        localStorage.setItem(
          `podcast_${podcastId}`,
          JSON.stringify(enrichedData)
        )
        return enrichedData
      })
      return podcastFeed
    })
  return res
}

const getPodcastFeed = async (feed) => {
  const allowOriginsUrl = `https://api.allorigins.win/get?charset=ISO-8859-1&url=${feed}`

  const res = await fetch(allowOriginsUrl)
    .then((response) => response.json())
    .then((str) =>
      new window.DOMParser().parseFromString(str.contents, 'text/xml')
    )
    .then((data) => {
      const formattedData = extractEpisodesData(data)
      return formattedData
    })
  return res
}

const extractEpisodesData = (episodes) => {
  const formattedEpisodes = {
    description: '',
    list: [],
  }
  const items = episodes.querySelectorAll('item')
  const description =
    episodes.getElementsByTagName('itunes:summary').length > 0
      ? episodes.getElementsByTagName('itunes:summary')
      : episodes.getElementsByTagName('description')
  formattedEpisodes.description = description[0].innerHTML

  items.forEach((element) => {
    const episode = {
      id:
        element.getElementsByTagName('omny:clipId')[0]?.innerHTML ||
        element.getElementsByTagName('guid')[0].innerHTML,
      title:
        element.getElementsByTagName('itunes:title')[0]?.innerHTML ||
        element.getElementsByTagName('title')[0].innerHTML,
      date: element.getElementsByTagName('pubDate')[0].innerHTML,
      duration: element.getElementsByTagName('itunes:duration')[0].innerHTML,
      description: element.getElementsByTagName('description')[0].innerHTML,
      audio: element.getElementsByTagName('enclosure')[0].getAttribute('url'),
    }

    formattedEpisodes.list.push(episode)
  })
  return formattedEpisodes
}
