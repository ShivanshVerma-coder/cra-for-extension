import React, { useState, useEffect } from "react"
import useData from "../../customHooks/useData"
import InputText from "../InputText/InputText"
import "./Extraction.scss"
import { ReactComponent as CheckedSVG } from "../../assets/Icons/checked.svg"
import { ReactComponent as UncheckedSVG } from "../../assets/Icons/unchecked.svg"
import { ReactComponent as LoadingSVG } from "../../assets/Icons/loading.svg"

var URL = ""
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  if (tabs[0]["url"].includes("linkedin.com/in")) {
    URL = tabs[0]["url"]
  }
})

const Extraction = ({ cookie, setCookie, setUserData, setStage }) => {
  const { getData, userData } = useData()
  const [error, setError] = useState()
  const [loading, setLoading] = useState()
  const [url, setUrl] = useState(URL)
  const [individualCRM, setIndividualCRM] = useState(false)
  const [individualPhone, setIndividualPhone] = useState(false)

  const extractData = async (url, cookie) => {
    setLoading(true)
    const res = await getData(url, cookie)
    if (res) {
      await setUserData(res)
      setStage(3)
    } else {
      setError(true)
    }
    setLoading(false)
  }

  return (
    <div className="extraction">
      <div className="details">
        <InputText setValue={setUrl} value={url} label={`Linkedin profile URL`} width="336px" placeholder="www.linkedin.com/in/StuartLittle"></InputText>
        <InputText setValue={setCookie} value={cookie} label={`LinkedIn session cookie`} width="336px"></InputText>
      </div>
      <div className="checkboxes">
        <div
          onClick={() => {
            setIndividualPhone(!individualPhone)
          }}
        >
          {individualPhone ? <CheckedSVG /> : <UncheckedSVG />}
          <label className={!individualPhone ? "unchecked" : ""}>Get individual phone number</label>
        </div>
        <div
          onClick={() => {
            setIndividualCRM(!individualCRM)
          }}
        >
          {individualCRM ? <CheckedSVG /> : <UncheckedSVG />}
          <label className={!individualCRM ? "unchecked" : ""}>Get individual CRM</label>
        </div>
      </div>
      <div className="extract-button">
        <button onClick={() => extractData(url, cookie)} className={`${loading ? "active" : ""}`}>
          <span>
            {loading ? (
              <>
                {" "}
                <LoadingSVG /> Extracting
              </>
            ) : (
              "Extract"
            )}
          </span>
        </button>
      </div>
    </div>
  )
}

export default Extraction
