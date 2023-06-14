import { useState, useEffect, useRef } from 'react'
import ViewArea from '../components/view/area'
import FileEditor from '../components/file-editor'
import { useFilesContents } from '../hooks/files-contents'
import { useIpc } from 'renderer/hooks/ipc-connect'

import Button, { buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';

import '../style/editor.scss'

const loadingState = {
  LOADING: 'loading',
  LOADED: 'loaded',
  GOOD: 'good',
}

const View = () => {
  const { addFile, getFile, updateFile, removeFile, fileStates } = useFilesContents()
  const { listen, unlisten, sendMessage } = useIpc()
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedLine, setSelectedLine] = useState(null)
  const [loadingFile, setLoadingFile] = useState(loadingState.GOOD)

  const openFileRef = useRef(null)

  useEffect(() => {
    console.log('(useEffect)(1) EditorView')
    const onOpenFile = (fileDetails) => {
      console.log('onOpenFile')
      openFileRef.current = fileDetails
      setLoadingFile(loadingState.LOADED)
    }

    listen('open-file', (data) => onOpenFile(data))

    return () => {
      listen('open-file', (data) => onOpenFile(data))
    }
  }, [])

  useEffect(() => {
    console.log('(useEffect)(2) EditorView')
    console.log('(useEffect) EditorView >ref.current: ', openFileRef.current)

    if (openFileRef.current && loadingFile === loadingState.LOADED) {
      console.log('(useEffect) EditorView > updateFiles(): arg=', openFileRef.current)
      const temp = { ...openFileRef.current };
      const fileObject = addFile(temp)
      console.log('after addFile: ', fileObject)
      setSelectedFile(fileObject.name)
      // openFileRef.current = null
      setLoadingFile(loadingState.GOOD)

    }
  }, [loadingFile, addFile, setSelectedFile, setLoadingFile])

  // const onOpenFile = (fileDetails) => {
  //   console.log('(useEffect) EditorView > onOpenFile(arg): arg=', fileDetails)
  //   const fileObject = addFile(fileDetails)
  //   console.log('after addFile: ', fileObject)
  //   setSelectedFile(fileObject)
  // }

  const handleFileDetails = (fileDetails) => {
    const fileObject = addFile(fileDetails)
    setSelectedFile(fileObject)
  }


  const openFileAction = () => {
    setLoadingFile(loadingState.LOADING)
    sendMessage('open-file')
  }

  const onTabClickEvent = (fileName) => {
    setSelectedFile(fileName)
  }

  const numDigits = (x) => {
    return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
  }

  const colors = {
    slate: {
      950: '#020617',
      900: '#0f172a',
      800: '#1e293b',
      700: '#334155',
      600: '#475569',
      500: '#64748b',
      400: '#94a3b8',
      300: '#cbd5e1',
      200: '#e2e8f0',
      100: '#f1f5f9',
      50: '#f8fafc',
    },
    indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
    }
  }
  const ButtonTab = styled(Button)`
  background-color: ${colors.slate[900]};
  color: ${colors.slate[300]};
  border: 1px solid ${colors.slate[600]};

  &:hover {
    background-color: ${colors.slate[600]};
    color: ${colors.indigo[100]};
    border: 1px solid ${colors.indigo[600]};
  }
  `

  return (
    <div>
      <header>
        <h1>Editor</h1>
      </header>
      <nav>
        <button onClick={() => openFileAction()}>Open</button>
      </nav>
      <ViewArea type='main'>
        <nav>
          {Object.keys(fileStates).map(f => (<ButtonTab onClick={()=>onTabClickEvent(f)}>${f}</ButtonTab>))}
        </nav>
        <main>
          <ul className={`editor_contents bg-slate-900`}>
            <FileEditor selectedFile={selectedFile} />
          </ul>
        </main>
      </ViewArea>
      <ViewArea type='sidebar'></ViewArea>
    </div>
  )
}

export default View;
