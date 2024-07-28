import {Link} from 'react-router-dom'

const NotFound = () => (
  <div>
    <img
      src="https://res.cloudinary.com/drpddho9b/image/upload/v1718293585/erroring_1_ztbyog.png"
      alt="not-found"
    />
    <h3>Page Not Found</h3>
    <p>
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <button type="button">
      <Link to="/">Home</Link>
    </button>
  </div>
)

export default NotFound
