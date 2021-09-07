import { useState } from "react"

const useData = () => {
  const [loading, setLoading] = useState()

  const getData = async ({ url, cookie, userLinkedinUrl, isIndividualCrms, isIndividualPhoneNumbers }) => {
    setLoading(true)
    try {
      const response = await axios.post(`${process.env.REACT_APP_NODE_BACKEND_URL}/profile`, {
        profileLinkedinUrl: url,
        userLinkedinUrl,
        cookie,
        isIndividualCrms,
        isIndividualPhoneNumbers,
      })
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
