import React from 'react'

export default function Navbar({user}) {
  return (
    <div>
      <img src={user.avatar} />
      <h1>Welcome {user.email}</h1>
      <button>Change User</button>
    </div>
  )
}
