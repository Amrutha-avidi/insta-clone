import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import PostItem from '../PostItem'

// import SearchContext from '../../Context/SearchContext'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Posts = () => {
  const [postsData, setPostsData] = useState(null)
  const [apiStatusForStories, setApiStatusForStories] = useState(
    apiStatusConstant.initial,
  )

  useEffect(() => {
    setApiStatusForStories(apiStatusConstant.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'
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

        setPostsData(updatedData)
        setApiStatusForStories(apiStatusConstant.success)
      } else {
        setApiStatusForStories(apiStatusConstant.failure)
      }
    }

    fetchData()
  }, [])

  const getStoriesView = () => (
    <div className="posts-con">
      {postsData.map(each => (
        <PostItem key={each.postId} postData={each} />
      ))}
    </div>
  )

  const getStoriesFailureView = () => (
    <div className="failed-con">
      <img
        src="https://res.cloudinary.com/drpddho9b/image/upload/v1718431783/alert-triangle_ugz8fv.png"
        alt="alert"
      />
      <p>Something is wrong. Please try again</p>
      <button type="button">Try again</button>
    </div>
  )

  const getLoadingView = () => (
    <div data-testid="loader" className="failed-con">
      <Loader type="TailSpin" color="#2396BE" height="50" width="50" />
    </div>
  )

  const renderApiStatusViewForStories = () => {
    switch (apiStatusForStories) {
      case apiStatusConstant.success:
        return getStoriesView()
      case apiStatusConstant.failure:
        return getStoriesFailureView()
      case apiStatusConstant.inProgress:
        return getLoadingView()
      default:
        return null
    }
  }

  return (
    <div>
      <div>{renderApiStatusViewForStories()}</div>
    </div>
  )
}

export default Posts
