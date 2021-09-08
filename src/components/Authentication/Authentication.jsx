import React from "react"
import { PERSONAL_DATA, SCRAPED_DATA } from "../../customHooks/constants"
import useUser from "../../customHooks/useUser"
import Button from "../Button/Button"
import "./Authentication.scss"

const Authentication = ({ setStage, cookie, setPersonalData }) => {
  const { loading, register } = useUser()

  const handleAuthenticate = async (cookie) => {
    const res = await register(cookie)
    if (res.msg === "Registered user successfully") {
      await setPersonalData(res.data)
      localStorage.removeItem(SCRAPED_DATA)
      await setStage(2)
    }
  }

  return (
    <div className="authentication-page">
      {cookie ? <div>Authenticate your LinkedIn account</div> : <div>Please login to LinkedIn to continue</div>}
      {cookie ? (
        <Button
          onClick={() => {
            handleAuthenticate(cookie)
          }}
        >
          {!loading ? "Authenticate" : "Authenticating"}
        </Button>
      ) : (
        <Button disabled={true}>Authenticate</Button>
      )}
    </div>
  )
}

export default Authentication
