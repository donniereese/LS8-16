import { useFilesContents } from "renderer/hooks/files-contents"

const TabControls = () => {
  const { fileStates } = useFileContents()

  return (
    <nav className="tabs_list">
      <ul className="tabs_list__container">
        {Object.keys(fileStates).map((fileName, index) => {
          return (
            <li key={index} className="tabs_list__item">
              <button className="tabs_list__item__button" onClick={() => onTabClickEvent(fileName)}>
                <span className="tabs_list__item__button__text">{fileName}</span>
              </button>
            </li> 
          )
        }
      </ul>
    </nav>
  )
}

export default TabControls;