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

const Extraction = ({ cookie, setCookie, setScrapedData, setStage, personalData, runAuthentication }) => {
  const { getData, loading } = useData()
  const [error, setError] = useState()
  const [url, setUrl] = useState(URL)
  const [isIndividualCrms, setIsIndividualCrms] = useState(false)
  const [isIndividualPhoneNumbers, setIsIndividualPhoneNumbers] = useState(false)

  const extractData = async (url, cookie, isIndividualCrms, isIndividualPhoneNumbers) => {
    const res = await getData({ url, cookie, userLinkedinUrl: personalData.linkedin_url, isIndividualCrms, isIndividualPhoneNumbers })
    if (res.msg === "Successfully updated profile") {
      await setScrapedData(res.data)
      await runAuthentication({ staging: false })
      setStage(3)
    } else {
      setError(true)
    }
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
            setIsIndividualPhoneNumbers(!isIndividualPhoneNumbers)
          }}
        >
          {isIndividualPhoneNumbers ? <CheckedSVG /> : <UncheckedSVG />}
          <label className={!isIndividualPhoneNumbers ? "unchecked" : ""}>Get individual phone number</label>
        </div>
        <div
          onClick={() => {
            setIsIndividualCrms(!isIndividualCrms)
          }}
        >
          {isIndividualCrms ? <CheckedSVG /> : <UncheckedSVG />}
          <label className={!isIndividualCrms ? "unchecked" : ""}>Get individual CRM</label>
        </div>
      </div>
      <div className="extract-button">
        <button onClick={() => extractData(url, cookie, isIndividualCrms, isIndividualPhoneNumbers)} className={`${loading ? "active" : ""}`}>
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
