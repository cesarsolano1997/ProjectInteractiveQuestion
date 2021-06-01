import { useState, useEffect } from 'react'
import useSocket from '../../hooks/useSocket'
import { useRouter } from 'next/router'

import { GetLocalStorage } from '../../utils/LocalStorage'

export default function RoomPlaying() {
  const [userSession, setUserSession] = useState([])

  const nameUser = GetLocalStorage('name')

  const router = useRouter()
  const {
    query: { id },
  } = router

  const socket = useSocket(nameUser)

  useEffect(() => {
    if (!nameUser) router.push('/')

    return () => {
      localStorage.removeItem('name')
      localStorage.removeItem('sessionID')
    }
  }, [])

  useEffect(() => {
    if (socket) {
      if (id) {
        socket.emit('joinRooms', id)

        socket.on('newUser', (users) => {
          console.log(users)
          setUserSession(users.map((user) => user.username))
        })

        socket.on('user disconnected', (username) =>
          alert(username + ' desconectado')
        )
      }
    }
    // return () => {
    //   localStorage.removeItem('name')
    //   localStorage.removeItem('sessionID')
    // }
  }, [socket])

  useEffect(() => {
    // if (id) {
    //   socket.emit('joinRooms', id)
    //   socket.on('newUser', (users) => {
    //     console.log(users)
    //     setUserSession(users.map((user) => user.username))
    //   })
    // }
  }, [id])

  return (
    <div>
      {userSession.map((user, index) => (
        <p key={index}>Bienvenido nuevo usuario : {user}</p>
      ))}
    </div>
  )
}
