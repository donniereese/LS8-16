import { createContext, useContext, useState } from 'react'

const FilesContentsContext = createContext()

export const FilesContentsProvider = ({ children }) => {
  const [fileStates, setFileStates] = useState({})

  const newFileObject = (fileDetails) => {
    return {
      name: fileDetails.name,
      filePath: fileDetails.path,
      state: {
        saved: true,
      },
      contents: fileDetails.contents,
    }
  }

  const mergeArrayChanges = (array, changes) => {
    const newArray = [...array]
    changes.forEach((change) => {
      const { index, value } = change
      newArray[index] = value
    })
    return newArray
  }

  const addFile = (fileDetails) => {
    if (fileStates[fileDetails.name]) { return null }

    const fileObject = newFileObject(fileDetails)

    setFileStates({ ...fileStates, [fileDetails.name]: fileObject })

    return fileObject
  }

  const getFile = (fileName) => {
    const current = fileStates[fileName]
    if (!current) { return null }

    return current
  }

  const updateFile = (fileName, fileChanges) => {
    const current = fileStates[fileName]
    if (!current) { return null }

    const { name, contents, saved = null } = fileChanges
    let changedFile = fileStates[index]

    if (!name && !contentChanges && saved === null) { return null }

    if (name) changedFile.name = name

    if (contents) {
      changedFile.state = { saved: false }
      changedFile.contents = mergeArrayChanges(changedFile.contents, contents)
    }

    if (saved) {
      changedFile.state = { saved: saved }
    }
    const changedFileStates = [...fileStates]
    changedFileStates[fileName] = changedFile
    setFileStates(changedFileStates)
  }

  const removeFile = (fileName) => {
    const current = fileStates[fileName]
    if (!current) { return null }

    let changedFileStates = fileStates.map((file) => file.name !== fileName)
    setFileStates(changedFileStates)
  }



  return (
    <FilesContentsContext.Provider value={{ fileStates, addFile, getFile, updateFile, removeFile }}>
      {children}
    </FilesContentsContext.Provider>
  )
}

export const useFilesContents = () => useContext(FilesContentsContext)
