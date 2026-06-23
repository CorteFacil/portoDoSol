export interface Estado {
  id: number
  nomeEstado: string
  siglaUf: string
  regiaoGeografica?: string
}

export interface PaisIso {
  id: number
  nome: string
  sigla_iso2: string
  sigla_iso3: string
  ddi_telefone: number
}

export interface Hospede {
  id: number
  nome: string
  cpfPassaporte: string
  email: string
  telefone: string
  nascimento: string
  estadoId: number
  estado?: Estado
  criadoEm?: string
  atualizadoEm?: string
}

export interface TipoDeQuarto {
  id: number
  nome: string
  descricao: string
  precoDiaria: number
  capacidadeMax: number
  tipoCama: string
  tamanho: string
}

export interface Reserva {
  id: number
  entradaAcomodacao: string
  saidaAcomodacao: string
  numeroPessoas: number
  observacao?: string
  status: number
  hospedeId: number
  tipoDeQuartoId: number
  hospede?: Hospede
  tipoDeQuarto?: TipoDeQuarto
  criadoEm?: string
  atualizadoEm?: string
}

export interface Quarto {
  id: number
  numero: string
  andar: number
  tipoDeQuartoId: number
  tipoDeQuarto?: TipoDeQuarto
}

export interface Funcionario {
  id: number
  nome: string
  email: string
  telefone: string
  cargo: string
  salario: number
}

export interface OrdemLimpeza {
  id: number
  dataLimpeza: string
  horaLimpeza: string
  quartoId: number
  status: number
}
