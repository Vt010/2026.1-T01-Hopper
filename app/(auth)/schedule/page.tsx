"use client";

import "../../globals.css";
import Link from "next/link";
import Image from "next/image";

export default function SchedulePage() {
  return (
    <div className="flex min-h-screen w-full bg-[#F0F7F9] font-sans">
      
      {/* SIDEBAR DA ESQUERDA: Menu de Navegação Rápida */}
      <aside className="flex w-64 flex-col bg-linear-to-b from-[#2B7A78] to-[#17252A] p-6 text-white shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <Image
            src="/imagens/UnBemEstarLg1.png"
            alt="Logo UnBemEstar"
            width={45}
            height={45}
            className="rounded-xl bg-white p-1 object-contain"
          />
          <div>
            <h2 className="text-md font-bold tracking-wide">UnBemEstar</h2>
            <p className="text-[10px] opacity-70 uppercase tracking-wider">Área do Paciente</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm opacity-70 transition-all hover:bg-white/10 hover:opacity-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
            </svg>
            Painel Principal
          </Link>
          <Link href="/schedule" className="flex items-center gap-3 rounded-xl bg-[#3AAFA9] px-4 py-3 text-sm font-semibold text-white shadow-md">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Novo Agendamento
          </Link>
        </nav>

        <div className="pt-4 border-t border-white/10">
          <Link href="/login" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-300 hover:bg-red-500/10 transition-all">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair do Sistema
          </Link>
        </div>
      </aside>

      {/* RESTO DA PÁGINA EM BRANCO */}
      <main className="flex-1 bg-[#F0F7F9]" />

    </div>
  );
}