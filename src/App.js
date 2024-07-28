import {Route, Switch, Redirect} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'

import Home from './components/Home'
import Login from './components/Login'
import MyProfile from './components/MyProfile'
import NotFound from './components/NotFound'
import UserProfile from './components/UserProfile'
import SearchContext from './Context/SearchContext'

import './App.css'

const dataFetchStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const App = () => {
  const [searchText, setSearchText] = useState('')

  const [showSearchComponent, setShowSearchComponent] = useState(false)
  const [searchDataFetchStatus, setSearchDataFetchStatus] = useState(
    dataFetchStatusConstants.initial,
  )
  const [userPosts, setUserPosts] = useState([])

  const updateSearchText = inputValue => {
    setSearchText(inputValue)
  }
  const getSearchedResults = () => {
    setSearchDataFetchStatus(dataFetchStatusConstants.loading)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchData = async () => {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData = data.posts.map(each => ({
          postId: each.post_id,
          userId: each.user_id,
          likeStatus: false,
          userName: each.user_name,
          profilePic: each.profile_pic,
          postDetails: {
            imageUrl: each.post_details.image_url,
            caption: each.post_details.caption,
          },
          likesCount: each.likes_count,
          comments: each.comments.map(eachItem => ({
            userName: eachItem.user_name,
            userId: eachItem.user_id,
            comment: eachItem.comment,
          })),
          createdAt: each.created_at,
        }))

        setUserPosts(updatedData)
        setSearchDataFetchStatus(dataFetchStatusConstants.success)
      } else {
        setSearchDataFetchStatus(dataFetchStatusConstants.failure)
      }
    }
    fetchData()
  }

  const changeStatusOfSearchComponent = () => {
    setShowSearchComponent(true)
    getSearchedResults()
  }

  //   console.log(userPosts)
  //   console.log(searchDataFetchStatus)

  return (
    <SearchContext.Provider
      value={{
        searchText,
        updateSearchText,
        showSearchComponent,
        changeStatusOfSearchComponent,
        searchDataFetchStatus,
        userPosts,
      }}
    >
      <Switch>
        <Route exact to path="/login" component={Login} />

        <Route exact path="/" component={Home} />
        <Route exact path="/my-profile" component={MyProfile} />
        <Route path="/users/:userId" component={UserProfile} />
        <Route component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
      )
    </SearchContext.Provider>
  )
}

export default App
