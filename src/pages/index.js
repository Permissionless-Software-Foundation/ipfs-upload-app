import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
// import Banner from '../components/Banner'
import { UploadForm } from '../components/uppy/upload-form'
class Upload extends React.Component {
    render() {

        return (
            <Layout>
                <Helmet
                    title="IPFS File Hosting for BCH | FullStack.cash"
                    meta={[
                        { name: 'description', content: 'Pay BCH to have your files host on IPFS' },
                        { name: 'keywords', content: 'ipfs, bch, bitcoin, bitcoin cash, file, hosting, upload' },
                    ]}
                >
                </Helmet>

                {/* <Banner /> */}
                <UploadForm />

                <div className="grid-wrapper">
                  <div className="col-2"></div>
                  <div className="col-8">
                    <h2><u>About</u></h2>
                    <p>
                      This simple web app allows you to easily upload files to be
                      hosted on
                      the <a href="https://ipfs.io" target="_blank" rel="noreferrer">IPFS network</a>.
                      The cost is $0.01 USD per 10 Megabytes, with a minimum cost
                      of $0.01. This kind of low-cost, permissionless payment service
                      is only possible with Bitcoin Cash.
                    </p>
                    <p>
                      This web app is open source, and uses an MIT license.
                      You can copy it and run your
                      own hosting service. There is a front-end and a back-end:

                      <ul>
                        <li>
                          <a href="https://github.com/Permissionless-Software-Foundation/ipfs-upload-app" target="_blank" rel="noreferrer">
                            Front End App</a>
                        </li>
                        <li>
                          <a href="https://github.com/Permissionless-Software-Foundation/ipfs-upload-server" target="_blank" rel="noreferrer">
                            Back End App</a>
                        </li>
                      </ul>
                    </p>

                  </div>
                  <div className="col-2"></div>
                </div>
            </Layout>
        )
    }
}

export default Upload
