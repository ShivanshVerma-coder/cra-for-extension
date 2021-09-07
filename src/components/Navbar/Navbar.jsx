import React from "react"
import { ReactComponent as RingoverSVG } from "../../assets/Icons/ringover.svg"
import { ReactComponent as CrossSVG } from "../../assets/Icons/cross.svg"
import { ReactComponent as PeopleSVG } from "../../assets/Icons/people.svg"
import "./Navbar.scss"

const Navbar = ({ showUserLimit = true, personalData }) => {
  return (
    <div className="navbar">
      <div className="ringover">
        <RingoverSVG /> ringover
      </div>
      {showUserLimit && (
        <div className="user-limit">
          <PeopleSVG /> {personalData.scrapings}/{personalData.max_scrapings}
        </div>
      )}
      <div
        className="cross"
        onClick={() => {
          window.close()
        }}
      >
        <CrossSVG />
      </div>
    </div>
  )
}

export default Navbar
