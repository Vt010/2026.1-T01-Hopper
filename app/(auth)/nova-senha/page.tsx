"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NovaSenhaPage() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (novaSenha.length < 8) {
      alert("A senha deve conter no mínimo 8 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem. Verifique e tente novamente.");
      return;
    }

    // Validação solicitada: impede que a senha redefinida seja igual à antiga simulada
    // Nota: No front real com banco de dados, essa checagem será feita pela API.
    const senhaAntigaSimulada = "12345678"; 
    if (novaSenha === senhaAntigaSimulada) {
      alert("A nova senha não pode ser igual à sua senha atual. Escolha uma combinação diferente por segurança.");
      return;
    }

    alert("Senha alterada com sucesso!");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F0F7F9] p-4 font-sans">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl min-h-[550px]">
        
        {/* LADO ESQUERDO: Formulário de Nova Senha */}
        <div className="flex w-full flex-col justify-center bg-[#FEFFFF] p-8 md:w-1/2">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#2B7A78]">
                Crie uma Nova Senha
              </h2>
              <p className="mt-1 text-xs text-[#718096]">
                Escolha uma senha forte de no mínimo 8 caracteres para proteger sua conta.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Campo: Nova Senha */}
              <div>
                <input
                  type="password"
                  placeholder="Nova senha *"
                  required
                  minLength={8}
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  className="w-full rounded-xl bg-[#F0F7F9] py-3 px-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                />
              </div>

              {/* Campo: Confirmar Nova Senha */}
              <div>
                <input
                  type="password"
                  placeholder="Confirme a nova senha *"
                  required
                  minLength={8}
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="w-full rounded-xl bg-[#F0F7F9] py-3 px-4 text-sm text-[#2D3748] placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#3AAFA9]"
                />
              </div>

              {/* Botão de Concluir */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="w-full max-w-xs rounded-full bg-[#3AAFA9] py-3 font-semibold text-white shadow-md transition-all hover:bg-[#2B7A78] hover:shadow-lg active:scale-95"
                >
                  REDEFINIR SENHA
                </button>
              </div>
            </form>

            <div className="text-center text-xs">
              <Link href="/login" className="font-semibold text-[#2B7A78] hover:underline">
                ← Cancelar e voltar ao login
              </Link>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: Identidade Corporativa com Logo e Nome */}
        <div className="relative hidden w-1/2 flex-col justify-between bg-gradient-to-b from-[#3AAFA9] to-[#2B7A78] p-12 text-white md:flex">
          
          {/* Topo com o Logo e Nome da Clínica igual à tela de login */}
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

          {/* Conteúdo Central explicativo */}
          <div className="my-auto space-y-4 z-10">
            <h2 className="text-4xl font-extrabold leading-tight">
              Quase pronto!
            </h2>
            <p className="text-sm opacity-90 leading-relaxed max-w-sm">
              Após redefinir sua senha, você será guiado de volta à tela de login para acessar a plataforma com suas novas credenciais de forma segura.
            </p>
          </div>

          {/* Rodapé inferior apenas para equilibrar o layout visual */}
          <div className="space-y-4 z-10 invisible">
            <p className="text-sm opacity-80">Espaço reservado</p>
          </div>

        </div>

      </div>
    </div>
  );
}