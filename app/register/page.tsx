"use client";

import "../../src/app/globals.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// IMPORTAÇÃO NOVA: Hook de navegação do Next.js
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  // Instancia o roteador para fazer o redirecionamento
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState(""); 
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState(""); 
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState(""); 
  const [endereco, setEndereco] = useState(""); 
  const [convenio, setConvenio] = useState(""); 

  // Validação matemática oficial do CPF
  const validarCPF = (cpfLimpo: string): boolean => {
    if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) return false;
    
    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false;

    return true;
  };

  // Força os balõezinhos nativos do navegador a ficarem em português
  const handleInvalidMessage = (e: React.FormEvent<HTMLInputElement>, mensagem: string) => {
    (e.target as HTMLInputElement).setCustomValidity(mensagem);
  };

  const handleInputClearValidity = (e: React.FormEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).setCustomValidity("");
  };

  // Valida a estrutura do e-mail em tempo real para forçar o balão em PT-BR
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setEmail(target.value);
    
    if (target.value === "") {
      target.setCustomValidity("Por favor, insira um endereço de e-mail.");
    } else if (!target.value.includes("@")) {
      target.setCustomValidity(`Por favor, inclua um '@' no endereço de e-mail. '${target.value}' está faltando um '@'.`);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target.value)) {
      target.setCustomValidity("Por favor, insira um formato de e-mail válido (ex: nome@dominio.com).");
    } else {
      target.setCustomValidity("");
    }
  };

  // Máscara de CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedCpf = value
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .substring(0, 14);
    setCpf(formattedCpf);
  };

  // Máscara de Telefone
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedTelefone = value;

    if (value.length > 2) {
      formattedTelefone = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    }
    if (value.length > 7) {
      formattedTelefone = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
    }
    
    setTelefone(formattedTelefone.substring(0, 15));
  };

  // Máscara de Data de Nascimento
  const handleDataNascimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedData = value
      .replace(/(\d{2})(\d)/, "$1/$2") 
      .replace(/(\d{2})(\d)/, "$1/$2") 
      .substring(0, 10); 
    setDataNascimento(formattedData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (senha.length < 8) {
      alert("A senha precisa ter no mínimo 8 caracteres!");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const cpfLimpo = cpf.replace(/\D/g, "");
    if (!validarCPF(cpfLimpo)) {
      alert("O CPF digitado é inválido! Por favor, verifique.");
      return;
    }

    const partesData = dataNascimento.split("/");
    const dataFormatadaBanco = partesData.length === 3 
      ? `${partesData[2]}-${partesData[1]}-${partesData[0]}`
      : null;

    const dadosFormulario = {
      nome,
      cpf: cpfLimpo,
      email,
      telefone: telefone.replace(/\D/g, ""),
      dataNascimento: dataFormatadaBanco,
      senha,
      endereco: endereco || null,
      convenio: convenio || null,
    };

    console.log("Dados prontos:", dadosFormulario);
    
    // MUDANÇA AQUI: Alerta amigável e redirecionamento imediato para a tela de login
    alert("Cadastro efetuado com sucesso! Redirecionando para a tela de acesso...");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F0F7F9] p-4 font-sans">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl min-h-[650px]">
        
        {/* LADO ESQUERDO: Painel Verde */}
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
              Sua saúde e movimento em boas mãos.
            </h2>
            <p className="text-sm opacity-90 leading-relaxed max-w-sm">
              Agende suas sessões, com rapidez, facilidade e sem estresse!
            </p>
          </div>

          <div className="space-y-4 z-10">
            <p className="text-sm opacity-80">Já possui uma conta?</p>
            <Link 
              href="/login" 
              className="inline-block rounded-full border-2 border-white px-8 py-2 font-semibold text-white transition-all hover:bg-white hover:text-[#2B7A78]"
            >
              ENTRAR
            </Link>
          </div>
        </div>

        {/* LADO DIREITO: Formulário */}
        <div className="flex w-full flex-col justify-center bg-[#FEFFFF] p-8 md:w-1/2 overflow-y-auto max-h-[90vh] md:max-h-none">
          <div className="mx-auto w-full max-w-md space-y-5">
            
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#2B7A78]">Crie sua conta</h2>
              <p className="mt-1 text-xs text-[#718096]">Preencha os dados obrigatórios e opcionais</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              
              <div className="space-y-3">
                
                {/* Nome */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Nome Completo *"
                    required
                    onInvalid={(e) => handleInvalidMessage(e, "Por favor, preencha o seu nome completo.")}
                    onInput={handleInputClearValidity}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full rounded-xl bg-[#F0F7F9] py-2.5 pl-11 pr-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                  />
                </div>

                {/* CPF e Telefone */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="CPF *"
                      required
                      onInvalid={(e) => handleInvalidMessage(e, "Por favor, insira o seu CPF.")}
                      onInput={handleInputClearValidity}
                      value={cpf}
                      onChange={handleCpfChange}
                      className="w-full rounded-xl bg-[#F0F7F9] py-2.5 pl-11 pr-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                    />
                  </div>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Telefone *"
                      required
                      onInvalid={(e) => handleInvalidMessage(e, "Por favor, insira um número de telefone válido.")}
                      onInput={handleInputClearValidity}
                      value={telefone}
                      onChange={handleTelefoneChange}
                      className="w-full rounded-xl bg-[#F0F7F9] py-2.5 pl-11 pr-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                    />
                  </div>
                </div>

                {/* Email e Data de Nascimento */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 items-center">
                  <div className="relative sm:col-span-3">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      placeholder="E-mail *"
                      required
                      onInvalid={(e) => handleInvalidMessage(e, "Por favor, insira um endereço de e-mail.")}
                      value={email}
                      onChange={handleEmailInput}
                      className="w-full rounded-xl bg-[#F0F7F9] py-2.5 pl-11 pr-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                    />
                  </div>

                  <div className="relative sm:col-span-2">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Dt. de Nasc. *"
                      required
                      onInvalid={(e) => handleInvalidMessage(e, "Preencha a data de nascimento.")}
                      onInput={handleInputClearValidity}
                      value={dataNascimento}
                      onChange={handleDataNascimentoChange}
                      className="w-full rounded-xl bg-[#F0F7F9] py-2.5 pl-11 pr-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                    />
                  </div>
                </div>

                {/* Senhas */}
                <div className="space-y-1">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                      <input
                        type="password"
                        placeholder="Senha *"
                        required
                        onInvalid={(e) => handleInvalidMessage(e, "Crie uma senha de acesso.")}
                        onInput={handleInputClearValidity}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full rounded-xl bg-[#F0F7F9] py-2.5 pl-11 pr-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                      />
                    </div>

                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                      <input
                        type="password"
                        placeholder="Confirme a senha *"
                        required
                        onInvalid={(e) => handleInvalidMessage(e, "Confirme a sua senha.")}
                        onInput={handleInputClearValidity}
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        className="w-full rounded-xl bg-[#F0F7F9] py-2.5 pl-11 pr-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                      />
                    </div>
                  </div>
                  
                  {senha.length > 0 && Array.from(senha).length < 8 && (
                    <p className="text-[11px] text-red-500 font-medium pl-1 transition-all">
                      * A senha deve conter no mínimo 8 caracteres. (Digitado: {Array.from(senha).length})
                    </p>
                  )}
                </div>

              </div>

              <hr className="border-gray-100 my-2" />

              {/* SEÇÃO: CAMPOS OPCIONAIS */}
              <div className="space-y-3">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Campos Opcionais</p>
                
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Endereço Completo"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    className="w-full rounded-xl bg-[#F0F7F9] py-2.5 pl-11 pr-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Convênio de Saúde (Se possuir)"
                    value={convenio}
                    onChange={(e) => setConvenio(e.target.value)}
                    className="w-full rounded-xl bg-[#F0F7F9] py-2.5 pl-11 pr-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                  />
                </div>
              </div>

              {/* Botão Cadastrar */}
              <div className="pt-3 text-center">
                <button
                  type="submit"
                  className="w-full max-w-xs rounded-full bg-[#3AAFA9] py-2.5 font-semibold text-white shadow-md transition-all hover:bg-[#2B7A78] hover:shadow-lg active:scale-95"
                >
                  CADASTRAR
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#718096]">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Seus dados estão protegidos pela LGPD.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}