import { useState, useEffect, type SyntheticEvent } from 'react'

interface TipoDeQuarto { id: number; nome: string }

interface ReservaFormProps {
  tipos: TipoDeQuarto[]
  hospedeId: number
  error?: string 
  reservaEditando?: any // <-- NOVA PROP OPCIONAL (Não quebra outras páginas)
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function ReservaForm({ tipos, hospedeId, error, reservaEditando, onSubmit, onCancel }: ReservaFormProps) {
  const [entradaAcomodacao, setEntradaAcomodacao] = useState('')
  const [saidaAcomodacao, setSaidaAcomodacao] = useState('')
  const [numeroPessoas, setNumeroPessoas] = useState('1')
  const [observacao, setObservacao] = useState('')
  const [tipoDeQuartoId, setTipoDeQuartoId] = useState('')

  // NOVO: Monitora se tem reserva para editar e preenche os campos
  useEffect(() => {
    if (reservaEditando) {
      // Extrai apenas a parte da data "YYYY-MM-DD" para o input funcionar
      const formatData = (dataStr: string) => dataStr ? dataStr.split('T')[0] : '';
      
      setEntradaAcomodacao(formatData(reservaEditando.entradaAcomodacao));
      setSaidaAcomodacao(formatData(reservaEditando.saidaAcomodacao));
      setNumeroPessoas(String(reservaEditando.numeroPessoas));
      setObservacao(reservaEditando.observacao || '');
      setTipoDeQuartoId(String(reservaEditando.tipoDeQuartoId));
    } else {
      // Limpa os campos se for uma reserva nova
      setEntradaAcomodacao('');
      setSaidaAcomodacao('');
      setNumeroPessoas('1');
      setObservacao('');
      setTipoDeQuartoId('');
    }
  }, [reservaEditando]);

  const getErro = (inclui: string[], exclui: string[] = []) => {
    if (!error) return null;
    const sentencas = error.match(/[^.!?]+[.!?]+/g) || [error];
    const encontradas = sentencas.filter(s => 
      inclui.some(p => s.toLowerCase().includes(p.toLowerCase())) &&
      !exclui.some(e => s.toLowerCase().includes(e.toLowerCase()))
    );
    return encontradas.length > 0 ? encontradas.join(' ').trim() : null;
  };

  const erroEntrada = getErro(['Entrada', 'data', 'reserva']);
  const erroSaida = getErro(['Saída', 'Saida']);
  const erroQuarto = getErro(['Quarto'], ['capacidade', 'pessoas']);
  const erroPessoas = getErro(['Pessoas', 'capacidade']);
  const erroObs = getErro(['Observação', 'Observacao']);

  const sentencas = error ? (error.match(/[^.!?]+[.!?]+/g) || [error]) : [];
  const errosUsados = [erroEntrada, erroSaida, erroQuarto, erroPessoas, erroObs].filter(Boolean).join(' ');
  const erroGeral = sentencas.filter(s => !errosUsados.includes(s.trim())).join(' ').trim();

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({
      entradaAcomodacao, saidaAcomodacao, numeroPessoas: Number(numeroPessoas),
      observacao, hospedeId, tipoDeQuartoId: Number(tipoDeQuartoId),
    })
  }

  return (
    <form className="w-full bg-white p-6 rounded-xl shadow-lg border border-[#EF9B1B]/20" onSubmit={handleSubmit}>
      {/* Título dinâmico */}
      <h3 className="text-xl font-admin font-bold mb-4 text-[#EF9B1B]">
        {reservaEditando ? 'Editar Reserva' : 'Nova Reserva'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        <div className="space-y-1">
            <label className="text-xs font-medium uppercase tracking-wider text-[#222020]">Entrada</label>
            <input value={entradaAcomodacao} onChange={(e) => setEntradaAcomodacao(e.target.value)} required type="date" 
              className={`w-full p-2.5 rounded-lg bg-[#FFF8EF] outline-none transition-all ${
                erroEntrada ? 'border border-red-400' : 'border border-[#222020]/20 focus:border-[#EF9B1B]'
              }`} />
            {erroEntrada && <span className="text-xs text-red-500 block mt-1">{erroEntrada}</span>}
        </div>
        
        <div className="space-y-1">
            <label className="text-xs font-medium uppercase tracking-wider text-[#222020]">Saída</label>
            <input value={saidaAcomodacao} onChange={(e) => setSaidaAcomodacao(e.target.value)} required type="date" 
              className={`w-full p-2.5 rounded-lg bg-[#FFF8EF] outline-none transition-all ${
                erroSaida ? 'border border-red-400' : 'border border-[#222020]/20 focus:border-[#EF9B1B]'
              }`} />
            {erroSaida && <span className="text-xs text-red-500 block mt-1">{erroSaida}</span>}
        </div>  

        <div className="space-y-1">
            <label className="text-xs font-medium uppercase tracking-wider text-[#222020]">Tipo de Quarto</label>
            <select value={tipoDeQuartoId} onChange={(e) => setTipoDeQuartoId(e.target.value)} required 
              className={`w-full p-2.5 rounded-lg bg-[#FFF8EF] outline-none transition-all ${
                erroQuarto ? 'border border-red-400' : 'border border-[#222020]/20 focus:border-[#EF9B1B]'
              }`}>
              <option value="">Selecionar</option>
              {tipos?.map((tipo) => <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>)}
            </select>
            {erroQuarto && <span className="text-xs text-red-500 block mt-1">{erroQuarto}</span>}
        </div>

        <div className="space-y-1">
            <label className="text-xs font-medium uppercase tracking-wider text-[#222020]">Nº de Pessoas</label>
            <input value={numeroPessoas} onChange={(e) => setNumeroPessoas(e.target.value)} required type="number" min="1"
              className={`w-full p-2.5 rounded-lg bg-[#FFF8EF] outline-none transition-all ${
                erroPessoas ? 'border border-red-400' : 'border border-[#222020]/20 focus:border-[#EF9B1B]'
              }`} />
            {erroPessoas && <span className="text-xs text-red-500 block mt-1">{erroPessoas}</span>}
        </div>
      </div>

      <div className="space-y-1 mt-6">
          <label className="text-xs font-medium uppercase tracking-wider text-[#222020]">Observações</label>
          <textarea value={observacao} onChange={(e) => setObservacao(e.target.value)} rows={2} maxLength={255}
            className={`w-full p-2.5 rounded-lg bg-[#FFF8EF] outline-none resize-none transition-all ${
              erroObs ? 'border border-red-400' : 'border border-[#222020]/20 focus:border-[#EF9B1B]'
            }`}></textarea>
          {erroObs && <span className="text-xs text-red-500 block mt-1">{erroObs}</span>}
      </div>

      {erroGeral && (
        <div className="mt-4 text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-200">
          {erroGeral}
        </div>
      )}

      <div className="pt-6 flex gap-3">
          <button type="button" onClick={onCancel} className="flex-1 py-2.5 rounded-lg font-medium border border-[#222020]/20 text-[#222020] hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          {/* Botão dinâmico */}
          <button type="submit" className="flex-1 py-2.5 rounded-lg font-medium bg-[#EF9B1B] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 transition-all">
            {reservaEditando ? 'Salvar Alterações' : 'Confirmar Reserva'}
          </button>
      </div>  
    </form>
  )
}