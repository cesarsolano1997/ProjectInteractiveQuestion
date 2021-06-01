export function SubmitButton({ label }) {
  return (
    <button
      type="submit"
      className=" focus:outline-none px-3 bg-blue-700 p-3 ml-3 rounded-lg text-white hover:bg-blue-600 m-2"
    >
      {label}
    </button>
  )
}

export function CancelButton({ label }) {
  return (
    <button
      className="focus:outline-none modal-close px-3 bg-gray-200 p-3 rounded-lg text-black hover:bg-gray-300 m-2"
      type="button"
    >
      {label}
    </button>
  )
}
