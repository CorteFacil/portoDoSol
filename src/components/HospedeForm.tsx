import { useState, type FormEvent, useEffect } from 'react';
import type { Estado, PaisIso } from '../types';

interface HospedeFormProp {
  estados: Estado[]
  paises: PaisIso[] 
  initialDoc?: string 
  error?: string 
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function HospedeForm({ estados, paises, initialDoc = '', error, onSubmit, onCancel }: HospedeFormProp) {
  const [nome, setNome] = useState('');
  const [tipoDoc, setTipoDoc] = useState<'CPF' | 'Passaporte'>('CPF');
  const [cpfPassaporte, setCpfPassaporte] = useState(initialDoc);
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [estadoId, setEstadoId] = useState('');
  const [paisId, setPaisId] = useState(''); 

  useEffect(() => {
    if (initialDoc === '') setCpfPassaporte('');
  }, [tipoDoc, initialDoc]);

  const getErro = (palavrasChave: string[]) => {
    if (!error) return null;
    const sentencas = error.match(/[^.!?]+[.!?]+/g) || [error];
    const encontradas = sentencas.filter(s => 
      palavrasChave.some(p => s.toLowerCase().includes(p.toLowerCase()))
    );
    return encontradas.length > 0 ? encontradas.join(' ').trim() : null;
  };

  const erroNome = getErro(['Nome']);
  const erroDoc = getErro(['Documento', 'CPF', 'Passaporte']);
  const erroTel = getErro(['Telefone']);
  const erroEmail = getErro(['Email']);
  const erroNasc = getErro(['Nascimento']);
  const erroEstado = getErro(['Estado']);

  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (tipoDoc === 'CPF') {
      v = v.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      v = v.toUpperCase().replace(/[^A-Z0-9]/g, ''); 
      if (v.length > 15) v = v.slice(0, 15);
    }
    setCpfPassaporte(v);
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    setTelefone(v);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      nome, cpfPassaporte, email, telefone, nascimento,
      estadoId: Number(estadoId),
      paisId: Number(paisId)
    });
  }

  return (
    <form className="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-[#EF9B1B]/20" onSubmit={handleSubmit}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-black text-[#EF9B1B]">Completar Cadastro</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wider text-[#222020]">Nome Completo</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} required type="text" 
            className={`w-full p-2.5 rounded-lg bg-[#FFF8EF] outline-none transition-all ${
              erroNome ? 'border border-red-400 focus:border-red-400' : 'border border-[#222020]/20 focus:border-[#EF9B1B]'
            }`} />
          {erroNome && <span className="text-xs text-red-500 block mt-1">{erroNome}</span>}
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium uppercase tracking-wider text-[#222020]">Documento</label>
            <select value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value as 'CPF' | 'Passaporte')} className="text-xs bg-transparent text-[#EF9B1B] font-bold outline-none cursor-pointer">
              <option value="CPF">CPF</option>
              <option value="Passaporte">Passaporte</option>
            </select>
          </div>
          <input value={cpfPassaporte} onChange={handleDocChange} required type="text" placeholder={tipoDoc === 'CPF' ? "999.999.999-99" : "Letras e Números"}
            className={`w-full p-2.5 rounded-lg bg-[#FFF8EF] outline-none transition-all ${
              erroDoc ? 'border border-red-400 focus:border-red-400' : 'border border-[#222020]/20 focus:border-[#EF9B1B]'
            }`} />
          {erroDoc && <span className="text-xs text-red-500 block mt-1">{erroDoc}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wider text-[#222020]">Telefone</label>
          <input value={telefone} onChange={handleTelefoneChange} required type="text" placeholder="(99) 99999-9999"
            className={`w-full p-2.5 rounded-lg bg-[#FFF8EF] outline-none transition-all ${
              erroTel ? 'border border-red-400 focus:border-red-400' : 'border border-[#222020]/20 focus:border-[#EF9B1B]'
            }`} />
          {erroTel && <span className="text-xs text-red-500 block mt-1">{erroTel}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wider text-[#222020]">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="seu@email.com"
            className={`w-full p-2.5 rounded-lg bg-[#FFF8EF] outline-none transition-all ${
              erroEmail ? 'border border-red-400 focus:border-red-400' : 'border border-[#222020]/20 focus:border-[#EF9B1B]'
            }`} />
          {erroEmail && <span className="text-xs text-red-500 block mt-1">{erroEmail}</span>}
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-medium uppercase tracking-wider text-[#222020]">Nascimento</label>
          <input value={nascimento} onChange={(e) => setNascimento(e.target.value)} required type="date"
            className={`w-full p-2.5 rounded-lg bg-[#FFF8EF] outline-none transition-all ${
              erroNasc ? 'border border-red-400 focus:border-red-400' : 'border border-[#222020]/20 focus:border-[#EF9B1B]'
            }`} />
          {erroNasc && <span className="text-xs text-red-500 block mt-1">{erroNasc}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wider text-[#222020]">País</label>
          <select value={paisId} onChange={(e) => setPaisId(e.target.value)} required
            className="w-full p-2.5 rounded-lg border border-[#222020]/20 bg-[#FFF8EF] focus:border-[#EF9B1B] outline-none transition-all">
            <option value="">Selecione</option>
            {paises?.map((pais) => <option key={pais.id} value={pais.id}>{pais.nome}</option>)}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wider text-[#222020]">Estado</label>
          <select value={estadoId} onChange={(e) => setEstadoId(e.target.value)} required
            className={`w-full p-2.5 rounded-lg bg-[#FFF8EF] outline-none transition-all ${
              erroEstado ? 'border border-red-400 focus:border-red-400' : 'border border-[#222020]/20 focus:border-[#EF9B1B]'
            }`}>
            <option value="">Selecione</option>
            {estados?.map((estado) => <option key={estado.id} value={estado.id}>{estado.nomeEstado} - {estado.siglaUf}</option>)}
          </select>
          {erroEstado && <span className="text-xs text-red-500 block mt-1">{erroEstado}</span>}
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button type="button" onClick={onCancel} className="flex-1 py-2.5 rounded-lg font-medium border border-[#222020]/20 text-[#222020] hover:bg-gray-50 transition-colors">
          Cancelar
        </button>
        <button type="submit" className="flex-1 py-2.5 rounded-lg font-medium bg-[#EF9B1B] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 transition-all">
          Salvar
        </button>
      </div>
    </form>
  )
}