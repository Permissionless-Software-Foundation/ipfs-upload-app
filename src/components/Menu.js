/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
//import { Link, navigate } from 'gatsby'

const Menu = props => (
  <nav id="menu">
    <div className="inner">
      <ul className="links">
        <li>
          <a href="http://fullstack.cash/">Home</a>
        </li>

        <li>
          <a href="http://fullstack.cash/pricing">Pricing</a>
        </li>

        <li>
          <a href="http://fullstack.cash/examples">Examples</a>
        </li>

        <li>
          <a href="http://fullstack.cash/documentation">Documentation</a>
        </li>

        <li>
          <a href="http://fullstack.cash/cashstrap">CashStrap</a>
        </li>
        <li>
          <a href="http://fullstack.cash/contact">Contact</a>
        </li>
        <li>
          <a href="http://fullstack.cash/free-access">Free Access</a>
        </li>
      </ul>
    </div>

    <a className="close" onClick={props.onToggleMenu} href="#!">
      Close
    </a>
  </nav>
)

Menu.propTypes = {
  onToggleMenu: PropTypes.func,
}

export default Menu
