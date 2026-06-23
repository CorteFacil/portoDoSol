import { useState, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { api } from '@/api'
import HospedeForm from '../components/HospedeForm'
import ReservaForm from '../components/ReservaForm'
import type { Estado, PaisIso, TipoDeQuarto, Reserva, Hospede } from '../types'

type Screen = 'login' | 'signup' | 'dashboard'

export default function ReservaPage() {
  const [screen, setScreen] = useState<Screen>('login')
  const [hospedeLogado, setHospedeLogado] = useState<Hospede | null>(null)
  
  const [tipoDocLogin, setTipoDocLogin] = useState<'CPF' | 'Passaporte'>('CPF')
  const [docLogin, setDocLogin] = useState('')
  
  const [estados, setEstados] = useState<Estado[]>([])
  const [paises, setPaises] = useState<PaisIso[]>([]) 
  const [tiposQuarto, setTiposQuarto] = useState<TipoDeQuarto[]>([])
  
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [showNovaReserva, setShowNovaReserva] = useState(false)
  
  // Estado criado para guardar e exibir o erro na tela
  const [formError, setFormError] = useState('')

  useEffect(() => {
    api.getEstados()
      .then((dados) => { if (Array.isArray(dados)) setEstados(dados); })
      .catch(e => console.error("Erro /estado:", e));

    api.getPaises()
      .then((dados) => { if (Array.isArray(dados)) setPaises(dados); })
      .catch(e => console.error("Erro /pais:", e));

    api.getTiposDeQuarto()
      .then((dados) => setTiposQuarto(Array.isArray(dados) ? dados : []))
      .catch(e => console.error("Erro /tipo-de-quarto:", e));
  }, []);

  const handleDocLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (tipoDocLogin === 'CPF') {
      v = v.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      v = v.toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (v.length > 15) v = v.slice(0, 15);
    }
    setDocLogin(v);
    setFormError(''); // Limpa o erro quando o usuário digita
  }

  // Função para desempacotar o JSON de erro do back-end
  const extrairErro = (err: any) => {
    let msg = err.message || String(err);
    try {
      const parsed = JSON.parse(msg);
      if (parsed.message) return parsed.message;
    } catch { }
    return msg;
  }

  const carregarReservasDoHospede = async (hospedeId: number) => {
    try {
      const result = await api.getReservasHospede(hospedeId);
      setReservas(result);
    } catch (err: any) {
      console.error("Erro ao buscar reservas", err);
    }
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    try {
      const hospede = await api.findHospedeByDoc(docLogin); 
      if (hospede && hospede.id) {
        setHospedeLogado(hospede);
        await carregarReservasDoHospede(hospede.id);
        setScreen('dashboard');
      } else {
        setScreen('signup');
      }
    } catch (err: any) {
      setFormError(extrairErro(err));
    }
  }

  const handleHospedeCriado = async (dadosForm: any) => {
    setFormError('');
    try {
      const payloadHospede = {
        nome: dadosForm.nome,
        cpfPassaporte: dadosForm.cpfPassaporte,
        email: dadosForm.email,
        telefone: dadosForm.telefone,
        nascimento: dadosForm.nascimento,
        estado: { id: dadosForm.estadoId } 
      };

      const novoHospede = await api.createHospede(payloadHospede as any);
      setHospedeLogado(novoHospede);
      setScreen('dashboard');
    } catch (err: any) {
      setFormError(extrairErro(err));
    }
  }

  const handleReservaCriada = async (dadosReserva: Omit<Reserva, 'id' | 'status'>) => {
    setFormError('');
    try {
      await api.createReserva(dadosReserva);
      setShowNovaReserva(false);
      if (hospedeLogado?.id) await carregarReservasDoHospede(hospedeLogado.id);
    } catch (err: any) {
      setFormError(extrairErro(err));
    }
  }

  // Função para transição de telas limpando o erro
  const mudarTela = (novaTela: Screen) => {
    setFormError('');
    setScreen(novaTela);
  }

  return (
    <div className="min-h-screen w-full bg-[#FFF8EF] text-[#222020] flex flex-col font-body">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        
        {screen === 'login' && (
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-[#EF9B1B]/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-black text-[#EF9B1B]">Acessar Reservas</h2>
              <p className="text-sm text-[#222020]/70 mt-2">Informe seu documento para continuar</p>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium uppercase tracking-wider text-[#222020]">Documento</label>
                  <select value={tipoDocLogin} onChange={(e) => {
                    setTipoDocLogin(e.target.value as 'CPF' | 'Passaporte');
                    setFormError('');
                  }} className="text-xs bg-transparent text-[#EF9B1B] font-bold outline-none cursor-pointer">
                    <option value="CPF">CPF</option>
                    <option value="Passaporte">Passaporte</option>
                  </select>
                </div>
                <input value={docLogin} onChange={handleDocLoginChange} required placeholder={tipoDocLogin === 'CPF' ? "999.999.999-99" : "Seu Passaporte"}
                  className="w-full p-3 rounded-lg border border-[#222020]/20 bg-[#FFF8EF] focus:border-[#EF9B1B] outline-none text-center tracking-widest text-lg uppercase" />
              </div>
              
              {formError && (
                <div className="text-red-600 text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                  {formError}
                </div>
              )}

              <button type="submit" className="w-full py-3 rounded-lg font-bold uppercase tracking-wider bg-[#EF9B1B] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 transition-all">
                Entrar
              </button>
            </form>
          </div>
        )}

        {screen === 'signup' && (
          <HospedeForm 
            initialDoc={docLogin} 
            estados={estados} 
            paises={paises} 
            error={formError} // Passando o erro para exibir no formulário
            onSubmit={handleHospedeCriado} 
            onCancel={() => mudarTela('login')}
          />
        )}

        {screen === 'dashboard' && hospedeLogado && (
          <div className="w-full max-w-4xl">
            <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-[#222020]/5">
              <div>
                <h2 className="text-2xl font-display font-bold text-[#222020]">Olá, {hospedeLogado.nome.split(' ')[0]}</h2>
                <p className="text-sm text-[#222020]/60">Gerencie suas estadias conosco.</p>
              </div>
              <button onClick={() => { setShowNovaReserva(!showNovaReserva); setFormError(''); }} className="px-6 py-2.5 rounded-lg font-bold bg-[#EF9B1B] text-white shadow-md hover:shadow-lg transition-all">
                {showNovaReserva ? 'Cancelar' : '+ Nova Reserva'}
              </button>
            </div>

            {showNovaReserva && (
              <div className="mb-8">
                <ReservaForm 
                  tipos={tiposQuarto} 
                  hospedeId={hospedeLogado.id} 
                  error={formError} // Passando o erro
                  onSubmit={handleReservaCriada} 
                  onCancel={() => { setShowNovaReserva(false); setFormError(''); }} 
                />
              </div>
            )}

            <h3 className="text-xl font-display font-bold text-[#222020] mb-4">Suas Reservas</h3>
            {reservas.length === 0 ? (
              <div className="text-center p-8 bg-white rounded-xl border border-dashed border-[#222020]/20">
                <p className="text-[#222020]/50">Você ainda não possui reservas.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {reservas.map((reserva: Reserva) => (
                  <div key={reserva.id} className="bg-white p-5 rounded-xl shadow-sm border border-[#222020]/10 hover:shadow-md transition-shadow">
                    <div className="flex justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${reserva.status === 1 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {reserva.status === 1 ? 'Confirmada' : 'Pendente'}
                      </span>
                    </div>
                    <p className="text-sm"><strong>Entrada:</strong> {reserva.entradaAcomodacao}</p>
                    <p className="text-sm"><strong>Saída:</strong> {reserva.saidaAcomodacao}</p>
                    <p className="text-sm"><strong>Pessoas:</strong> {reserva.numeroPessoas}</p>
                    {reserva.observacao && <p className="text-sm mt-2 text-gray-500 italic">Obs: {reserva.observacao}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
      <Footer />
    </div>
  )
}