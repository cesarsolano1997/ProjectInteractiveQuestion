export default function validationCreateRoom(values) {
  const errors = {}

  if (!values.nameClass) {
    errors.nameClass = 'El nombre de la clase es obligatorio'
  }

  if (!values.hour) {
    errors.hour = 'Debe escoger un horario'
  }

  return errors
}
