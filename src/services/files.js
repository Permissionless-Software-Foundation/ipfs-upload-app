
//import { getUser } from './auth'

const SERVER = process.env.GATSBY_API_URL

// Detect if the app is running in a browser.
export const isBrowser = () => typeof window !== 'undefined'



// Create new metadata
export const newFile = async (file) => {
    // Try to create new metadata
    const token = "" //getUser().jwt ? getUser().jwt : ''
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                file: file,
            })
        }
        const resp = await fetch(`${SERVER}/files/`, options)

        if (resp.ok) {
            return resp.json()
        } else {
            return false
        }
    } catch (err) {
        // If something goes wrong , return false.
        return false
    }
}


// Get  metadatas by id
export const getFileById = async fileId => {
  
    // Try to get  metadata by id
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const resp = await fetch(`${SERVER}/files/${fileId}`, options)
      if (resp.ok) {
        return resp.json()
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }