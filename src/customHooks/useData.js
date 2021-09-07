import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "./constants"

const useData = () => {
  const [loading, setLoading] = useState()

  const getData = async ({ url, cookie, userLinkedinUrl, isIndividualCrms, isIndividualPhoneNumbers }) => {
    setLoading(true)
    const data = { profileLinkedinUrl: url, userLinkedinUrl, cookie, isIndividualCrms, isIndividualPhoneNumbers }
    console.log(data)
    try {
      const response = await axios.post(`${BACKEND_URL}/profiles`, data)
      const body = await response.data
      console.log(body)
      setLoading(false)
      if (response.status === 200) {
        return body
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
      return false
    }
  }

  return { loading, getData }
}

export default useData
