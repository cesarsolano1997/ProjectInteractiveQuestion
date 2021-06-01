import { useState, useEffect } from 'react'

const useValidation = (stateInicial, validation, fn) => {
  const [values, saveValues] = useState(stateInicial)
  const [errors, saveErrors] = useState({})
  const [submitForm, saveSubmitForm] = useState(false)

  useEffect(() => {
    if (submitForm) {
      const notErrors = Object.keys(errors).length === 0

      if (notErrors) {
        fn() // Fn = funcion que se ejecuta en el componente
      }
      saveSubmitForm(false)
    }
  }, [errors])

  // Funcion que se ejecuta conforme el usuario escribe algo
  const handleChange = (e) => {
    saveErrors({})
    saveValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  // Funcion que se ejecuta cuando el usuario hace submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const errorsValidation = validation(values)
    saveErrors(errorsValidation)
    saveSubmitForm(true)
  }

  // cuando se reaiza el evento de blur
  const handleBlur = () => {
    const errorsValidation = validation(values)
    saveErrors(errorsValidation)
  }

  return {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  }
}

export default useValidation
