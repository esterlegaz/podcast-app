import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './header.scss'

const Header = () => {
  const isLoading = useSelector((state) => state.global.isLoading)

  return (
    <header className="app__header">
      <Link to="/">
        <h1>Podcaster</h1>
      </Link>
      {isLoading && <img src={require('./../../assets/images/spinner.png')} />}
    </header>
  )
}

export default Header
