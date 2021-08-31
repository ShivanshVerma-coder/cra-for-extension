import React from "react"
import "./Button.scss"

const Button = ({ className = "", children, disabled = false, ...props }) => {
  return (
    <button className={`${className} ${disabled ? "disabled" : ""}`} {...props}>
      {children}
    </button>
  )
}

export default Button
