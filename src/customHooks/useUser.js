//check if exist
//register
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "./constants"

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
      let url = `${BACKEND_URL}/users/${cookie}`
      const response = await axios.get(url)
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
    }
  }

  const register = async (cookie) => {
    setLoading(true)
    setMessage(" ")
    console.log(cookie)
    try {
      let url = `${BACKEND_URL}/users`
      const response = await axios.post(url, {
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
