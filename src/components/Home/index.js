import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import NavBar from '../NavBar'
import Stories from '../Stories'
import Posts from '../Posts'
import SearchContext from '../../Context/SearchContext'
import SearchComponent from '../SearchComponent'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <NavBar />
      <SearchContext.Consumer>
        {value => {
          const {showSearchComponent} = value

          return (
            <>
              {showSearchComponent ? (
                <>
                  <SearchComponent />
                </>
              ) : (
                <>
                  <Stories />
                  <Posts />
                </>
              )}
            </>
          )
        }}
      </SearchContext.Consumer>
    </div>
  )
}

export default Home
