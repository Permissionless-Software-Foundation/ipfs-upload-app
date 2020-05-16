/* eslint-disable */
import React, { Component } from "react"
import PropTypes from "prop-types"
import CircularProgress from '@material-ui/core/CircularProgress'
import { getFileById } from '../../services/files'

var QRCode = require('qrcode.react')
const cloudUrl = 'https://gateway.temporal.cloud/ipfs/'

let _this

class QrCode extends React.Component {
    constructor(props) {
        super(props)
        _this = this
        this.Notification = Notification

        this.state = {
            msgStatus: 'Checking for payment...',
            hash: '',
            startedLoop: false,
            cloudLink: ''
        }
    }

    render() {

        return (
            <>

                <div className="grid-wrapper qr-container">

                    <div className="col-12">

                        <div className="col-12 host-container">
                            <h4>Hosting Cost: </h4>
                            <h5>{_this.props.hostingCostBCH} <b>BCH</b> </h5>
                            <h5>{_this.props.hostingCostUSD} <b>USD</b></h5>
                        </div>

                    </div>

                    <div className="col-12">
                        {
                            _this.props.bchAddr &&
                            <QRCode value={_this.props.bchAddr} size={256} includeMargin={true} fgColor={"#333"} />
                        }
                    </div>

                    <div className="col-12 addr-container">
                        {/* Display BCH Address*/}
                        <p> <b>{_this.props.bchAddr}</b></p>

                    </div>

                    {
                        _this.state.startedLoop &&
                        <div className="status-container col-12">
                            {/* Show progress or check icon*/}
                            {!_this.state.hash ?
                                <CircularProgress /> :
                                <div className="far fa-check-circle"></div>

                            }
                            {/* Show status message*/}

                            <p className="status-msg">{_this.state.msgStatus}</p>

                            {/* Show link to cloud page*/}
                            {_this.state.cloudLink &&
                                <div>
                                    <span>File can be downloaded from: </span>
                                    <br />
                                    <p
                                        className="cloud-link"
                                        onClick={_this.goToCloud}>

                                        {_this.state.cloudLink}
                                    </p>
                                </div>
                            }

                        </div>
                    }

                    <div className="col-12 ">
                        <button
                            className="btn-back"
                            onClick={_this.back}>
                            Back
                           </button>
                    </div>
                </div>

            </>
        )

    }

    goToCloud() {
        window.open(`${cloudUrl}/${_this.state.hash}`, '_blank')
    }
    back() {
        _this.props.changeSection('uppy')
        _this.props.resetValues()
    }

    componentDidMount() {

        _this.checkHashLoop(_this.props.fileId)


    }
    async checkHashLoop(fileId) {
        let hash
        const myInterval = setInterval(async () => {
            _this.setState({
                startedLoop: true
            })
            hash = await _this.checkHash(fileId)

            if (hash) {

                _this.setState({
                    msgStatus: 'File uploaded successfully!',
                    hash: hash,
                    cloudLink: `${cloudUrl}/${hash}`
                })
                clearInterval(myInterval);
            }
        }, 10000);

    }

    async checkHash(fileId) {
        let hash = ''
        const resultFile = await getFileById(fileId)

        const fileData = resultFile.file
        if (fileData && fileData.payloadLink) {
            hash = fileData.payloadLink
        }

        return hash
    }


}

QrCode.propTypes = {
    bchAddr: PropTypes.string.isRequired,
    hostingCostBCH: PropTypes.number.isRequired,
    hostingCostUSD: PropTypes.number.isRequired,
    changeSection: PropTypes.func.isRequired,
    resetValues: PropTypes.func.isRequired,
    fileId: PropTypes.string.isRequired


}
export default QrCode
