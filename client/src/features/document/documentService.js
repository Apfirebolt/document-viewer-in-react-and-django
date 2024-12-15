import httpClient from '../../plugins/interceptor'
import { toast } from 'react-toastify'
import authService from '../auth/authService'

// Create new Document
const createDocument = async (documentData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await httpClient.post('documents', documentData, config)
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
      authService.logout()
    }
    if (err.response.status === 400) {
      errorMessage = ''
      err.response.data.non_field_errors.map((error) => {
        errorMessage += error + '\n'
      })
    }
    toast.error(errorMessage)
  }
}

// Get user Documents
const getDocuments = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await httpClient.get('documents', config)
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
      authService.logout()
    }
    toast.error(errorMessage)
  }
}

// Get single Document
const getDocument = async (documentId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await httpClient.get('documents/' + documentId, config)
  
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
      authService.logout()
    }
    toast.error(errorMessage)
  }
}

// Update Document
const updateDocument = async (data, token) => {
 try {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // Extract the ID from the data payload
  const response = await httpClient.patch('documents/' + data.id, data, config)

  return response.data
 } catch (err) {
  let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
    }
    toast.error(errorMessage)
 }
}

// Delete single Document
const deleteDocument = async (documentId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await httpClient.delete('documents/' + documentId, config)
  
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
      // logout

    }
    toast.error(errorMessage)
  }
}

const documentService = {
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  getDocuments,
}

export default documentService