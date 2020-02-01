import React from 'react'
import "./Navbar.css"

export default function Navbar({user, handleClick}) {
  return (
    <div className="navBar">
      <img src={user.avatar} />
      <h1>Welcome {user.email}</h1>
      <button onClick={() => handleClick()}>Change User</button>
    </div>
  )
}

