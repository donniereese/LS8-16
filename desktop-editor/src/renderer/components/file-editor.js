import { useState, useEffect, useRef } from 'react'
import { useFilesContents } from '../hooks/files-contents'
import '../style/file-editor.scss'

const FileEditor = ({ selectedFile }) => {
  const { addFile, getFile, updateFile, removeFile, fileStates } = useFilesContents()
  const [selectedLine, setSelectedLine] = useState(0)
  const [cursorPos, setCursorPos] = useState(0)
  const [hasFocus, setHasFocus] = useState(false)
  const lineRef = useRef(null)

  const onKeyDownEvent = (e) => {
    if (!hasFocus) return;

    console.log('onKeyDownEvent: ', e.key)
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

  const selectLine = (e, index) => {
    console.log('selectLine: ', e, index)
    if (!hasFocus) setHasFocus(true)
    const sel = getSelection();
    if (sel.rangeCount) {
      console.log(`rangeCount: ${sel.rangeCount},
      getRangeAt: ${sel.getRangeAt(0)},
      startOffset: ${sel.startOffset},
      endOffset: ${sel.endOffset}`)
      const range = sel.getRangeAt(0);
      const targetedNode = range.startContainer;
      const clickedLetter = targetedNode.textContent.substr(range.startOffset, 1);
      // console.log(clickedLetter, range.startOffset, index);
      if (clickedLetter === '|') {
        setCursorPos(range.startOffset);
      }

      if (index !== selectedLine) {
        setSelectedLine(index);
      }

      // if (clickedLetter === ' ') {
      //   setCursorPos(range.startOffset);
      // }

      // if (clickedLetter === '\n') {
      //   setCursorPos(range.startOffset);
      // }

      // if (clickedLetter === '\r') {
      //   setCursorPos(range.startOffset);
      // }

      // if (clickedLetter === '\r\n') {
      //   setCursorPos(range.startOffset);
      // }

      // if (clickedLetter === '\n\r') {
      //   setCursorPos(range.startOffset);
      // }

      // if (clickedLetter === '\n\n') {
      //   setCursorPos(range.startOffset);
      // }

      // if (clickedLetter === '\r\r') {
      //   setCursorPos(range.startOffset);
      // }
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
    const leading = line.substring(0, cursorPos)
    const trailing = line.slice(cursorPos)

    if (selectedLine === index) {
      const lineContainer = (<span ref={lineRef}
                                   onClick={(e) => selectLine(e, index)}
                                   className='edit_item__text edit_item__text_highlighted'
                            >{leading}<span>|</span>{trailing}</span>)
      return lineContainer
    }

    return (<span onClick={(e) => selectLine(e, index)} className='edit_item__text'>{line}</span>)
  }

  const parseLines = () => {
    if (!selectedFile) return null;
    const parsedLines = []
    let line;

    for (let i = 0, l = 0; i < fileStates[selectedFile].contents.length; i++) {
      line = fileStates[selectedFile].contents[i]
      // console.log(l + ' ' + line)

      const hasCode = line.length > 0;

      // if (hasCode) l++;
      l++;

      parsedLines.push(
        <li className='editor_item bg-slate-900 hover:bg-slate-700' key={i}>
          {<pre className='editor_item__line_num text-slate-300'>{hasCode && l.toString().padStart(numDigits(l), ' ')}</pre>}
          {lineContent(line, i)}
        </li>
      )
    }

    return parsedLines;
  }

  return (
    <div className="editor_container">
      <div className="editor_footer">
        <div className="file-editor__header__title">
          <span>{selectedFile}</span>
        </div>
        <div className="file-editor__header__actions">
          <button
            className={}
            variant="contained"
            color="primary"
            onClick={() => { console.log('save file') }}
          >
            Save
          </button>
          <button
            className={}
            variant="contained"
            color="secondary"
            onClick={() => { console.log('delete file') }}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="editor_gutter"></div>
      <div className="editor_contents">
        <ul className="file-editor__content__textarea">
          {selectedFile && parseLines()}
        </ul>
      </div>
    </div>
  )
}

export default FileEditor;
