import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Stories = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  }
  const settingsSmall = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  }

  const [storyData, setStoryData] = useState(null)
  const [apiStatusForStories, setApiStatusForStories] = useState(
    apiStatusConstant.initial,
  )

  useEffect(() => {
    setApiStatusForStories(apiStatusConstant.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
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
        setStoryData(data.users_stories)
        setApiStatusForStories(apiStatusConstant.success)
      } else {
        setApiStatusForStories(apiStatusConstant.failure)
      }
    }

    fetchData()
  }, [])

  const getStoriesView = () => (
    <div>
      <div className="story-con-large">
        <Slider {...settings}>
          {storyData?.map(each => (
            <li key={each.user_name} className="story-item">
              <img
                src={each.story_url}
                alt="user story"
                className="story-img"
              />
              <p>{each.user_name.substring(0, 10)}</p>
            </li>
          ))}
        </Slider>
      </div>
      <div className="story-con-small">
        <Slider {...settingsSmall}>
          {storyData?.map(each => (
            <li key={each.user_name} className="story-item">
              <img
                src={each.story_url}
                alt="user story"
                className="story-img"
              />
              <p>{each.user_name.substring(0, 10)}</p>
            </li>
          ))}
        </Slider>
      </div>
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
    <div className="main-con">
      <ul className="render-con">{renderApiStatusViewForStories()}</ul>
    </div>
  )
}

export default Stories
