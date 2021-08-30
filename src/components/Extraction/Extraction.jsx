import React, { useState, useEffect } from "react"
import useData from "../../customHooks/useData"

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
    <>
      Extraction {cookie} {url}
      <div>
        <button onClick={() => extractData(url, cookie)}>Extract Now</button>
      </div>
    </>
  )
}

export default Extraction
