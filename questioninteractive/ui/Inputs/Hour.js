export default function Hour({ name, label, value, handleChange, error }) {
  return (
    <>
      <div className="flex flex-col m-2">
        <label className="text-gray-700"> {label}</label>
        <input
          type="time"
          name={name}
          className="appearance-none border border-gray-300 w-1/6 py-2 px-4 bg-gray-50 focus:bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:border-blue-500 focus:border-transparent flex-1"
          value={value}
          onChange={handleChange}
        />
        {error && <label className="m-2 text-red-400">{error}</label>}
      </div>
    </>
  )
}
