//check if exist
//register
import { useState } from "react"
import axios from "axios"
const useUser = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const [cookie, setCookie] = useState()

  const getCookie = async () => {
    await chrome.cookies.get({ url: "https://www.linkedin.com", name: "li_at" }, function (cookie) {
      if (!cookie) {
        setCookie(false)
      }
      setCookie(cookie.value)
    })
  }

  const authenticate = async (cookie) => {
    setLoading(true)
    setMessage(" ")
    try {
      const response = await axios.get(`${process.env.REACT_APP_NODE_BACKEND_URL}/users/:${cookie}`)
      const body = await response.data
      setLoading(false)
      console.log(body)
      if (response.status === 200) {
        return body
      }
      if (response.status === 404) {
        return {}
      }
    } catch (err) {
      console.log(err)
      setMessage(err.message)
    }
  }

  const register = async (cookie) => {
    setLoading(true)
    setMessage(" ")
    try {
      const response = await axios.post(`${process.env.REACT_APP_NODE_BACKEND_URL}/users`, {
        cookie,
      })
      const body = await response.data
      setLoading(false)
      console.log(body)
      if (response.status === 201) {
        return body
      }
    } catch (err) {
      console.log(err)
      return {}
    }
  }

  return { loading, cookie, setCookie, getCookie, message, setMessage, authenticate, register }
}

export default useUser
