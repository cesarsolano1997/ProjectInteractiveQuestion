import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4002', {
  transports: ['websocket'],
  auth: { username: 'default' },
  autoConnect: false,
  // connected: false,
})

export default function useSocket(userName) {
  const [activeSocket, setActiveSocket] = useState(null)
  // const [sessionID, setSessionID] = useState(null)

  // socket.auth.username = userName

  socket.auth.username = userName

  useEffect(() => {
    socket.connect()
    socket.on('connect', () => {
      setActiveSocket(socket)
    })

    socket.connect()

    setActiveSocket(socket) //
    socket.on('session', ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID }
      // store it in the localStorage
      localStorage.setItem('sessionID', sessionID)

      // save the ID of the user
      socket.userID = userID
    })

    socket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        console.log(err.message)
      }
      console.log(err.message)
    })

    // socket.on('disconnect', )

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('message')
    }
  }, [socket, userName])

  return activeSocket
}
