import React from 'react'

class Footer extends React.Component {
  render() {
    return (
      <section id="footer">
        <ul className="icons">
          <li>
            <a href="https://t.me/permissionless_software" className="icon alt fab fa-telegram">
              <span className="label">Telegram</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Permissionless-Software-Foundation"
              target="_blank" rel="noreferrer"
              className="icon alt fab fa-github"
            >
              <span className="label">GitHub</span>
            </a>
          </li>
          <li>
            <a href="http://fullstack.cash/contact" className="icon alt fas fa-envelope">
              <span className="label">Email</span>
            </a>
          </li>
        </ul>
        <ul className="copyright">
          <li>MIT licensed <a href="https://github.com/Permissionless-Software-Foundation/jwt-bch-frontend" target="_blank" rel="noreferrer">source code</a></li>
          <li>
            An inititive of
            the <a href="https://psfoundation.cash/" target="_blank" rel="noreferrer">Permissionless Software Foundation</a>.
          </li>
        </ul>
      </section>
    )
  }
}

export default Footer

