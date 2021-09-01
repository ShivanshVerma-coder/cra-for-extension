import React, { useState } from "react"
import "./ReceivedData.scss"
import { ReactComponent as ArrowLeft } from "../../assets/Icons/arrowLeft.svg"
import InputText from "../InputText/InputText"
import { ReactComponent as QRCode } from "../../assets/Icons/qr.svg"
import InputTextArea from "../InputTextArea/InputTextArea"

const ReceivedData = ({ userData, setStage }) => {
  const [firstName, setFirstName] = useState(userData["Name"].split(" ")[0])
  const [lastName, setLastName] = useState(userData["Name"].substr(userData["Name"].indexOf(" ") + 1, userData["Name"].length))
  const [fullName, setFullName] = useState(userData["Name"])
  const [companyName, setCompanyName] = useState(userData["Company Name"])
  const [companyURL, setCompanyURL] = useState(userData["Company Website URL"])
  const [companySize, setCompanySize] = useState(userData["Company size"])
  const [location, setLocation] = useState(userData["Location"])
  const [city, setCity] = useState()
  const [headquarters, setHeadquarters] = useState(userData["Company Headquarters"])
  const [size, setSize] = useState()
  const [CRM, setCRM] = useState(userData["CRM"])
  const [mutualConnectionsInCompany, setMutualConnectionsInCompany] = useState()
  const [personalPhoneNumber, setPersonalPhoneNumber] = useState()
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState()
  const [about, setAbout] = useState(userData["Company Description"])

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
      label: "Company size",
      value: companySize,
      setValue: setCompanySize,
    },
    {
      label: "Location",
      value: location,
      setValue: setLocation,
    },
    {
      label: "City",
      value: city,
      setValue: setCity,
    },
    {
      label: "Headquarters",
      value: headquarters,
      setValue: setHeadquarters,
    },
    {
      label: "Size",
      value: size,
      setValue: setSize,
    },
    {
      label: "CRM",
      value: CRM,
      setValue: setCRM,
    },
    {
      label: "Mutual connections in the company",
      value: mutualConnectionsInCompany,
      setValue: setMutualConnectionsInCompany,
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
          return <InputText key={index} setValue={setValue} value={value ? value : "NA"} label={label} width="238px" />
        })}
      </div>
      <div className="phone-details">
        <InputText setValue={setPersonalPhoneNumber} value={personalPhoneNumber ? personalPhoneNumber : "NA"} label={"Personal phone number"} width="238px" />
        <QRCode />
        <InputText setValue={setCompanyPhoneNumber} value={companyPhoneNumber ? companyPhoneNumber : "NA"} label={"Company phone number"} width="238px" />
        <QRCode />
      </div>
      <div className="about">
        <InputTextArea setValue={setAbout} value={about ? about : "NA"} label={"About"} width="738px" />
      </div>
    </div>
  )
}

export default ReceivedData
