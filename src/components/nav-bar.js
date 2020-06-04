import React from 'react'
import PropTypes from 'prop-types'

import './nav-bar.css'
import Logo from '../assets/images/fullstackcash-Grey.png'
class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  render() {
    return (
      <header id="nav" className="alt reveal">
        <nav>
          <a href="/" aria-label="FS logo"><img
            alt="fullstack.cash-logo"
            src={Logo}
            className="fullstack-logo" /></a>
            
          <a
            className="menu-link"
            onClick={this.props.onToggleMenu}
            href="#!"
          >
          </a>
        </nav>
      </header>
    )
  }
}
Header.propTypes = {
  onToggleMenu: PropTypes.func,
}
export default Header
