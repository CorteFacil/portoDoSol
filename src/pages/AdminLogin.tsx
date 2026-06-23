import { useEffect } from 'react'
import { useLocation } from 'wouter'

export default function AdminLogin() {
  const [, setLocation] = useLocation()

  useEffect(() => {
    // Redireciona automaticamente para a área do funcionário
    setLocation('/admin')
  }, [setLocation])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Redirecionando para a área do funcionário...</p>
    </div>
  )
}
