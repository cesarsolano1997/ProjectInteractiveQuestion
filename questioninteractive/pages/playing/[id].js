import useSocket from '../../hooks/useSocket'
import { useRouter } from 'next/router'
import UserPlaying from '../../components/users/UserPlaying'

export default function RoomPlaying() {
  // const nameUser = GetLocalStorage('name')

  const router = useRouter()
  const {
    query: { id },
  } = router

  const [activeSocket, usersActive] = useSocket(id)

  // useEffect(() => {
  //   if (usersActive) {
  //     console.log('usersActive', usersActive)
  //   }
  // }, [usersActive])

  // useEffect(() => {
  //   // if (!nameUser) router.push('/')
  //   // return () => {
  //   //   localStorage.removeItem('name')
  //   //   localStorage.removeItem('sessionID')
  //   // }
  // })

  // useEffect(() => {
  //   // console.log(socket)
  //   if (socket) {
  //     if (id) {
  //       socket.emit('joinRooms', id)

  //       // socket.on('newUser', (users) => {
  //       //   console.log(users)
  //       //   setUserSession(users.map((user) => user.username))
  //       // })

  //       // socket.on('user disconnected', (username) =>
  //       //   alert(username + ' desconectado')
  //       // )
  //     }

  //     console.log('lista usuarios')
  //     socket.on('list user', (user) => {
  //       console.log(user)
  //       setUserSession([...userSession, user])
  //     })
  //   }
  // }, [socket, id])

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('user connected', (user) => {
  //       console.log(user)
  //       setUserSession([...userSession, user])
  //     })
  //   }
  // }, [socket])
  return (
    <div
      className="w-full-screen h-screen"
      style={{
        background:
          'linear-gradient(90deg, rgba(115,108,236,1) 0%, rgba(130,121,194,1) 3%, rgba(179,157,219,1) 44%, rgba(167,211,231,1) 73%, rgba(0,212,255,1) 100%)',
      }}
    >
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="mx-auto mb-10 lg:max-w-xl sm:text-center">
          <p className="inline-block px-3 py-px mb-4 text-xl font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400 text-center">
            Bienvenido a la sala de espera
          </p>
          <p className="text-base text-gray-700 md:text-lg">
            Aquí podrás ver a todos los participantes mientras el Host empieza
            las preguntas.
          </p>
        </div>
        <div className="grid gap-10 row-gap-8 mx-auto mt-10 sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3">
          {usersActive &&
            usersActive.length > 0 &&
            usersActive.map((user, index) => (
              <UserPlaying key={index} userName={user.username} />
            ))}
        </div>
      </div>
    </div>
  )
}
