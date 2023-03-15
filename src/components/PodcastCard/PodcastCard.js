import './podcastCard.scss'

const PodcastCard = ({ title, author, image }) => {
  return (
    <div className="podcast__card">
      <img className="podcast__card--image" src={image} alt={`${title} logo`} />
      <p className="podcast__card--title">{title.toUpperCase()}</p>
      <p className="podcast__card--author">Author: {author} </p>
    </div>
  )
}

export default PodcastCard
