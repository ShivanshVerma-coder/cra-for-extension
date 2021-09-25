import "./App.scss"
import React from "react"

var url = ""
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  console.log(tabs)
})

function App() {
  return (
    <div className="App">
     Hello, This is an react-extension-app made by me, <br></br>Shivansh Verma 😄.<br></br> <a href={`https://github.com/ShivanshVerma-coder/cra-for-extension.git`} target="_blank">Get started</a> Happy coding !!! 😉😉
    </div>
  )
}

export default App
