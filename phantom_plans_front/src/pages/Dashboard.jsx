import React from 'react'


export default function Dashboard({user}) {

  return (
    <div>
      <h1>Dashboard</h1>
      <button>Log Out</button>
      <p>Hello</p>
      <p>{user.username}</p>
      <p>{user.id}</p>
    </div>
  )
}
