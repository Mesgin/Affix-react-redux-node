import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'
import PropTypes from 'prop-types'

class Navbar extends Component {

  logoutClick(e) {
    e.preventDefault()
    this.props.clearCurrentProfile()
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth
    const authLinks = (    <React.Fragment>
      <li className="nav-item">
        <Link className="nav-link" to='/dashboard'>
          Dashboard
          </Link>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          href=''
          onClick={this.logoutClick.bind(this)}
        >
          <img
            className="rounded-circle"
            style={{ width: '25px', marginRight: '5px' }}
            src={user.avatar}
            alt={user.name}
            title="Connect Gravatar to your email to display your picture"
          />
          Logout
          </a>
      </li>
      </React.Fragment>
    )
    const guestLinks = (
      <React.Fragment>
        <li>
          <Link to='/register'>
            Sign Up
          </Link>
        </li>
        <li>
          <Link to='/login'>
            Login
          </Link>
        </li>
        </React.Fragment>
    )
    return (
      <header>
        <h1>aFFix</h1>
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <nav>
          <ul>
            <li>
              <Link to='/profiles'>
                {' '}
                Developers
              </Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </nav>
        <label for="nav-toggle" className="nav-toggle-label">
          <span></span>
        </label>
      </header>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar)
