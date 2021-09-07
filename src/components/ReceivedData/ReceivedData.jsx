import React, { useState } from "react"
import "./ReceivedData.scss"
import { ReactComponent as ArrowLeft } from "../../assets/Icons/arrowLeft.svg"
import InputText from "../InputText/InputText"
import InputTextArea from "../InputTextArea/InputTextArea"

const ReceivedData = ({ scrapedData, setStage }) => {
  const [firstName, setFirstName] = useState(scrapedData["first_name"])
  const [lastName, setLastName] = useState(scrapedData["last_name"])
  const [fullName, setFullName] = useState(scrapedData["first_name"] + " " + scrapedData["last_name"])
  const [companyName, setCompanyName] = useState(scrapedData["company_name"])
  const [companyURL, setCompanyURL] = useState(scrapedData["company_url"])
  const [companySize, setCompanySize] = useState(scrapedData["company_size"])
  const [location, setLocation] = useState(scrapedData["location"])
  const [personalEmail, setPersonalEmail] = useState(scrapedData["personal_emails"])
  const [companyEmail, setCompanyEmail] = useState(scrapedData["company_emails"])
  const [individualCRM, setIndividualCRM] = useState(scrapedData["individiual_crms"])
  const [companyCRM, setCompanyCRM] = useState(scrapedData["company_crms"])
  const [companyLinkedInURL, setCompanyLinkedInURL] = useState(scrapedData["company_linkedin_url"])
  const [personalPhoneNumber, setPersonalPhoneNumber] = useState(scrapedData["personal_phone_numbers"])
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState(scrapedData["company_phone_numbers"])
  const [about, setAbout] = useState(scrapedData["company_description"])

  const DATA_MAPPING = [
    {
      label: "First name",
      value: firstName,
      setValue: setFirstName,
    },
    {
      label: "Last name",
      value: lastName,
      setValue: setLastName,
    },
    {
      label: "Full name",
      value: fullName,
      setValue: setFullName,
    },
    {
      label: "Company name",
      value: companyName,
      setValue: setCompanyName,
    },
    {
      label: "Company URL",
      value: companyURL,
      setValue: setCompanyURL,
    },
    {
      label: "Company LinkedIn URL",
      value: companyLinkedInURL,
      setValue: setCompanyLinkedInURL,
    },
    {
      label: "Company size",
      value: companySize,
      setValue: setCompanySize,
    },
    {
      label: "Personal email",
      value: personalEmail,
      setValue: setPersonalEmail,
    },
    {
      label: "Company Email",
      value: companyEmail,
      setValue: setCompanyEmail,
    },
    {
      label: "Individual CRM",
      value: individualCRM,
      setValue: setIndividualCRM,
    },
    {
      label: "Company CRM",
      value: companyCRM,
      setValue: setCompanyCRM,
    },
    {
      label: "Location",
      value: location,
      setValue: setLocation,
    },
  ]

  return (
    <div className="received-data">
      <div
        className="back"
        onClick={() => {
          setStage(2)
        }}
      >
        <ArrowLeft />
        back
      </div>
      <div className="basic-details">
        {DATA_MAPPING.map(({ label, value, setValue }, index) => {
          return <InputText key={index} setValue={setValue} value={value && value?.length !== 0 ? value : "NA"} label={label} width="238px" />
        })}
      </div>
      <div className="phone-details">
        <InputText setValue={setPersonalPhoneNumber} value={personalPhoneNumber && personalPhoneNumber?.length !== 0 ? personalPhoneNumber : "NA"} label={"Personal phone number"} width="238px" />
        <img className="qr-code" src={`https://qrcode.tec-it.com/API/QRCode?data=tel%3a${personalPhoneNumber}&backcolor=%23ffffff`} alt={`QR Code`} width="60px" />
        <InputText setValue={setCompanyPhoneNumber} value={companyPhoneNumber && companyPhoneNumber?.length !== 0 ? companyPhoneNumber : "NA"} label={"Company phone number"} width="238px" />
        <img className="qr-code" src={`https://qrcode.tec-it.com/API/QRCode?data=tel%3a${companyPhoneNumber}&backcolor=%23ffffff`} alt={`QR Code`} width="60px" />
      </div>
      <div className="about">
        <InputTextArea setValue={setAbout} value={about ? about : "NA"} label={"About"} width="738px" />
      </div>
    </div>
  )
}

export default ReceivedData
