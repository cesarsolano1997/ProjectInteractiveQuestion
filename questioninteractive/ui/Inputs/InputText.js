export default function InputText({ name, label, value, handleChange, error }) {
  return (
    <>
      <label className="m-2 text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        className="m-2 block w-full h-9 bg-gray-50 bg-opacity-50 focus:bg-white mobile:h-10 px-6 font-medium border border-solid border-gray-300 rounded hover:border-gray-500 focus:outline-none focus:ring-2 focus:border-blue-500 transition-colors mobile:w-full"
        value={value}
        onChange={handleChange}
      />
      {error && <label className="m-2 text-red-400">{error}</label>}
    </>
  )
}
