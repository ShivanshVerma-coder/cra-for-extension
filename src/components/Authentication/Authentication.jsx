import React, { useState } from "react"
import Button from "../Button/Button"
import "./Authentication.scss"

const Authentication = ({ setStage, cookie }) => {
  console.log("cookie", cookie)
  const [isLoading, setIsLoading] = useState(false)
  const handleAuthenticate = () => {
    setIsLoading(true)
    //API request
    setIsLoading(false)
    setStage(2)
  }
  return (
    <div className="authentication-page">
      {cookie ? <div>Authenticate your LinkedIn account</div> : <div>Please login to LinkedIn to continue</div>}
      {cookie ? (
        <Button
          onClick={() => {
            handleAuthenticate()
          }}
        >
          Authenticate
        </Button>
      ) : (
        <Button disabled={true}>Authenticate</Button>
      )}
    </div>
  )
}

export default Authentication
