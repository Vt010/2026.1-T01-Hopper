"use client";

import "../../src/app/globals.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [identificacao, setIdentificacao] = useState("");
  const [senha, setSenha] = useState("");

  // Formata o CPF inserindo os pontos e o hífen
  const formatarCPF = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros.length <= 3) return apenasNumeros;
    if (apenasNumeros.length <= 6) return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3)}`;
    if (apenasNumeros.length <= 9) return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(6)}`;
    return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(6, 9)}-${apenasNumeros.slice(9, 11)}`;
  };

  const handleIdentificacaoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const valorOriginal = target.value;
    
    // CORREÇÃO: Remove tudo que não é número para testar se o usuário está tentando digitar um CPF
    const apenasNumeros = valorOriginal.replace(/\D/g, "");
    
    // Se o valor original contiver apenas números (ou números com a formatação de pontos/traço)
    if (valorOriginal !== "" && (/^\d+$/.test(apenasNumeros) && !valorOriginal.includes("@"))) {
      const valorFormatado = formatarCPF(valorOriginal);
      setIdentificacao(valorFormatado);
      
      if (apenasNumeros.length < 11) {
        target.setCustomValidity("O CPF deve conter exatamente 11 dígitos numéricos.");
      } else {
        target.setCustomValidity("");
      }
    } else {
      // Se tiver letras ou o caractere '@', trata livremente como e-mail e permite todas as letras
      setIdentificacao(valorOriginal);
      
      if (valorOriginal === "") {
        target.setCustomValidity("Por favor, insira seu e-mail ou CPF para acessar.");
      } else if (!valorOriginal.includes("@")) {
        target.setCustomValidity(`Por favor, inclua um '@' no endereço de e-mail. '${valorOriginal}' está faltando um '@'.`);
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valorOriginal)) {
        target.setCustomValidity("Por favor, insira um formato de e-mail válido (ex: nome@dominio.com).");
      } else {
        target.setCustomValidity("");
      }
    }
  };

  const handleInvalidMessage = (e: React.FormEvent<HTMLInputElement>, mensagem: string) => {
    (e.target as HTMLInputElement).setCustomValidity(mensagem);
  };

  const handleInputClearValidity = (e: React.FormEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).setCustomValidity("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (senha.length < 8) {
      alert("A senha digitada está incompleta (mínimo 8 caracteres).");
      return;
    }

    console.log("Autenticando com:", identificacao);
    router.push("/schedule");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F0F7F9] p-4 font-sans">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl min-h-[550px]">
        
        {/* LADO ESQUERDO: Formulário */}
        <div className="flex w-full flex-col justify-center bg-[#FEFFFF] p-8 md:w-1/2">
          <div className="mx-auto w-full max-w-md space-y-6">
            
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#2B7A78]">Acesse sua Conta</h2>
              <p className="mt-1 text-xs text-[#718096]">Insira suas credenciais para gerenciar suas sessões</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Campo Duplo Corrigido */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="E-mail ou CPF *"
                  required
                  onInvalid={(e) => handleInvalidMessage(e, "Por favor, insira seu e-mail ou CPF para acessar.")}
                  value={identificacao}
                  onChange={handleIdentificacaoInput}
                  className="w-full rounded-xl bg-[#F0F7F9] py-3 pl-11 pr-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                />
              </div>

              {/* Senha */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="Sua senha *"
                  required
                  onInvalid={(e) => handleInvalidMessage(e, "Por favor, digite a sua senha.")}
                  onInput={handleInputClearValidity}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full rounded-xl bg-[#F0F7F9] py-3 pl-11 pr-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                />
              </div>

              <div className="flex items-center justify-end text-xs">
                <Link href="#" className="font-medium text-[#3AAFA9] hover:underline">
                  Esqueceu sua senha?
                </Link>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="w-full max-w-xs rounded-full bg-[#3AAFA9] py-3 font-semibold text-white shadow-md transition-all hover:bg-[#2B7A78] hover:shadow-lg active:scale-95"
                >
                  ENTRAR
                </button>
              </div>
            </form>

            <div className="text-center text-xs text-[#718096] md:hidden">
              Não tem uma conta?{" "}
              <Link href="/register" className="font-semibold text-[#2B7A78] hover:underline">
                Cadastre-se aqui
              </Link>
            </div>

          </div>
        </div>

        {/* LADO DIREITO */}
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
              <p className="text-xs opacity-80 uppercase tracking-widest">Fisioterapia & Reabilitação</p>
            </div>
          </div>

          <div className="my-auto space-y-4 z-10">
            <h2 className="text-4xl font-extrabold leading-tight">
              Bem-vindo de volta!
            </h2>
            <p className="text-sm opacity-90 leading-relaxed max-w-sm">
              Acesse sua conta para visualizar seu histórico de reabilitação e acompanhar seus próximos agendamentos.
            </p>
          </div>

          <div className="space-y-4 z-10">
            <p className="text-sm opacity-80">Ainda não possui cadastro?</p>
            <Link 
              href="/register" 
              className="inline-block rounded-full border-2 border-white px-8 py-2 font-semibold text-white transition-all hover:bg-white hover:text-[#2B7A78]"
            >
              CRIAR CONTA
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}