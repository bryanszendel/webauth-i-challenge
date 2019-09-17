import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth'

export default function UserList() {

  const [userList, setUserList] = useState([])

  useEffect(() => {
    axiosWithAuth()
      .get('http://localhost:7000/api/users')
      .then(users => {
        setUserList(users)
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [userList])


  return (
    <div>
      <p>Here's some stuff</p>
      {userList && userList.map(user => {
          return <p>{user.username}</p>
        })}
    </div>
  )
}