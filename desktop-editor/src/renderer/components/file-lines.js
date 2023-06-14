import { useState, useEffect, useRef } from 'react'
import { useFilesContents } from '../hooks/files-contents'
import '../style/file-editor.scss'

const FileLines = ({ selectedFile }) => {
  const { addFile, getFile, updateFile, removeFile, fileStates } = useFilesContents()
  const [selectedLine, setSelectedLine] = useState(0)
  const [cursorPos, setCursorPos] = useState(0)
  const lineRef = useRef(null)

  useEffect(() => {

  }, [selectedLine])

  const onKeyDownEvent = (e) => {
    if (e.key === 'ArrowUp') {
      setSelectedLine(Math.max(0, selectedLine - 1));
    }

    if (e.key === 'ArrowDown') {
      setSelectedLine(Math.min(fileStates[selectedFile].contents.length - 1, selectedLine + 1));
    }

    if (e.key === 'ArrowLeft') {
      console.log('left')
      setCursorPos(Math.max(0, cursorPos - 1));
    }

    if (e.key === 'ArrowRight') {
      console.log('right')
      setCursorPos(Math.min(lineRef.current.value.length, cursorPos + 1));
    }
  }

  const setLineRef = (ref) => {
    lineRef.current = ref
    if (lineRef.current) {
      console.log('cur ', lineRef.current, cursorPos)
      lineRef.current.focus()
      lineRef.current.setSelectionRange(cursorPos, cursorPos)
    }
  }

  const setCursorPosInInput = (pos) => {
    lineRef.current.setSelectionRange(pos, pos)
  }

  const numDigits = (x) => {
    return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
  }

  const lineContent = (line, index) => {
    if (selectedLine === index) {
      const lineContainer = (<input ref={lineRef} onKeyDown={onKeyDownEvent} value={ line } className='edit_item__text' />)
      return lineContainer
    }

    return (<span className='edit_item__text'>{line}</span>)
  }

  const parseLines = () => {
    if (!selectedFile) return null;
    const parsedLines = []
    for (let i = 0,l = 0; i < fileStates[selectedFile].contents.length; i++) {
      const line = fileStates[selectedFile].contents
      const lineSplit = line.split('#')

      const hasCode = lineSplit[0].length > 0

      if (hasCode) l++;

      parsedLines.push(
        <li className='editor_item bg-slate-900 hover:bg-slate-700' key={index}>
          {<pre className='editor_item__line_num text-slate-300'>{hasCode && l.toString().padStart(numDigits(l), ' ')}</pre>}
          {lineContent(lineSplit[0], index)}
          {lineContent(`#${lineSplit[1]}`, index)}
        </li>
      )
    }
  }

  return (
    <>
    <div>{selectedLine}:{cursorPos}</div>
    <ul className={`editor_contents bg-slate-900`}>
        {selectedFile && parseLines()}
    </ul>
    </>
  )
}

export default FileLines;
