import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import {useHistory, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import SearchContext from '../../Context/SearchContext'

import './index.css'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    console.log('haha')
    setIsOpen(!isOpen)
  }
  const history = useHistory()

  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <SearchContext.Consumer>
      {value => {
        const {
          searchText,
          updateSearchText,
          changeStatusOfSearchComponent,
        } = value

        const onChangeSearch = event => {
          updateSearchText(event.target.value)
        }

        const searchComponentStatusChange = () => {
          changeStatusOfSearchComponent()
        }

        return (
          <div className="navbar-con">
            <div>
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/drpddho9b/image/upload/v1718256221/logo_z0fn9m.png"
                  alt="website logo"
                />
              </Link>
              <h3>Insta Share</h3>
            </div>
            <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
              <div className="search-con">
                <input
                  type="search"
                  value={searchText}
                  onChange={onChangeSearch}
                  placeholder="Search Caption"
                />
                <button type="button" onClick={searchComponentStatusChange}>
                  {' '}
                  <FaSearch testid="searchIcon" />
                </button>
              </div>
              <Link
                to="/"
                style={{
                  textDecoration: 'None',
                  fontSize: '17px',
                  fontWeight: '600',
                }}
              >
                Home
              </Link>
              <Link
                to="/my-profile"
                style={{
                  textDecoration: 'None',
                  fontSize: '17px',
                  fontWeight: '600',
                }}
              >
                Profile
              </Link>
              <button type="submit" className="logout" onClick={logout}>
                {' '}
                Logout
              </button>
            </div>
            <div className="burger-con">
              <GiHamburgerMenu className="burger-icon" onClick={toggleMenu} />
            </div>
          </div>
        )
      }}
    </SearchContext.Consumer>
  )
}
export default NavBar
