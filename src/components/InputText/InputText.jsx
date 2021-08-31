import React from "react"
import { ReactComponent as Copy } from "../../assets/Icons/copy.svg"
import "./InputText.scss"

const InputText = ({ className = "", setValue, value = "", copyField = true, label = "", width = "280px", ...props }) => {
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(value)
  }
  return (
    <div className="input-box" style={{ width: width }}>
      {copyField && (
        <span
          onClick={() => {
            handleCopy()
          }}
        >
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
        {...props}
      />
    </div>
  )
}

export default InputText
