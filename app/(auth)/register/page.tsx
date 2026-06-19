"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem({ texto: "", tipo: "" });

    if (form.senha.length < 8) {
      setMensagem({ texto: "A senha precisa ter no mínimo 8 caracteres!", tipo: "erro" });
      return;
    }
    if (form.senha !== form.confirmarSenha) {
      setMensagem({ texto: "As senhas não coincidem!", tipo: "erro" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome || "Usuário",
          email: form.email || "usuario@teste.com",
          senha: form.senha || "12345678",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensagem({ texto: data.error || "Erro ao realizar cadastro.", tipo: "erro" });
        setLoading(false);
        return;
      }

      setMensagem({ texto: "✅ Cadastro efetuado com sucesso! Redirecionando...", tipo: "sucesso" });
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      setMensagem({ texto: "Erro de conexão. Tente novamente.", tipo: "erro" });
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f0f7f9",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        display: "flex",
        maxWidth: "1000px",
        width: "100%",
        backgroundColor: "white",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.1)"
      }}>
        {/* Lado Esquerdo - Painel Verde */}
        <div style={{
          width: "50%",
          backgroundColor: "#2B7A78",
          padding: "48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "32px" }}>🩺</span>
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
                  Un<span style={{ fontWeight: "900" }}>Bem</span>Estar
                </h1>
                <p style={{ fontSize: "12px", opacity: 0.8, letterSpacing: "2px", margin: 0 }}>
                  FISIOTERAPIA & REABILITAÇÃO
                </p>
              </div>
            </div>
            <div style={{ marginTop: "60px" }}>
              <h2 style={{ fontSize: "32px", fontWeight: "bold", lineHeight: "1.2" }}>
                Sua saúde e movimento em boas mãos.
              </h2>
              <p style={{ opacity: 0.9, marginTop: "16px", fontSize: "14px" }}>
                Agende suas sessões, com rapidez, facilidade e sem estresse!
              </p>
            </div>
          </div>
          <div>
            <p style={{ opacity: 0.8, fontSize: "14px" }}>Já possui uma conta?</p>
            <Link href="/login" style={{
              display: "inline-block",
              marginTop: "12px",
              padding: "10px 32px",
              border: "2px solid white",
              borderRadius: "30px",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "14px",
              transition: "all 0.3s"
            }}>
              ENTRAR
            </Link>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div style={{
          width: "50%",
          padding: "48px 40px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <h2 style={{ fontSize: "24px", color: "#2B7A78", marginBottom: "4px" }}>
            Crie sua conta
          </h2>
          <p style={{ fontSize: "13px", color: "#718096", marginBottom: "24px" }}>
            Preencha os dados obrigatórios
          </p>

          {mensagem.texto && (
            <div style={{
              padding: "12px",
              borderRadius: "12px",
              marginBottom: "16px",
              backgroundColor: mensagem.tipo === "sucesso" ? "#d4edda" : "#f8d7da",
              color: mensagem.tipo === "sucesso" ? "#155724" : "#721c24",
              border: `1px solid ${mensagem.tipo === "sucesso" ? "#c3e6cb" : "#f5c6cb"}`
            }}>
              {mensagem.texto}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a4a4a", display: "block", marginBottom: "4px" }}>
                Nome Completo *
              </label>
              <input
                type="text"
                name="nome"
                required
                value={form.nome}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.2s"
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a4a4a", display: "block", marginBottom: "4px" }}>
                E-mail *
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.2s"
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a4a4a", display: "block", marginBottom: "4px" }}>
                Senha *
              </label>
              <input
                type="password"
                name="senha"
                required
                minLength={8}
                value={form.senha}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.2s"
                }}
              />
              {form.senha.length > 0 && form.senha.length < 8 && (
                <p style={{ fontSize: "11px", color: "#dc3545", marginTop: "4px" }}>
                  * A senha deve conter no mínimo 8 caracteres.
                </p>
              )}
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a4a4a", display: "block", marginBottom: "4px" }}>
                Confirmar Senha *
              </label>
              <input
                type="password"
                name="confirmarSenha"
                required
                value={form.confirmarSenha}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.2s"
                }}
              />
              {form.confirmarSenha.length > 0 && form.senha !== form.confirmarSenha && (
                <p style={{ fontSize: "11px", color: "#dc3545", marginTop: "4px" }}>
                  * As senhas não coincidem.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: loading ? "#a0aec0" : "#2B7A78",
                color: "white",
                border: "none",
                borderRadius: "30px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s"
              }}
            >
              {loading ? "CADASTRANDO..." : "CADASTRAR"}
            </button>
          </form>

          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "24px",
            fontSize: "11px",
            color: "#718096"
          }}>
            <span>🔒</span>
            <span>Seus dados estão protegidos pela LGPD.</span>
          </div>
        </div>
      </div>
    </div>
  );
}