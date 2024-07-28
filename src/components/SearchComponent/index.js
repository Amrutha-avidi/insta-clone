import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import SearchContext from '../../Context/SearchContext'
import PostItem from '../PostItem'

const dataFetchStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const SearchComponent = () => (
  <SearchContext.Consumer>
    {value => {
      const {
        userPosts,
        searchText,
        searchDataFetchStatus,
        updateSearchText,
        changeStatusOfSearchComponent,
      } = value

      const onChangeSearch = event => {
        updateSearchText(event.target.value)
      }

      const searchComponentStatusChange = () => {
        changeStatusOfSearchComponent()
      }

      switch (searchDataFetchStatus) {
        case dataFetchStatusConstants.initial:
          return (
            <div className="search-con">
              <input
                type="search"
                value={searchText}
                onChange={onChangeSearch}
              />
              <button type="button" onClick={searchComponentStatusChange}>
                {' '}
                <FaSearch testid="searchIcon" />
              </button>
            </div>
          )

        case dataFetchStatusConstants.loading:
          return (
            <div data-testid="loader" className="failed-con">
              <Loader type="TailSpin" color="#2396BE" height="50" width="50" />
            </div>
          )

        case dataFetchStatusConstants.success:
          return (
            <div className="posts-con">
              {userPosts.length === 0 ? (
                <div className="no-results-container">
                  <img
                    className="no-results-img"
                    src="https://res.cloudinary.com/dziwdneks/image/upload/v1675513323/SearchNotFound_ntqrqa.png"
                    alt="search not found"
                  />
                  <h1 className="no-results-heading">Search Not Found</h1>
                  <p className="no-results-para">
                    Try different keyword or search again
                  </p>
                </div>
              ) : (
                <div>
                  <h1 className="text-search-results">Search Results</h1>
                  {userPosts.map(each => (
                    <PostItem key={each.postId} postData={each} />
                  ))}
                </div>
              )}
            </div>
          )
        default:
          return null
      }
    }}
  </SearchContext.Consumer>
)

export default SearchComponent
