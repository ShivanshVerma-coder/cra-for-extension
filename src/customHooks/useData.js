import { useState } from "react"

const useData = () => {
  const [cookie, setCookie] = useState()

  const getCookie = async () => {
    await chrome.cookies.get({ url: "https://www.linkedin.com", name: "li_at" }, function (cookie) {
      if (!cookie) {
        return setCookie(false)
      }
      setCookie(cookie.value)
    })
  }

  const getData = async (url, cookie) => {
    try {
      const response = await fetch("https://tagging-dot-apt-cubist-307713.ew.r.appspot.com/get_details", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ url, cookie }),
      })
      const body = await response.json()
      return body
    } catch (e) {
      return false
    }
  }

  return {
    getCookie,
    cookie,
    setCookie,
    getData,
  }
}

export default useData
