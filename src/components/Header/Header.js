import { Link } from 'react-router-dom'

import './header.scss'

const Header = () => {
  return (
    <header className="app__header">
      <Link to="/">
        <h1>Podcaster</h1>
      </Link>
    </header>
  )
}

export default Header
