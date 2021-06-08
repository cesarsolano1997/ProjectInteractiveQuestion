import UserIcon from '../../assets/svg/UserIcon'

export default function userPlaying({ userName }) {
  return (
    <div className="flex flex-col items-center">
      <img
        className="object-cover w-20 h-20 mb-2 rounded-full shadow"
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
        alt="Person"
      />
      <div className="flex flex-col items-center">
        <p className="text-lg font-bold">{userName}</p>
        <p className="text-sm text-gray-800">Conectado</p>
      </div>
    </div>
  )
}
