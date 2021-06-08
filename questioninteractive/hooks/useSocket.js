import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4002', {
  transports: ['websocket'],
  auth: { username: 'default' },
  autoConnect: false,
  reconnection: true,
  // connected: false,
})

const useSocket = (idClassroom) => {
  const [activeSocket, setActiveSocket] = useState(null)
  const [usersActive, setUserActive] = useState([])

  useEffect(() => {
    const sessionID = localStorage.getItem('sessionID')
    const userName = localStorage.getItem('name')

    // console.log(idClassroom)
    if (idClassroom) {
      // console.log(idClassroom)
      if (sessionID) {
        socket.auth = { sessionID, idClassroom }
        console.log(socket.auth)
        socket.connect()
        setActiveSocket(socket)
      } else {
        if (userName) {
          socket.auth = { userName, idClassroom }
          socket.connect()
          setActiveSocket(socket)
        }
      }
    }
  }, [idClassroom])

  useEffect(() => {
    if (activeSocket) {
      socket.on('session', ({ sessionID, userID }) => {
        socket.auth = { sessionID }
        localStorage.setItem('sessionID', sessionID)
        socket.userID = userID
      })

      socket.on('users', (users) => {
        setUserActive(users)
      })

      socket.on('newUser', (user) => {
        console.log(user)
        setUserActive((prev) => prev.concat(user))
      })

      socket.on('userDisconnect', (userID) => {
        setUserActive((users) => users.filter((user) => user.userID !== userID))
      })

      socket.emit('joinRooms', idClassroom)
    }
  }, [activeSocket])

  return [activeSocket, usersActive]
}

export default useSocket
