import type { Estado, Funcionario, Hospede, OrdemLimpeza, PaisIso, Quarto, Reserva, TipoDeQuarto } from './types'

const BASE_URL = 'http://localhost:3333'
const headers = { 'Content-Type': 'application/json' }

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, options)
  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || `${response.status} ${response.statusText}`)
  }
  return response.json()
}

export const api = {
  getHospedes: (): Promise<Hospede[]> => request('/hospede'),
  getHospedeById: (id: number): Promise<Hospede> => request(`/hospede/${id}`),
  
  // AQUI ESTÁ A SUA FUNÇÃO NO FRONT-END!
  // Ela busca todos os hóspedes e filtra no próprio navegador comparando o documento exato
  findHospedeByDoc: (doc: string): Promise<Hospede | null> => 
    request<Hospede[]>('/hospede')
      .then(hospedes => hospedes.find(h => h.cpfPassaporte === doc) || null)
      .catch((err) => {
        console.error("Erro ao buscar hóspedes para o filtro:", err);
        return null;
      }),
  
  // Intocados (Não são do seu módulo)
  getFuncionarios: (): Promise<Funcionario[]> => request('/funcionario'),
  getQuartos: (): Promise<Quarto[]> => request('/quarto'),
  getEstados: (): Promise<Estado[]> => request('/estado'),
  getPaises: (): Promise<PaisIso[]> => request('/pais'),
  
  getOrdensLimpezas: (): Promise<OrdemLimpeza[]> => request('/ordemlimpeza'),
  createOrdemLimpeza: (payload: Omit<OrdemLimpeza, 'id'>): Promise<OrdemLimpeza> => 
    request('/ordem-limpeza', { method: 'POST', headers, body: JSON.stringify(payload) }),
  
  // Retornando aos seus módulos
  createHospede: (payload: Omit<Hospede, 'id'>): Promise<Hospede> =>
    request('/hospede', { method: 'POST', headers, body: JSON.stringify(payload) }),
  updateHospede: (id: number, payload: Partial<Hospede>): Promise<Hospede> =>
    request(`/hospede/${id}`, { method: 'PUT', headers, body: JSON.stringify(payload) }),

  getTiposDeQuarto: (): Promise<TipoDeQuarto[]> => request('/tipo-de-quarto'),
  createTipo: (payload: Omit<TipoDeQuarto, 'id'>): Promise<TipoDeQuarto> =>
    request('/tipo-de-quarto', { method: 'POST', headers, body: JSON.stringify(payload) }),

  getReservas: (): Promise<Reserva[]> => request('/reserva'),
  createReserva: (payload: Omit<Reserva, 'id' | 'status'>): Promise<Reserva> =>
    request('/reserva', { method: 'POST', headers, body: JSON.stringify(payload) }),
    
  getReservasHospede: (hospedeId: number): Promise<Reserva[]> =>
    request(`/reserva/hospede/${hospedeId}`),
}