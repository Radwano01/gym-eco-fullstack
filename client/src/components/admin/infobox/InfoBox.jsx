import React from 'react'
import "./infobox.scss"

const InfoBox = ({title, count, icon}) => {
  return (
    <div className="info-box">
      <div className="card-box">
        <h4>{title}</h4>
        <span>
          <h3>{count}</h3>
          {icon}
        </span>
      </div>
    </div>
  )
}

export default InfoBox