import "./App.scss"
import React, { useState, useEffect } from "react"
import Authentication from "./components/Authentication/Authentication"
import Extraction from "./components/Extraction/Extraction"
import ReceivedData from "./components/ReceivedData/ReceivedData"
import useUser from "./customHooks/useUser"
import Navbar from "./components/Navbar/Navbar"

function App() {
  const [stage, setStage] = useState(0)
  const { getCookie, cookie, setCookie, authenticate } = useUser()
  const [scrapedData, setScrapedData] = useState()
  const [personalData, setPersonalData] = useState()

  const runAuthentication = async ({ staging }) => {
    await getCookie()
    if (cookie) {
      const res = await authenticate(cookie) //temporary value this will come from backend after checking if user exists
      res.msg === "Fetched user successfully"
        ? () => {
            setPersonalData(res.data)
            staging ? setStage(2) : ""
          }
        : setStage(1)
    } else {
      setStage(1)
    }
  }

  useEffect(async () => {
    runAuthentication({ staging: true })
  }, [])
  console.log("scrapedData", scrapedData)

  return (
    <div className="App">
      <Navbar showUserLimit={stage == 1 ? false : true} personalData={personalData} />
      {stage == 1 && <Authentication setStage={setStage} cookie={cookie} setPersonalData={setPersonalData} />}
      {stage == 2 && <Extraction setStage={setStage} cookie={cookie} setCookie={setCookie} setScrapedData={setScrapedData} setStage={setStage} personalData={personalData} runAuthentication={runAuthentication} />}
      {stage == 3 && <ReceivedData setStage={setStage} scrapedData={scrapedData} />}
    </div>
  )
}

export default App
