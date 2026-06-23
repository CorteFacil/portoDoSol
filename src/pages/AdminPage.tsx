import { Link, useLocation } from 'wouter'
import styles from './Admin.module.css'
import { ReactNode } from 'react'

interface AdminProps {
  children: ReactNode
}

export default function AdminPage({ children }: AdminProps) {
  const [, setLocation] = useLocation()

  const handleLogout = () => {
    // Limpa o estado de login (ajuste a chave 'user' para o nome que você usa no seu App)
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Volta para o início do site
    setLocation('/')
  }

  return (
    <div className={styles.adminShell}>
      <div className={styles.adminGrid}>
        <aside className={styles.sidebar}>
          <div className={styles.menuSection}>
            <h3>Processos</h3>
            <Link className={styles.menuButton} to="/admin/ordem-limpeza">Ordem de Limpeza</Link>
            <Link className={styles.menuButton} to="/admin/estadia">Estadia</Link>
            <Link className={styles.menuButton} to="/admin/reservas">Reservas</Link>
          </div>

          <div className={styles.menuSection}>
            <h3>Cadastros Gerais</h3>
            <Link className={styles.menuButton} to="/admin/funcionario">Cadastro de funcionário</Link>
            <Link className={styles.menuButton} to="/admin/quarto">Cadastro de quarto</Link>
            <Link className={styles.menuButton} to="/admin/tipos-de-quarto">Cadastro de tipo de quarto</Link>
            <Link className={styles.menuButton} to="/admin/hospedes">Cadastro de hóspedes</Link>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f3f4f6' }}>
            <button 
              onClick={handleLogout}
              className={styles.menuButton} 
              style={{ color: '#ef4444', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Sair
            </button>
          </div>
        </aside>

        <section className={styles.contentArea}>
          {children}
        </section>
      </div>
    </div>
  )
}