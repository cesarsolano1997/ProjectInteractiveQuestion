import Success from '../ui/Alerts/Success'
import { useSelector } from 'react-redux'

import Main from './Main'

export default function AppLayout({ children }) {
  const alert = useSelector((state) => state.alert.alert)
  const message = useSelector((state) => state.alert.message)

  return (
    <div>
      <Success status={alert} label={message} />
      <Main>{children}</Main>
    </div>
  )
}
