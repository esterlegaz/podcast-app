import { Link } from 'react-router-dom'

import './podcastCard.scss'

const PodcastCard = ({ id, title, author, image }) => {
  return (
    <Link style={{ textDecoration: 'none' }} to={`podcast/${id}`}>
      <div className="podcast__card">
        <img
          className="podcast__card--image"
          src={image}
          alt={`${title} logo`}
        />
        <p className="podcast__card--title">{title.toUpperCase()}</p>
        <p className="podcast__card--author">Author: {author} </p>
      </div>
    </Link>
  )
}

export default PodcastCard
