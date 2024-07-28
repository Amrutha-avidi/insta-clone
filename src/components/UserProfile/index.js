import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import ProfilePage from '../ProfilePage'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const UserProfile = props => {
  const [profileData, setProfileData] = useState(null)
  const [apiStatusForProfile, setApiStatusForProfile] = useState(
    apiStatusConstant.initial,
  )

  const {match} = props
  const {params} = match
  const {userId} = params

  useEffect(() => {
    setApiStatusForProfile(apiStatusConstant.inProgress)

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/users/${userId}`
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
            id: data.user_details.id,
            userId: data.user_details.user_id,
            userName: data.user_details.user_name,
            profilePic: data.user_details.profile_pic,
            followersCount: data.user_details.followers_count,
            followingCount: data.user_details.following_count,
            userBio: data.user_details.user_bio,
            postsCount: data.user_details.posts_count,
            posts: data.user_details.posts.map(each => ({
              id: each.id,
              image: each.image,
            })),
            stories: data.user_details.stories.map(each => ({
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
  }, [userId])

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

export default UserProfile
