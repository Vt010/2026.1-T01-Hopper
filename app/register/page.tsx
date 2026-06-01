"use client";


import "../../src/app/globals.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState(""); 
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState(""); 

  // Função para aplicar a máscara de CPF (000.000.000-00) enquanto o usuário digita
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
    const formattedCpf = value
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .substring(0, 14); // Limita ao tamanho do CPF
    setCpf(formattedCpf);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica se as senhas batem antes de enviar
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    // Enviando o CPF limpo (só números) para o back-end
    const cpfLimpo = cpf.replace(/\D/g, "");

    console.log("Dados enviados:", { nome, cpf: cpfLimpo, email, senha });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F0F7F9] p-4 font-sans">
      {/* Container Principal Largo*/}
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl min-h-[600px]">
        
        {/* LADO ESQUERDO: Painel Verde com Info de Fisioterapia */}
        <div className="relative hidden w-1/2 flex-col justify-between bg-gradient-to-b from-[#3AAFA9] to-[#2B7A78] p-12 text-white md:flex">
          
          {/* LOGO DA CLÍNICA */}
          <div className="flex items-center gap-3 z-10">
            <Image
              src="/imagens/UnBemEstarLg1.png" 
              alt="Logo UnBemEstar"
              width={60} 
              height={60}
              className="rounded-xl object-contain bg-white p-1" 
            />
            <div>
              {/* <span> deixando o "Bem" super destacado */}
              <h1 className="text-xl font-medium tracking-wide text-white">
                Un<span className="font-extrabold text-white">Bem</span>Estar
              </h1>
              <p className="text-xs opacity-80 uppercase tracking-widest">Fisioterapia & Reabilitação</p>
            </div>
          </div>

          {/* Texto de Apresentação e Chamada */}
          <div className="my-auto space-y-4 z-10">
            <h2 className="text-4xl font-extrabold leading-tight">
              Sua saúde e movimento em boas mãos.
            </h2>
            <p className="text-sm opacity-90 leading-relaxed max-w-sm">
              Agende suas sessões, com rapidez, facilidade e sem estresse!
            </p>
          </div>

          {/* Botão de Alternar para Login */}
          <div className="space-y-4 z-10">
            <p className="text-sm opacity-80">Já possui uma conta?</p>
            <Link 
              href="/login" 
              className="inline-block rounded-full border-2 border-white px-8 py-2 font-semibold text-white transition-all hover:bg-white hover:text-[#2B7A78]"
            >
              ENTRAR
            </Link>
          </div>

          {/* Background Decorativo Suave (Ondas) */}
          <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0,50 Q25,20 50,50 T100,50" />
              <path d="M0,60 Q25,30 50,60 T100,60" />
            </svg>
          </div>
        </div>

        {/* LADO DIREITO: Formulário de Cadastro */}
        <div className="flex w-full flex-col justify-center bg-[#FEFFFF] p-12 md:w-1/2">
          <div className="mx-auto w-full max-w-md space-y-6">
            
            {/* Títulos */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#2B7A78]">Crie sua conta</h2>
              <p className="mt-1 text-sm text-[#718096]">Preencha seus dados para começar</p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Campo Nome */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Nome Completo"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-xl bg-[#F0F7F9] py-3 pl-12 pr-4 text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                />
              </div>

              {/* NOVO: Campo CPF (Abaixo do Nome) */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="CPF (000.000.000-00)"
                  required
                  value={cpf}
                  onChange={handleCpfChange}
                  className="w-full rounded-xl bg-[#F0F7F9] py-3 pl-12 pr-4 text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                />
              </div>

              {/* Campo Email */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="E-mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-[#F0F7F9] py-3 pl-12 pr-4 text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                />
              </div>

              {/* Campo Senha */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="Senha"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full rounded-xl bg-[#F0F7F9] py-3 pl-12 pr-4 text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                />
              </div>

              {/* Campo Confirmar Senha  */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="Confirme sua senha"
                  required
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="w-full rounded-xl bg-[#F0F7F9] py-3 pl-12 pr-4 text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                />
              </div>

              {/* Botão Cadastrar */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="w-full max-w-xs rounded-full bg-[#3AAFA9] py-3 font-semibold text-white shadow-md transition-all hover:bg-[#2B7A78] hover:shadow-lg active:scale-95"
                >
                  CADASTRAR
                </button>
              </div>
            </form>

            {/* Rodapé de Proteção de Dados */}
            <div className="flex items-center justify-center gap-2 pt-2 text-xs text-[#718096]">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Seus dados estão protegidos.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}