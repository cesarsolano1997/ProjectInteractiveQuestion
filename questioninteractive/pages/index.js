import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import HttpClient from '../services'

import Modal from '../components/Modal'

export default function Home() {
  const router = useRouter()

  const [code, setCode] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    localStorage.removeItem('name')
    localStorage.removeItem('sessionID')
  }, [])

  const handleChange = (e) => {
    const valu = e.target.value

    if (!Number(valu) && valu.length > 0) {
      return
    }

    setCode(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    HttpClient.get(`/classroom/${code}`, {})
      .then((resp) => setOpenModal(true))
      .catch((resp) => alert(resp.response.data.message))
  }

  const loginSession = () => {
    localStorage.setItem('name', name)
    router.push(`playing/${code}`)
  }

  return (
    <form>
      <div className="flex flex-col p-0 text-center mobile:m-0 mobile:p-5 h-screen justify-center justify-items-center items-center  bg-gradient-to-r from-indigo-50 to-indigo-100">
        <p className="text-5xl mobile:text-6xl mobile:leading-tight font-semibold m-2 text-indigo-600">
          Ingrese el código de la reunión
        </p>
        <input
          type="text"
          className="text-2xl text-center w-3/6 h-10 m-2 border-2 border-gray-200 border-solid mobile:w-full rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder=""
          value={code}
          onChange={handleChange}
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="m-2 block w-1/6 mobile:w-3/6  px-6 py-2 font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={code.length === 0}
        >
          ¡Unirse!
        </button>
      </div>

      <Modal
        header={'Listo para unirse a la sesión ' + code}
        openModal={openModal}
        setOpenModal={setOpenModal}
        action={loginSession}
      >
        <p className="m-2">Escribe tu nombre</p>
        <input
          type="text"
          className="m-2 block w-4/6 mobile:h-10 px-6 font-medium border border-solid border-gray-300 rounded hover:border-gray-500 focus:outline-none focus:border-blue-500 transition-colors mobile:w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    </form>
  )
}
