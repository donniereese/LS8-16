import { createContext, useContext, useState, useEffect } from 'react'

export const IpcContext = createContext()

export const useIpcMessages = () => useContext(IpcContext)

export const IpcProvider = ({ children, ipcRenderer, defaultTopics = [] }) => {
  const [logs, setLogs] = useState([])
  const [topicListeners, setTopicListener] = useState({})
  const [topicResolvers, setTopicResolvers] = useState({})
  const ipc = ipcRenderer;

  useEffect(() => {
    console.log('(useEffect) IpcProvider')
    console.log('(useEffect) .... ', 'defaultTopics: ', defaultTopics)
  }, [])

  const topicTemplate = (topic, listener) => {

  }

  const logTemplate = (title, message, timestamp) => ({
    title: `${title}`,
    message: `${message}`,
    timestamp: timestamp ? timestamp : Date.now(),
  })

  const updateTopic = (topicObject) => {
    console.log(`(hooks) ipc-message > updateTopic(): \n  arg: ${topicObject}`)
    const newTopics = { ...topicListeners }
    console.log('(hooks) .... ', `\n  topicObject: ${topicObject}\n  newTopics: ${newTopics}`)
    newTopics[topicObject.topic] = topicObject
    setTopicListener(newTopics)
  }

  const topics = (topic) => {
    console.log(`(hooks) ipc-message > topics(): arg: ${topic}`)
    if (!topic) return topicListeners;

    let tempTopic = topicListeners[topic];

    console.log(`(hooks) .... topicsObj: `, topicListeners)
    console.log(`(hooks) .... tempTopic: `, tempTopic)

    if (!tempTopic) {
      tempTopic = topicTemplate(topic)
      updateTopic(tempTopic)
    }

    return tempTopic;
  }

  const subscribe = (topic, handler) => {
    console.log(`(hooks) ipc-message > subscribe(): \n  arg1: ${topic}\n  arg2: ${handler}`)
    if (!topic || !handler) return;
    // let topicHandler = ipcSubscriptions[topic];

    let topicListener = topicListeners[topic];

    if (!topicListener) topicListener = {
      topic,
      listeners: [],
      listener: () => ipc.on(topic, listener),
    }

    topicTemplate(topic, (m) => messageHandler(topic, m))

    console.log('(hooks) .... ', topicListener.listeners)

    topicListener = { ...topicListener, listeners: [...topicListener.listeners, handler] }

    console.log('(hooks) .... ', topicListener)

    const newListeners = { ...topicListeners }
    newListeners[topic] = topicListener

    setTopicListener(newListeners)
    console.log('(hooks) .... ', 'Set topic listeners: ', topicListeners)


    setTimeout(() => {
      console.log('(hooks) .... ', 'topicListeners: ', (topicListeners))
    }, 1000)
  }

  const unsubscribe = (topic, handler) => {
    console.log(`(hooks) ipc-message > unsubscribe(): \n  arg1: ${topic}\n  arg2: ${handler}`)
    // if (!ipcSubscriptions[topic]) { return null }

    ipc.removeListener(topic, handler)

    // const topicIndex = ipcSubscriptions.indexOf(topic)
    // ipcSubscriptions.splice(topicIndex, 1)
  }

  const sendMessage = (topic, message) => {
    ipc.sendMessage(topic, message)
  }

  const messageHandler = (topic, message) => {
    console.log(`(hooks) ipc-message > messageHandler(): \n  arg1: ${topic}\n  arg2: ${message}`)
    // Get Topic
    console.log('(hooks) .... ', 'all topics: ', topicListeners)
    // let topicListener = topics(topic)

    let topicListener = topicListeners[topic]

    setLogs([...logs, logTemplate(topic, message)])

    console.log('(hooks) .... ', 'topics for topic: ', topic)
    console.log('(hooks) .... ', 'topicListener: ', topicListener)

    if (topicListeners[topic]) {
      console.log('(hooks) .... ', 'topicListener found')
      for (let i = 0; i < topicListener.listeners.length; i++) {
        console.log('(hooks) .... ', 'loop listeners')
        topicListeners.listeners[i](topic, message)
      }
    }
  }

  return (
    <IpcContext.Provider value={{ topicListeners, logs, unsubscribe, subscribe, sendMessage }}>
      {children}
    </IpcContext.Provider>
  )
}
