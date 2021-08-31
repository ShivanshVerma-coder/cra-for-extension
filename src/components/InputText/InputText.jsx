import React from "react"
import { ReactComponent as Copy } from "../../assets/Icons/copy.svg"
import "./InputText.scss"

const InputText = ({ className = "", setValue, value = "", copyField = true, label = "", width = "280px" }) => {
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <div className="input-box" style={{ width: width }}>
      {copyField && (
        <span>
          <Copy />
        </span>
      )}
      <label>{label}</label>
      <input
        style={{ width: width }}
        type="text"
        className={className}
        value={value}
        onChange={(e) => {
          if (setValue) {
            handleChange(e)
          }
        }}
      />
    </div>
  )
}

export default InputText
