"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function SchedulePage() {
  // Estado para a data selecionada
  const [selectedDate, setSelectedDate] = useState("");
  const [horarios, setHorarios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Função para buscar horários disponíveis (simulada)
  const buscarHorarios = async () => {
    if (!selectedDate) {
      setMessage("Selecione uma data");
      return;
    }

    setLoading(true);
    setMessage("");
    setHorarios([]);

    try {
      // 🔁 Substitua pela chamada real da API quando estiver pronta
      // const res = await fetch(`/api/appointments/available?data=${selectedDate}`);
      // const result = await res.json();

      // Simulação (remover depois)
      setTimeout(() => {
        const horariosSimulados = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
        setHorarios(horariosSimulados);
        setLoading(false);
      }, 500);
    } catch (error) {
      setMessage("Erro ao buscar horários");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F0F7F9] font-sans">
      {/* ========== SIDEBAR ========== */}
      <aside className="flex w-64 flex-col bg-gradient-to-b from-[#2B7A78] to-[#17252A] p-6 text-white shrink-0 min-h-screen">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl">
            🩺
          </div>
          <div>
            <h2 className="text-md font-bold tracking-wide">UnBemEstar</h2>
            <p className="text-[10px] opacity-70 uppercase tracking-wider">Área do Paciente</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm opacity-70 transition-all hover:bg-white/10 hover:opacity-100"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
            </svg>
            Painel Principal
          </Link>
          <Link
            href="/schedule"
            className="flex items-center gap-3 rounded-xl bg-[#3AAFA9] px-4 py-3 text-sm font-semibold text-white shadow-md"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Novo Agendamento
          </Link>
        </nav>

        <div className="pt-4 border-t border-white/10">
          <Link
            href="/login"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-300 hover:bg-red-500/10 transition-all"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair do Sistema
          </Link>
        </div>
      </aside>

      {/* ========== CONTEÚDO PRINCIPAL ========== */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#2B7A78]">📅 Agendamento</h1>
            <p className="text-[#718096] text-sm">Selecione uma data e horário para sua consulta</p>
          </div>

          {/* Seleção de Data */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e2e8f0] mb-8">
            <label className="block text-sm font-semibold text-[#2B7A78] mb-2">
              Escolha a data:
            </label>
            <div className="flex gap-4 flex-wrap">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex-1 min-w-[200px] px-4 py-2 rounded-xl border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#3AAFA9]"
              />
              <button
                onClick={buscarHorarios}
                disabled={loading}
                className="px-6 py-2 bg-[#3AAFA9] text-white rounded-xl font-semibold hover:bg-[#2B7A78] transition-all disabled:opacity-50"
              >
                {loading ? "Buscando..." : "Buscar Horários"}
              </button>
            </div>
          </div>

          {/* Mensagens */}
          {message && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-200">
              {message}
            </div>
          )}

          {/* Horários Disponíveis */}
          {horarios.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e2e8f0]">
              <h2 className="text-lg font-semibold text-[#2B7A78] mb-4">
                Horários disponíveis para {selectedDate}:
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {horarios.map((horario) => (
                  <button
                    key={horario}
                    className="py-3 px-2 bg-[#F0F7F9] text-[#2B7A78] rounded-xl border border-[#e2e8f0] hover:bg-[#3AAFA9] hover:text-white hover:border-[#3AAFA9] transition-all font-medium"
                    onClick={() => alert(`Horário ${horario} selecionado!`)}
                  >
                    {horario}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}