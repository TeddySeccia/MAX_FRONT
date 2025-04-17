import './contextBlock.css'
import { useUser } from "../../../../hooks/useUser"
const VITE_API_URL = import.meta.env.VITE_API_URL;


export default function ContextBlock() {
  const { user } = useUser()
  
  if (!user) return null

  return (
    
    <div className="context-block">
      <div className='icone'>
        <img src={VITE_API_URL+`/${user.userAvatarPath}`} alt="avatar user" />
      </div>
      <div className='context'>
        <h2><strong>DASHBOARD</strong></h2>
        <p>Bienvenue {user.userFName}</p>
      </div>
      <div className='icone'>

      </div>

    </div>
  )
}