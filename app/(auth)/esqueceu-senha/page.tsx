"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EsqueceuSenhaPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Como você cuida do front-end, o botão agora faz a navegação visual para a próxima etapa
    router.push("/nova-senha");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F0F7F9] p-4 font-sans">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl min-h-137.5">
        
        {/* LADO ESQUERDO: Formulário de Recuperação */}
        <div className="flex w-full flex-col justify-center bg-[#FEFFFF] p-8 md:w-1/2">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#2B7A78]">
                Recuperar sua Senha
              </h2>
              <p className="mt-1 text-xs text-[#718096]">
                Insira seu e-mail para receber o código e confirme-o abaixo para prosseguir
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Campo: E-mail */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="Seu e-mail cadastrado *"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-[#F0F7F9] py-3 pl-11 pr-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                />
              </div>

              {/* Campo: Código de Verificação */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Código de verificação *"
                  required
                  maxLength={6}
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  className="w-full rounded-xl bg-[#F0F7F9] py-3 pl-11 pr-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9] tracking-widest"
                />
              </div>

              {/* Botão de Enviar / Verificar */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="w-full max-w-xs rounded-full bg-[#3AAFA9] py-3 font-semibold text-white shadow-md transition-all hover:bg-[#2B7A78] hover:shadow-lg active:scale-95"
                >
                  VERIFICAR CÓDIGO
                </button>
              </div>
            </form>

            {/* Link para voltar ao Login */}
            <div className="text-center text-xs">
              <Link
                href="/login"
                className="font-semibold text-[#2B7A78] hover:underline flex items-center justify-center gap-1"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar para o login
              </Link>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: Identidade Visual da Clínica */}
        <div className="relative hidden w-1/2 flex-col justify-between bg-gradient-to-b from-[#3AAFA9] to-[#2B7A78] p-12 text-white md:flex">
          <div className="flex items-center gap-3 z-10">
            <Image
              src="/imagens/UnBemEstarLg1.png"
              alt="Logo UnBemEstar"
              width={60}
              height={60}
              className="rounded-xl object-contain bg-white p-1"
            />
            <div>
              <h1 className="text-xl font-medium tracking-wide text-white">
                Un<span className="font-extrabold text-white">Bem</span>Estar
              </h1>
              <p className="text-xs opacity-80 uppercase tracking-widest">
                Fisioterapia & Reabilitação
              </p>
            </div>
          </div>

          <div className="my-auto space-y-4 z-10">
            <h2 className="text-4xl font-extrabold leading-tight">
              Segurança em primeiro lugar.
            </h2>
            <p className="text-sm opacity-90 leading-relaxed max-w-sm">
              Não se preocupe! Vamos te ajudar a restabelecer o acesso à sua conta de forma rápida e segura para que você continue acompanhando seus agendamentos.
            </p>
          </div>

          <div className="space-y-4 z-10">
            <p className="text-sm opacity-80">Lembrou a senha antiga?</p>
            <Link
              href="/login"
              className="inline-block rounded-full border-2 border-white px-8 py-2 font-semibold text-white transition-all hover:bg-white hover:text-[#2B7A78]"
            >
              ACESSAR CONTA
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}