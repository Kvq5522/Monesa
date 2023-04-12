import React, { useState } from "react";

var classNames = require('classnames');

export default function MyPill({head, body}) {
  const [activePill, setActivePill] = useState(0)
  
  return (
    <>
      <ul className="nav nav-tabs">
        {head.map((myHead, index) => {
          return (
            <li className="nav-item" key={myHead + '-' + index}>
              <a className={classNames('nav-link', index == activePill ? 'active' : '')} onClick={(e) => {e.preventDefault; setActivePill(index)}}>{myHead}</a>
            </li>
          )
        })}
      </ul>
      <div className="tab-content">
        {body.map((myBody, index) => {
          return (
            <div className={classNames('tab-pane fade', index == activePill ? 'active show': '')} key={myBody + '-' + index}>
              {myBody}
            </div>
          )
        })}
      </div>
    </>
  )
}