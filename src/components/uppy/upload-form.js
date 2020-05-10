/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { newFile } from '../../services/files'
import QrCode from './qr.js'

import CircularProgress from '@material-ui/core/CircularProgress'

import NOTIFICATION from '../../lib/notification'
const Notification = new NOTIFICATION()

// Uppy imports
const Uppy = require('@uppy/core')
const Tus = require('@uppy/tus')

const { Dashboard } = require('@uppy/react')

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

// import {
//   isRequired,
//   isNotInRange,
//   containsWhiteSpace,
// } from "react-form-validators"

//const methods = [containsWhiteSpace, isNotInRange]

const SERVER = process.env.GATSBY_API_URL

//instantiate uppy
const uppy = Uppy({
  allowMultipleUploads: false,
  meta: { test: 'avatar' },
  debug: false,
  restrictions: {
    maxFileSize: null,
    maxNumberOfFiles: 1,
    minNumberOfFiles: 1,
    allowedFileTypes: null, //type of files allowed to load
  },
})
// Adding plugins
uppy.use(Tus, { endpoint: `${SERVER}/uppy-files` })

uppy.on('upload', data => {
  let IDs = data.fileIDs

  IDs.forEach(function(fileId, index) {
    const indexName = fileId.lastIndexOf('/')
    const fileName = fileId.substring(indexName, fileId.length)
    uppy.setFileMeta(fileId, { fileNameToEncrypt: fileName })
  })
})

let _this

export class UploadForm extends React.Component {
  constructor(props) {
    super(props)
    _this = this
    this.Notification = Notification

    this.state = {
      show: false,
      loaded: true,
      fileSize: '',
      fileData: [],
      bchAddr: '',
      hostingCostUSD: '',
      hostingCostBCH: '',
      hostingCostSAT: '',
      section: 'uppy', // uppy or qr
    }
  }

  render() {
    return (
      <>
        {_this.state.section === 'uppy' ? (
          <div className="grid-wrapper uppy-container">
            <div className="col-6 uppy-dashboard">
              <Dashboard uppy={uppy} {..._this.props}></Dashboard>
              <div className="col-6 uppy-progress">
                {!_this.state.loaded && <CircularProgress />}
              </div>
              <div className="col-6 uppy-buttons">
                <button onClick={_this.resetValues}>Reset</button>
                <button onClick={_this.submitData}>Submit</button>
              </div>
            </div>
          </div>
        ) : (
          <QrCode
            bchAddr={_this.state.bchAddr}
            hostingCostUSD={_this.state.hostingCostUSD}
            hostingCostBCH={_this.state.hostingCostBCH}
            changeSection={_this.changeSection}
          />
        )}
      </>
    )
  }

  handleUpdate(event) {
    const name = event.target.name
    const value = event.target.value
    _this.setState(prevState => ({
      ...prevState,
      formValues: {
        ...prevState,
        [name]: value,
      },
    }))
  }
  changeSection(sec) {
    _this.setState({
      section: sec ? sec : 'uppy',
    })
  }

  componentWillUnmount() {
    this.uppy && this.uppy.close()
  }

  createFileModel() {
    const file = {
      schemaVersion: 1,
      // userIdUpload: getUser()._id,
      size: _this.state.fileSize ? _this.state.fileSize : '',
      fileId: _this.state.fileId ? _this.state.fileId : '',
      fileName: _this.state.fileName ? _this.state.fileName : '',
      fileExtension: _this.state.fileExtension ? _this.state.fileExtension : '',
    }
    return file
  }

  // Click handler for the 'Submit to Blockchain' button.
  // Function refactored
  async submitData() {
    try {
      _this.setState({
        loaded: false,
      })
      //uppy error handler
      await _this.uppyHandler()

      // Create a new file model (locally)
      const file = _this.createFileModel()
      console.log('file', file)

      // Create new metadata model on the server
      const resultFile = await newFile(file)
      console.log(
        `file creation result: ${JSON.stringify(resultFile, null, 2)}`
      )
      if (!resultFile.success) {
        throw new Error('Fail to create file')
      }

      _this.setState({
        bchAddr: resultFile.file.bchAddr,
        hostingCostUSD: resultFile.hostingCostUSD,
        hostingCostBCH: resultFile.hostingCostBCH,
        hostingCostSAT: resultFile.hostingCostSAT,
      })

      _this.resetValues()

      _this.setState({
        loaded: true,
      })

      _this.Notification.notify('Upload', 'Success!!', 'success')

      // Go to display QR Code
      _this.changeSection('qr')
    } catch (error) {
      _this.setState({
        loaded: true,
      })
      console.error(error)
      _this.Notification.notify('Upload', 'Error', 'danger')
    }
  }

  async uppyHandler() {
    return new Promise((resolve, reject) => {
      try {
        // Start to upload files via uppy
        uppy.upload().then(async result => {
          console.info('Successful uploads:', result.successful)
          try {
            // Upload failed due to no file being selected.
            if (result.successful.length <= 0 && result.failed.length <= 0) {
              return reject('File is required')
              //throw new Error('File is required')
            } else if (result.failed.length > 0) {
              // Upload failed (for some other reason)

              // Error updload some file
              return reject('Fail to upload Some Files')

              //throw new Error('Fail to upload Some Files')
            }
            console.log('result.successful')

            console.log(result.successful)

            _this.setState({
              fileId: result.successful[0].id,
              fileName: result.successful[0].name,
              fileExtension: result.successful[0].extension,
              fileSize: result.successful[0].size,
            })
            // _this.getFileData(result.successful)
          } catch (error) {
            throw error
          }
          resolve(true)
        })
      } catch (error) {
        return reject(error)
      }
    })
  }

  getFileData(files) {
    const fileData = []

    if (!files.length) {
      return
    }
    files.map(value => {
      console.log(value.extension)
      if (value.extension) {
        fileData.push(value.extension)
      } else {
        fileData.push('unknow')
      }
    })

    _this.setState({
      fileData: fileData,
    })
    console.log('FILED:', fileData)
  }

  resetValues() {
    _this.setState(prevState => ({
      ...prevState,
      fileSize: '',
    }))

    uppy && uppy.reset()
  }
}
