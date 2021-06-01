import { useEffect, useState } from 'react'
import socket from 'socket.io-client'

const serverUrl = 'http://localhost:4002'

export default function useSocket(userName) {
  const [isConnected, setConnected] = useState(false)

  useEffect(() => {
    const client = socket.connect(serverUrl, {
      transports: ['websocket'],
      auth: { username: userName },
    })
    client.on('connect', () => setConnected(true))
    client.on('disconnect', () => setConnected(false))
    client.on('session', ({ sessionID, userID }) => {
      console.log('sessionID', sessionID)
      console.log('userID', userID)
    })
  }, [serverUrl, userName, isConnected])

  return { isConnected }
}
