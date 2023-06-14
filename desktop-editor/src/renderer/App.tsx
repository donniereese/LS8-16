import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { IpcProvider } from './hooks/ipc-connect'
import { FilesContentsProvider } from './hooks/files-contents';
import EditorView from './views/editor.view'
import SettingsView from './views/settings.view'
import 'tailwindcss/tailwind.css'

import './style/main.scss'
import './style/app.scss'
import './style/screen-frame.scss'

export default function App({ ipc }) {
  return (
    <IpcProvider ipcRenderer={ipc}>
      <FilesContentsProvider>
        <div className='app_window screen-frame--outer'>
          <div className='screen-frame'>
            <nav className='bg-slate-100 window_controls abs-controls'>
              <h1 className='bg-slate-400 window_title'>LS8 Editor</h1>
            </nav>
            <div className='screen-frame--inner'>
              <div className="canvas-container">
                <Router>
                  <Routes>
                    <Route path="/" element={<EditorView />} />
                  </Routes>
                </Router>
              </div>
            </div>
          </div>
        </div>
      </FilesContentsProvider>
    </IpcProvider>
  );
}
