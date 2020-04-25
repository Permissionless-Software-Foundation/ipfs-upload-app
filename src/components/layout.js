/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'

import '../assets/scss/main.scss'
import '../assets/css/upload.css'

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isMenuVisible: false,
            loading: 'is-loading'
        }
        this.handleToggleMenu = this.handleToggleMenu.bind(this)
    }

    componentDidMount() {
        this.timeoutId = setTimeout(() => {
            this.setState({ loading: '' });
        }, 100);
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    handleToggleMenu() {
        this.setState({
            isMenuVisible: !this.state.isMenuVisible
        })
    }

    render() {
        const { children } = this.props

        return (
            <>
                <ReactNotification />
                <div className={`body ${this.state.loading} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                    <div id="wrapper">
                        <Header onToggleMenu={this.handleToggleMenu} />
                        {children}
                        <Footer />
                    </div>
                    <Menu onToggleMenu={this.handleToggleMenu} />
                </div>
            </>
        )
    }
}

export default Layout
