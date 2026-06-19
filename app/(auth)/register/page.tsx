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
        setMensagem({ texto: data.error || "Erro ao cadastrar.", tipo: "erro" });
        setLoading(false);
        return;
      }

      setMensagem({ texto: "✅ Cadastro realizado! Redirecionando...", tipo: "sucesso" });
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      setMensagem({ texto: "Erro de conexão.", tipo: "erro" });
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
                Sua saúde em boas mãos.
              </h2>
            </div>
          </div>
          <div>
            <Link href="/login" style={{
              display: "inline-block",
              padding: "10px 32px",
              border: "2px solid white",
              borderRadius: "30px",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "14px",
            }}>
              ENTRAR
            </Link>
          </div>
        </div>

        <div style={{
          width: "50%",
          padding: "48px 40px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <h2 style={{ fontSize: "24px", color: "#2B7A78", marginBottom: "24px" }}>
            Crie sua conta
          </h2>

          {mensagem.texto && (
            <div style={{
              padding: "12px",
              borderRadius: "12px",
              marginBottom: "16px",
              backgroundColor: mensagem.tipo === "sucesso" ? "#d4edda" : "#f8d7da",
              color: mensagem.tipo === "sucesso" ? "#155724" : "#721c24",
            }}>
              {mensagem.texto}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a4a4a", display: "block", marginBottom: "4px" }}>
                Nome
              </label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  fontSize: "15px",
                  outline: "none"
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a4a4a", display: "block", marginBottom: "4px" }}>
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  fontSize: "15px",
                  outline: "none"
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a4a4a", display: "block", marginBottom: "4px" }}>
                Senha
              </label>
              <input
                type="password"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  fontSize: "15px",
                  outline: "none"
                }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a4a4a", display: "block", marginBottom: "4px" }}>
                Confirmar Senha
              </label>
              <input
                type="password"
                name="confirmarSenha"
                value={form.confirmarSenha}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  fontSize: "15px",
                  outline: "none"
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: loading ? "#a0aec0" : "#3AAFA9",
                color: "white",
                border: "none",
                borderRadius: "30px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "CADASTRANDO..." : "CADASTRAR"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}