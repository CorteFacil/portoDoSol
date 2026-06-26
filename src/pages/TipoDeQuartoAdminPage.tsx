import TipoQuartoForm from "../components/TipoDeQuartoForm"; // Ou o nome exato do seu arquivo form
import { api } from "../api";
import type { TipoDeQuarto } from "../types";

export default function TipoDeQuartoAdminPage() {
  
  // Agora a função exige exatamente os campos que estão no seu types.ts
  async function handleCreateTipoQuarto(data: Omit<TipoDeQuarto, "id">) {
    // Chamando a rota com o nome exato da sua api.ts
    await api.createTipoDeQuarto(data);
  }

  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#222020] font-display">Tipos de Quarto</h1>
        <p className="text-gray-500 mt-1">Gerencie as configurações das categorias de acomodação.</p>
      </div>
      
      <TipoQuartoForm onSubmit={handleCreateTipoQuarto} />
    </div>
  );
}