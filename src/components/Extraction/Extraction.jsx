import React, { useState } from "react"
import useData from "../../customHooks/useData"
import InputText from "../InputText/InputText"
import "./Extraction.scss"
import { ReactComponent as CheckedSVG } from "../../assets/Icons/checked.svg"
import { ReactComponent as UncheckedSVG } from "../../assets/Icons/unchecked.svg"
import { ReactComponent as LoadingSVG } from "../../assets/Icons/loading.svg"
import { SCRAPED_DATA, URL } from "../../customHooks/constants"

var windowURL = ""
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  if (tabs[0]["url"].includes("linkedin.com/in") || tabs[0]["url"].includes("linkedin.com/company")) {
    windowURL = tabs[0]["url"]
  }
})

const Extraction = ({ cookie, setCookie, setScrapedData, setStage, personalData }) => {
  const { getData } = useData()
  const [url, setUrl] = useState(windowURL)
  const [isIndividualCrms, setIsIndividualCrms] = useState(false)
  const [isIndividualPhoneNumbers, setIsIndividualPhoneNumbers] = useState(false)
  const [loading, setLoading] = useState(false)

  const extractData = async (url, cookie, isIndividualCrms, isIndividualPhoneNumbers) => {
    setLoading(true)
    const res = await getData({ url, cookie, userLinkedinUrl: personalData.linkedin_url, isIndividualCrms, isIndividualPhoneNumbers })
    if (res.msg === "Successfully scraped linkedin profile") {
      await setScrapedData(res.data)
      await personalData.scrapings++
      localStorage.setItem(SCRAPED_DATA, JSON.stringify(res.data))
      localStorage.setItem(URL, url)
      setLoading(false)
      setStage(3)
    } else {
      setLoading(false)
    }
  }

  return (
    <div className="extraction">
      <div className="details">
        <InputText setValue={setUrl} value={url} label={`Linkedin profile URL`} width="336px" placeholder="www.linkedin.com/in/StuartLittle"></InputText>
        <InputText setValue={setCookie} value={cookie} label={`LinkedIn session cookie`} width="336px"></InputText>
      </div>
      <div className="checkboxes">
        {personalData.individual_phone_numbers_option && (
          <div
            onClick={() => {
              setIsIndividualPhoneNumbers(!isIndividualPhoneNumbers)
            }}
          >
            {isIndividualPhoneNumbers ? <CheckedSVG /> : <UncheckedSVG />}
            <label className={!isIndividualPhoneNumbers ? "unchecked" : ""}>Get individual phone number</label>
          </div>
        )}
        {personalData.individual_crms_option && (
          <div
            onClick={() => {
              setIsIndividualCrms(!isIndividualCrms)
            }}
          >
            {isIndividualCrms ? <CheckedSVG /> : <UncheckedSVG />}
            <label className={!isIndividualCrms ? "unchecked" : ""}>Get individual CRM</label>
          </div>
        )}
      </div>
      <div className="extract-button">
        <button onClick={() => (personalData.scrapings < personalData.max_scrapings ? extractData(url, cookie, isIndividualCrms, isIndividualPhoneNumbers) : "")} className={`${loading ? "active" : ""} ${personalData.scrapings === personalData.max_scrapings ? "disabled" : ""}`}>
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
