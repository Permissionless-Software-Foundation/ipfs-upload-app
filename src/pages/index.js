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
                    title="Gatsby Starter - Forty"
                    meta={[
                        { name: 'description', content: 'Sample' },
                        { name: 'keywords', content: 'sample, something' },
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