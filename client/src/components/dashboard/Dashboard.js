import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentProfile } from '../../actions/profileActions'

class Dashboard extends Component {
  componentDidMount(){
    this.props.getCurrentProfile()
  }
  render() {
    return (
      <div>
        <h1>Dashboard </h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  loading: state.loading
})

export default connect(mapStateToProps,{ getCurrentProfile })(Dashboard)
