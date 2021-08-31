import React, { useState, useEffect } from "react"
import useData from "../../customHooks/useData"
import InputText from "../InputText/InputText"
import "./Extraction.scss"

var URL = ""
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  if (tabs[0]["url"].includes("linkedin.com/in")) {
    URL = tabs[0]["url"]
  }
})

const Extraction = ({ cookie, setCookie, setUserData, setStage }) => {
  const { getData, userData } = useData()
  const [error, setError] = useState()
  const [url, setUrl] = useState(URL)

  const extractData = async (url, cookie) => {
    const res = await getData(url, cookie)
    if (res) {
      await setUserData(res)
      setStage(3)
    } else {
      setError(true)
    }
  }

  return (
    <div className="extraction">
      <div className="details">
        <InputText setValue={setUrl} value={url} label={`Linkedin profile URL`} width="320px"></InputText>
        <InputText setValue={setCookie} value={cookie} label={`Linkedin session cookie`} width="320px"></InputText>
      </div>
      <div className="checkboxes"></div>
      <div>
        <button onClick={() => extractData(url, cookie)}>Extract Now</button>
      </div>
    </div>
  )
}

export default Extraction
