import { newFile } from '../../services/files'
    allowMultipleUploads: false,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
uppy.use(Tus, { endpoint: `${SERVER}/uppy-files` })
            fileSize: '',
    createFileModel() {
        const file = {
            schemaVersion: 1,
            // userIdUpload: getUser()._id,
            size: _this.state.fileSize ? _this.state.fileSize: ''
        }
        return file
    }
            // Create a new file model (locally)
            const file = _this.createFileModel()
            console.log("file", file)
            // Create new metadata model on the server
            const resultFile = await newFile(file)
            console.log(
                `file creation result: ${JSON.stringify(resultFile, null, 2)}`
            )
            if (!resultFile.success) {
                throw new Error("Fail to create file")
            }
            console.error(error)
                    console.info("Successful uploads:", result.successful)

                        _this.setState({
                            fileSize: result.successful[0].size
                        })
                        // _this.getFileData(result.successful)
            fileSize: '',