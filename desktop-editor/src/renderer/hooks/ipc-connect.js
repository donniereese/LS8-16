import React, { createContext, useContext, useEffect, useRef } from 'react';

const ElectronContext = createContext();

const IpcProvider = ({ ipcRenderer, children }) => {
  return <ElectronContext.Provider value={ipcRenderer}>{children}</ElectronContext.Provider>;
};

const useIpc = () => {
  const ipcRenderer = useContext(ElectronContext);
  const callbacksRef = useRef({});

  const listen = (channel, callback) => {
    if (!callbacksRef.current[channel]) {
      callbacksRef.current[channel] = [];
    }
    callbacksRef.current[channel].push(callback);
    ipcRenderer.on(channel, callback);
  };

  const unlisten = (channel, callback) => {
    const callbacks = callbacksRef.current[channel];
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
        ipcRenderer.removeListener(channel, callback);
      }
    }
  };

  const sendMessage = (channel, ...args) => {
    console.log(ipcRenderer)
    ipcRenderer.sendMessage(channel, ...args);
  };

  useEffect(() => {
    return () => {
      Object.keys(callbacksRef.current).forEach((channel) => {
        const callbacks = callbacksRef.current[channel];
        if (callbacks) {
          callbacks.forEach((callback) => {
            ipcRenderer.removeListener(channel, callback);
          });
        }
      });
    };
  }, [ipcRenderer]);

  return {
    listen,
    unlisten,
    sendMessage,
  };
};

export { IpcProvider, useIpc };
