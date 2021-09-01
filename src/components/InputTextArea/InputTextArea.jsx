import React from "react"
import { ReactComponent as Copy } from "../../assets/Icons/copy.svg"
import "./InputTextArea.scss"

const InputTextArea = ({ className = "", setValue, value = "", copyField = true, label = "", width = "280px", height = "70px", ...props }) => {
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(value)
  }
  return (
    <div className="input-textarea-box" style={{ width: width }}>
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
      <textarea
        style={{ width: width, height: height }}
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

export default InputTextArea
