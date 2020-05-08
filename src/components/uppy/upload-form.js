import QrCode from './qr.js'

import CircularProgress from '@material-ui/core/CircularProgress';

            bchAddr: '',
            hostingCostUSD:'',
            hostingCostBCH:'',
            hostingCostSAT:'',
            section: 'uppy' // uppy or qr
                {_this.state.section === 'uppy' ?
                    <div className="grid-wrapper uppy-container">

                        <div className="col-6 uppy-dashboard">
                            <Dashboard
                                uppy={uppy}
                                {..._this.props}>

                            </Dashboard>
                            <div className="col-6 uppy-progress">
                            {!_this.state.loaded && <CircularProgress />}
                            </div>
                            <div className="col-6 uppy-buttons">
                                <button
                                    onClick={_this.resetValues}>
                                    Reset
                                 </button>
                                <button
                                    onClick={_this.submitData}>
                                    Submit
                                 </button>
                            </div>
                    :
                    <QrCode
                        bchAddr={_this.state.bchAddr}
                        hostingCostUSD={_this.state.hostingCostUSD}
                        hostingCostBCH ={_this.state.hostingCostBCH}
                        changeSection={_this.changeSection}
                    />
                }
    changeSection(sec) {
        _this.setState({
            section: sec ? sec : 'uppy'
        })
    }
            size: _this.state.fileSize ? _this.state.fileSize : ''
            _this.setState({
                loaded: false
            })
            _this.setState({
                bchAddr: resultFile.file.bchAddr,
                hostingCostUSD: resultFile.hostingCostUSD,
                hostingCostBCH: resultFile.hostingCostBCH,
                hostingCostSAT: resultFile.hostingCostSAT

            })


            
            _this.setState({
                loaded: true
            })

            // Go to display QR Code
            _this.changeSection('qr')
            _this.setState({
                loaded: true
            })