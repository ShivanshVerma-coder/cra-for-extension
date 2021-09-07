import "./App.scss"
import React, { useState, useEffect } from "react"
import Authentication from "./components/Authentication/Authentication"
import Extraction from "./components/Extraction/Extraction"
import ReceivedData from "./components/ReceivedData/ReceivedData"
import useUser from "./customHooks/useUser"
import Navbar from "./components/Navbar/Navbar"
import { ReactComponent as Loader } from "./assets/Icons/colored-loading.svg"

function App() {
  const [stage, setStage] = useState(0)
  const { getCookie, cookie, setCookie, authenticate } = useUser()
  const [scrapedData, setScrapedData] = useState({})
  const [personalData, setPersonalData] = useState({})
  const [authenticating, setAuthenticating] = useState(true)

  useEffect(() => {
    getCookie()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const runAuthenticate = async ({ cookie, staging = true }) => {
    setAuthenticating(true)
    const res = await authenticate(cookie) //temporary value this will come from backend after checking if user exists
    setAuthenticating(false)
    if (res?.msg === "Fetched user successfully") {
      setPersonalData(res.data)
      if (staging) {
        setStage(2)
      }
    } else {
      setStage(1)
    }
  }

  useEffect(() => {
    if (cookie) {
      runAuthenticate({ cookie })
    } else {
      setAuthenticating(false)
      setStage(1)
    }
  }, [cookie]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      {authenticating ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <>
          <Navbar showUserLimit={stage === 1 ? false : true} personalData={personalData} />
          {stage === 1 && <Authentication setStage={setStage} cookie={cookie} setPersonalData={setPersonalData} />}
          {stage === 2 && <Extraction setStage={setStage} cookie={cookie} setCookie={setCookie} setScrapedData={setScrapedData} personalData={personalData} runAuthenticate={runAuthenticate} />}
          {stage === 3 && <ReceivedData setStage={setStage} scrapedData={scrapedData} />}
        </>
      )}
    </div>
  )
}

export default App
