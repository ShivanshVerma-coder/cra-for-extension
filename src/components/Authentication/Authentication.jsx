import React from "react"

const Authentication = ({ setStage, cookie }) => {
  console.log("cookie", cookie)
  return (
    <>
      {cookie ? (
        <>
          Authentication
          <button
            onClick={() => {
              setStage(2)
            }}
          >
            Authenticate
          </button>
        </>
      ) : (
        "Please Login To your LinkedIn"
      )}
    </>
  )
}

export default Authentication
