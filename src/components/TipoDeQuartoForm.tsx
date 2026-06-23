import { FormEvent, useState } from 'react'

interface TipoDeQuartoFormProp {
  onSubmit: (data: {
    nome: string
    descricao: string
    precoDiaria: number
    capacidadeMax: number
    tipoCama: string
    tamanho: number
  }) => void
}

export default function TipoDeQuartoForm({ onSubmit }: TipoDeQuartoFormProp) {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [precoDiaria, setPrecoDiaria] = useState('')
  const [capacidadeMax, setCapacidadeMax] = useState('')
  const [tipoCama, setTipoCama] = useState('')
  const [tamanho, setTamanho] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({
      nome,
      descricao,
      precoDiaria: Number(precoDiaria),
      capacidadeMax: Number(capacidadeMax),
      tipoCama,
      tamanho: Number(tamanho),
    })
  }

  return (
    <form className="container bg-light p-4" onSubmit={handleSubmit}>
        <label htmlFor="" className="form-label mb-3"><h2>Cadastro de Tipo Quarto</h2></label>
        <div className="row g-3 bg-secondary bg-opacity-10">
            <div className="col-md-12">
                <label htmlFor="descricao" className="form-label">Descrição</label>
                <br />
                <textarea value={descricao} onChange={(e) => setNome(e.target.value)} required name="descricao" id="descricao" cols={25} rows={5} className="form-control"></textarea>
            </div>
              <div className="col-md-6">
                  <label htmlFor="preco" className="form-label">Preço</label>
                  <div className="border rounded">
                      <div className="d-flex bg-light align-items-center border-bottom">
                          <span className="input-group-text">R$</span>
                          <input
                              value={precoDiaria}
                              onChange={(e) => setPrecoDiaria(e.target.value)}
                              type="text"
                              name="preco"
                              id="preco"
                              className="form-control"
                              placeholder="0,00"/>
                          <span className="input-group-text">/dia</span>
                      </div>
                  </div>
              </div>
              <div className="col-md-6">
                  <label htmlFor="capacidade-max" className="form-label">Capacidade Máxima</label>
                  <div className="border rounded">
                      <div className="d-flex align-items-center border-bottom">
                          <input
                              value={capacidadeMax}
                              onChange={(e) => setCapacidadeMax(e.target.value)}
                              type="number"
                              name="capacidade-max"
                              id="capacidade-max"
                              className="form-control"
                              min="1"
                          />
                      <span className="input-group-text">/pessoa</span>
                      </div>
                </div>
                </div>
            <div className="col-md-8">
                <label className="form-label">Tipo de Cama</label>
                <select name="tipo-cama" id="tipo-cama" className="form-select">
                    <option value="" >Selecione</option>
                </select>
            </div>
                <div className="col-md-4">
                <label className="form-label">Tamanho</label>
                <div className="input-group">
                    <input value={tamanho} onChange={(e) => setTamanho(e.target.value)} type="text" name="tipo-cama" id="tipo-cama" className="form-control"/>
                    <span className="input-group-text">m^2</span>
                </div>
            </div>
            <div className="col mb-3">
            <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-dark" type="submit">Salvar</button>
                <button className="btn btn-dark" type="submit">Cancelar</button>
            </div>
        </div>
        </div>
    </form>
  )
}
