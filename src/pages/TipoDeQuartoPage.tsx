import { useEffect, useState } from 'react'
import { api } from '../api'
import type { TipoDeQuarto } from '../types'
import TipoDeQuartoForm from '../components/TipoDeQuartoForm'
import styles from './Page.module.css'

export default function TipoDeQuartoPage() {
  const [tipos, setTipos] = useState<TipoDeQuarto[]>([])
  const [feedback, setFeedback] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    loadTipos()
  }, [])

  async function loadTipos() {
    try {
      const loadedTipos = await api.getTipos()
      setTipos(loadedTipos)
    } catch (err) {
      setError(`Erro ao carregar tipos de quarto: ${(err as Error).message}`)
    }
  }

  async function handleCreateTipo(data: Omit<TipoDeQuarto, 'id'>) {
    try {
      const created = await api.createTipo(data)
      setTipos((prev) => [...prev, created])
      setFeedback('Tipo de quarto cadastrado com sucesso.')
      setError('')
    } catch (err) {
      setError(`Erro ao salvar tipo de quarto: ${(err as Error).message}`)
      setFeedback('')
    }
  }

  return (
    <body className='d-flex flex-column min-vh-100 bg-dark-subtle'>
      <h1>Tipos de Quarto</h1>
      <p>Cadastre tipos de quarto e veja os registros salvos no backend.</p>

      {feedback && <div className={styles.feedback}>{feedback}</div>}
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.pageGrid}>
        <TipoDeQuartoForm onSubmit={handleCreateTipo} />

        <section className={styles.listCard}>
          <h2>Últimos tipos de quarto</h2>
          <ul>
            {tipos.length === 0 ? (
              <li>Nenhum tipo de quarto encontrado.</li>
            ) : (
              tipos.slice(-10).map((tipo) => (
                <li key={tipo.id}>
                  {tipo.nome} • R$ {tipo.precoDiaria}
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </body>
  )
}
