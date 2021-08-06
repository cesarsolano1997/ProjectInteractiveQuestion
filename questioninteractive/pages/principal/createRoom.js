import AppLayout from '../../components/AppLayout'
import { CancelButton, SubmitButton } from '../../ui/Button'
import Datetime from '../../ui/Inputs/Datetime'
import InputText from '../../ui/Inputs/InputText'

import HttpClient from '../../services'

import useValidation from '../../hooks/useValidation'
import validationCreateRoom from '../../validation/principal/validationCreateRoom'

import moment from 'moment'

const STATE_INITIAL = {
  nameClass: '',
  hour: '',
}

export default function createRoom() {
  const submitCreateRoom = () => {
    HttpClient.post('/classroom', {
      nameClass,
      hour,
    }).then()

    // dispatch(showAlert(true))
  }

  const { values, errors, handleSubmit, handleChange } = useValidation(
    STATE_INITIAL,
    validationCreateRoom,
    submitCreateRoom
  )

  const { nameClass, hour } = values

  return (
    <AppLayout>
      <div className="bg-gray-50 h-32 flex flex-wrap justify-center content-center w-full flex-col mx-2 lg:mx-0 ">
        <h1 className="text-5xl text-center">Crea tu propia sala</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mx-2 mt-10 lg:mx-96">
          <InputText
            name="nameClass"
            label="Nombre de la clase"
            value={nameClass}
            handleChange={handleChange}
            error={errors.nameClass && errors.nameClass}
          />
          <Datetime
            name="hour"
            label="Fecha y hora de inicio"
            value={hour}
            handleChange={handleChange}
            error={errors.hour && errors.hour}
            min={moment().format().substring(0, 16)}
            max={null}
          />
          <div className="flex justify-end">
            <SubmitButton label="Crear sala" />
            <CancelButton label="Cancelar" />
          </div>
        </div>
      </form>
    </AppLayout>
  )
}
