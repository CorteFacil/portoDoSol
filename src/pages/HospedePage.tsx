import { useEffect, useState } from 'react'
import { api } from '../api'
import type { PaisIso, Estado, Hospede } from '../types'
import HospedeForm from '../components/HospedeForm'
import styles from './Page.module.css'

export default function HospedePage() {
  const [estados, setEstados] = useState<Estado[]>([])
  const [paises, setPais] = useState<PaisIso[]>([])
  const [hospedes, setHospedes] = useState<Hospede[]>([])
  const [feedback, setFeedback] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    loadHospedes()
  }, [])

  async function loadHospedes() {
    try {
      const [loadedEstados, loadedPaises, loadedHospedes] = await Promise.all([
        api.getEstados(),
        api.getPaises(),
        api.getHospedes(),
      ])
      setEstados(loadedEstados)
      setHospedes(loadedHospedes)
      setPais(loadedPaises)
    } catch (err) {
      setError(`Erro ao carregar hóspedes: ${(err as Error).message}`)
    }
  }

  async function handleCreateHospede(data: Omit<Hospede, 'id'>) {
    try {
      const created = await api.createHospede(data)
      setHospedes((prev) => [...prev, created])
      setFeedback('Hóspede cadastrado com sucesso.')
      setError('')
    } catch (err) {
      setError(`Erro ao salvar hóspede: ${(err as Error).message}`)
      setFeedback('')
    }
  }

  return (
    <body className="d-flex flex-column min-vh-100 bg-dark-subtle">
      <h1>Hóspedes</h1>
      <p>Cadastre novos hóspedes e veja os registros recentes do backend.</p>

      {feedback && <div className={styles.feedback}>{feedback}</div>}
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.pageGrid}>
        <HospedeForm estados={estados} paises={paises} onSubmit={handleCreateHospede} onCancel={function (): void {
          throw new Error('Function not implemented.')
        } } />
        
        <section className='bg-light p-4'>
          <h2>Últimos hóspedes</h2>
          <ul>
            {hospedes.length === 0 ? (
              <li>Nenhum hóspede encontrado.</li>
            ) : (
              hospedes.slice(-10).map((hospede) => (
                <li key={hospede.id}>
                  {hospede.nome} • {hospede.email}
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </body>
  )
}
