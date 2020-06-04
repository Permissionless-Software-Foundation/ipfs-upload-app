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

            </Layout>
        )
    }
}

export default Upload
