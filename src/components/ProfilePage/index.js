import {BsGrid3X3} from 'react-icons/bs'
import {FaCamera} from 'react-icons/fa'

import './index.css'

const ProfilePage = props => {
  const {data} = props

  const {profile} = data
  const {
    userBio,
    userName,
    followersCount,
    followingCount,
    postsCount,
    posts,
    stories,
    profilePic,
  } = profile

  return (
    <div className="profile-con">
      <div className="bio-con">
        <img className="profile-pic" src={profilePic} alt="my profile" />
        <div className="sub-bio">
          <h1>{userName}</h1>
          <div>
            <p>
              {postsCount} <span>posts</span>
            </p>
            <p>
              {followersCount} <span>followers</span>
            </p>
            <p>
              {followingCount} <span>following</span>
            </p>
          </div>
          <h3>{userName}</h3>
          <p
            style={{
              marginLeft: '0',
              marginTop: '7px',
              fontFamily: 'Roboto',
              fontSize: '18px',
              fontWeight: '400',
            }}
          >
            {userBio}
          </p>
        </div>
      </div>
      <div className="stories-con">
        {stories.map(each => (
          <div key={each.id}>
            <img className="story-image" src={each.image} alt="my story" />
          </div>
        ))}
      </div>
      <div className="line">
        <hr />
      </div>{' '}
      <div className="posts-main">
        <div className="posts-head-con">
          {' '}
          <BsGrid3X3 style={{fontSize: '25px'}} />
          <h1>Posts</h1>
        </div>
        <div className="posts-con">
          <div>
            {posts.length === 0 ? (
              <div className="posts-con">
                {posts.map(each => (
                  <div key={each.id}>
                    <img
                      className="post-image"
                      src={each.image}
                      alt="my post"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-posts-con">
                <div className="no-posts-icon">
                  <FaCamera style={{fontSize: '40px'}} />
                </div>
                <h1>No Posts Yet</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
