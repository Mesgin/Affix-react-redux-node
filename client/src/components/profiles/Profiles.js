import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profileActions'
import Spinner from '../common/Spinner'

class Profiles extends Component {
  componentDidMount(){
    this.props.getProfiles()
  }
  render() {
    const { profiles, loading } = this.props.profile
    let profileItems

    if(profiles===null || loading){
      profileItems = <Spinner />
    } else {
      if(profiles.length > 0){
        profileItems = <h1>Profiles</h1>
      } else {
        profileItems = <p>There is no profile</p>
      }
    }
    return (
      <div>
        {profileItems}
      </div>
    )
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
}) 

export default connect(mapStateToProps, { getProfiles})(Profiles)