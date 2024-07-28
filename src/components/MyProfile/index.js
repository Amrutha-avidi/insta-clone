import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import ProfilePage from '../ProfilePage'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const MyProfile = () => {
  const [profileData, setProfileData] = useState(null)
  const [apiStatusForProfile, setApiStatusForProfile] = useState(
    apiStatusConstant.initial,
  )
  useEffect(() => {
    setApiStatusForProfile(apiStatusConstant.inProgress)

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
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
        const updatedData = {
          profile: {
            id: data.profile.id,
            userId: data.profile.user_id,
            userName: data.profile.user_name,
            profilePic: data.profile.profile_pic,
            followersCount: data.profile.followers_count,
            followingCount: data.profile.following_count,
            userBio: data.profile.user_bio,
            postsCount: data.profile.posts_count,
            posts: data.profile.posts.map(each => ({
              id: each.id,
              image: each.image,
            })),
            stories: data.profile.stories.map(each => ({
              id: each.id,
              image: each.image,
            })),
          },
        }

        setProfileData(updatedData)
        setApiStatusForProfile(apiStatusConstant.success)
      } else {
        setApiStatusForProfile(apiStatusConstant.failure)
      }
    }
    fetchData()
  }, [])
  const getProfileView = () => <ProfilePage data={profileData} />

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

  const renderApiStatusViewForProfile = () => {
    switch (apiStatusForProfile) {
      case apiStatusConstant.success:
        return getProfileView()
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
      <NavBar />
      <div>{renderApiStatusViewForProfile()}</div>
    </div>
  )
}

export default MyProfile
