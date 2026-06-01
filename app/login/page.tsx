"use client";


import "../../src/app/globals.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // Guarda o CPF ou E-mail
  const [senha, setSenha] = useState("");

  // Função inteligente: Se o usuário digitar números, formata como CPF. Se digitar letras, aceita como e-mail.
  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Se o que foi digitado começar com número (ou só contiver números/pontos/traço), trata como CPF
    if (/^\d/.test(input) || input === "") {
      const value = input.replace(/\D/g, ""); // Remove tudo que não é número
      const formattedCpf = value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .substring(0, 14);
      setIdentifier(formattedCpf);
    } else {
      // Se forem letras, aceita livremente (para o formato de e-mail)
      setIdentifier(input);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Se for um CPF, gera uma versão limpa (só números) para enviar ao back-end
    const isCpf = /^\d/.test(identifier);
    const dadosEnviados = {
      login: isCpf ? identifier.replace(/\D/g, "") : identifier,
      senha,
    };

    console.log("Dados de login enviados:", dadosEnviados);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F0F7F9] p-4 font-sans">
      {/* Container Principal Largo  */}
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

          {/* Texto de Apresentação */}
          <div className="my-auto space-y-4 z-10">
            <h2 className="text-4xl font-extrabold leading-tight">
              Sua saúde e movimento em boas mãos.
            </h2>
            <p className="text-sm opacity-90 leading-relaxed max-w-sm">
              Agende suas sessões, com rapidez, facilidade e sem estresse!
            </p>
          </div>

          {/* Espaço inferior limpo */}
          <div className="z-10 text-xs opacity-50">
            © {new Date().getFullYear()} UnBemEstar. Todos os direitos reservados.
          </div>

          {/* Background Decorativo Suave (Ondas) */}
          <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0,50 Q25,20 50,50 T100,50" />
              <path d="M0,60 Q25,30 50,60 T100,60" />
            </svg>
          </div>
        </div>

        {/* LADO DIREITO: Formulário de Login */}
        <div className="flex w-full flex-col justify-center bg-[#FEFFFF] p-12 md:w-1/2">
          <div className="mx-auto w-full max-w-md space-y-8">
            
            {/* Títulos  */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#2B7A78]">Faça Login</h2>
              <p className="mt-2 text-sm text-[#718096]">Acesse sua conta para gerenciar seus agendamentos</p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Campo Combinado: CPF ou E-mail */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="CPF ou E-mail"
                  required
                  value={identifier}
                  onChange={handleIdentifierChange}
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

              {/* Botão de Login Alterado */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="w-full max-w-xs rounded-full bg-[#3AAFA9] py-3 font-semibold text-white shadow-md transition-all hover:bg-[#2B7A78] hover:shadow-lg active:scale-95"
                >
                  LOGIN
                </button>
              </div>
            </form>

            {/* Link auxiliar caso o usuário queira voltar para o Cadastro */}
            <div className="text-center text-sm text-[#718096]">
              Ainda não tem uma conta?{" "}
              <Link href="/register" className="font-semibold text-[#3AAFA9] hover:underline">
                Cadastre-se aqui
              </Link>
            </div>

            {/* Rodapé de Proteção de Dados */}
            <div className="flex items-center justify-center gap-2 pt-4 text-xs text-[#718096]">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Conexão segura e criptografada.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}