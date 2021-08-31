import "./App.scss"
import React, { useState, useEffect } from "react"
import Authentication from "./components/Authentication/Authentication"
import Extraction from "./components/Extraction/Extraction"
import ReceivedData from "./components/ReceivedData/ReceivedData"
import useData from "./customHooks/useData"
import Navbar from "./components/Navbar/Navbar"

function App() {
  const [stage, setStage] = useState(0)
  const { getCookie, cookie, setCookie } = useData()
  const [userData, setUserData] = useState()

  useEffect(async () => {
    await getCookie()
    if (cookie) {
      //check on database
      const res = false //temporary value this will come from backend after checking if user exists
      res ? setStage(2) : setStage(1)
    } else {
      setStage(1)
    }
  }, [])
  console.log("userData", userData)

  return (
    <div className="App">
      <Navbar showUserLimit={stage == 1 ? false : true} />
      {stage == 1 && <Authentication setStage={setStage} cookie={cookie} />}
      {stage == 2 && <Extraction setStage={setStage} cookie={cookie} setCookie={setCookie} setUserData={setUserData} setStage={setStage} />}
      {stage == 3 && <ReceivedData setStage={setStage} userData={userData} />}
    </div>
  )
}

export default App
