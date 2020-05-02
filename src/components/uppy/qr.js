/* eslint-disable */
import React, { Component } from "react"
import PropTypes from "prop-types"

var QRCode = require('qrcode.react')

let _this

class QrCode extends React.Component {
    constructor(props) {
        super(props)
        _this = this
        this.Notification = Notification

        this.state = {

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

                        <p> <b>{_this.props.bchAddr}</b></p>

                    </div>

                    <div className="col-12 ">
                        <button
                            className="btn-back"
                            onClick={() => _this.props.changeSection('uppy')}>
                            Back
                           </button>
                    </div>
                </div>

            </>
        )

    }



    componentDidMount() {


    }

}

QrCode.propTypes = {
    bchAddr: PropTypes.string.isRequired,
    hostingCostBCH: PropTypes.number.isRequired,
    hostingCostUSD: PropTypes.number.isRequired,
    changeSection: PropTypes.func.isRequired

}
export default QrCode
