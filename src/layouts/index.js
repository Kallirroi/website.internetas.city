import React from 'react'
import Link from 'gatsby-link'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header
    if (location.pathname === '/') {
      header = (
        <div className="pageTitle">
          <Link to={'/'} >
            INTERNET AS A CITY
          </Link>
        </div>
      )
    } else {
      header = (
        <div className="pageTitle">
          <Link to={'/'}>
            INTERNET AS A CITY
          </Link>
        </div>
      )
    }
    return (
      <div>
        {header}
        {children()}
      </div>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
