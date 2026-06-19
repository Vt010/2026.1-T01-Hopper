"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      {/* ========== HEADER ========== */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: scrolled ? "white" : "transparent",
          boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.3s ease",
          zIndex: 1000,
          padding: "16px 32px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "28px" }}>🩺</span>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#2B7A78",
              }}
            >
              Un<span style={{ fontWeight: "900" }}>Bem</span>Estar
            </span>
          </div>

          {/* Navegação */}
          <nav
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="#home" style={{ textDecoration: "none", color: "#4a4a4a", fontSize: "14px" }}>
              Início
            </a>
            <a href="#about" style={{ textDecoration: "none", color: "#4a4a4a", fontSize: "14px" }}>
              Sobre
            </a>
            <a href="#features" style={{ textDecoration: "none", color: "#4a4a4a", fontSize: "14px" }}>
              Funcionalidades
            </a>

            <Link href="/contributors">
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  color: "#2B7A78",
                  border: "2px solid #2B7A78",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2B7A78";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#2B7A78";
                }}
              >
                🌟 Time
              </button>
            </Link>

            <Link href="/login" style={{ textDecoration: "none", color: "#4a4a4a", fontSize: "14px" }}>
              Entrar
            </Link>

            <Link href="/register">
              <button
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#2B7A78",
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#3AAFA9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#2B7A78";
                }}
              >
                Cadastrar
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* ========== HERO SECTION ========== */}
      <section
        id="home"
        style={{
          padding: "140px 32px 80px",
          background: "linear-gradient(135deg, #f0f7f9 0%, #ffffff 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "48px",
                color: "#2B7A78",
                marginBottom: "20px",
                lineHeight: "1.2",
              }}
            >
              Gestão inteligente para clínicas de fisioterapia
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "#64748b",
                marginBottom: "32px",
                lineHeight: "1.6",
              }}
            >
              Agende consultas, gerencie prontuários e automatize lembretes —
              tudo em um só lugar.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/register">
                <button
                  style={{
                    padding: "14px 32px",
                    backgroundColor: "#2B7A78",
                    color: "white",
                    border: "none",
                    borderRadius: "40px",
                    fontSize: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#3AAFA9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#2B7A78";
                  }}
                >
                  Começar agora
                </button>
              </Link>
              <Link href="/schedule">
                <button
                  style={{
                    padding: "14px 32px",
                    backgroundColor: "transparent",
                    color: "#2B7A78",
                    border: "2px solid #2B7A78",
                    borderRadius: "40px",
                    fontSize: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#2B7A78";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#2B7A78";
                  }}
                >
                  Ver calendário
                </button>
              </Link>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f0f7f9",
              borderRadius: "24px",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "80px" }}>📅</span>
            <p style={{ marginTop: "16px", color: "#2B7A78", fontSize: "18px" }}>
              Agendamento simplificado
            </p>
          </div>
        </div>
      </section>

      {/* ========== ABOUT SECTION ========== */}
      <section id="about" style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", color: "#2B7A78", marginBottom: "16px" }}>
            Sobre o UnBemEstar
          </h2>
          <p
            style={{
              color: "#64748b",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.7",
              fontSize: "17px",
            }}
          >
            O UnBemEstar é uma plataforma web desenvolvida para automatizar e
            centralizar a gestão de clínicas de fisioterapia. Nosso objetivo é
            eliminar processos manuais e reduzir a dependência de aplicativos de
            mensagem, oferecendo uma experiência profissional e eficiente para
            pacientes e gestores.
          </p>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section
        id="features"
        style={{ padding: "80px 32px", backgroundColor: "#f0f7f9" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", color: "#2B7A78", marginBottom: "16px" }}>
            Funcionalidades
          </h2>
          <p style={{ color: "#64748b", marginBottom: "48px" }}>
            Tudo que sua clínica precisa em um só lugar
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "32px",
            }}
          >
            {[
              { icon: "📅", title: "Agendamento Online", desc: "Pacientes agendam consultas 24/7" },
              { icon: "📋", title: "Prontuário Digital", desc: "Histórico clínico completo e seguro" },
              { icon: "✉️", title: "Lembretes Automáticos", desc: "Notificações por e-mail 24h antes" },
              { icon: "👥", title: "Multi-perfis", desc: "Pacientes, fisioterapeutas e secretárias" },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "24px",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: "40px" }}>{item.icon}</span>
                <h3 style={{ marginTop: "16px", color: "#2B7A78", fontSize: "18px" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "14px" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer
        style={{
          backgroundColor: "#2B7A78",
          color: "white",
          padding: "48px 32px",
          textAlign: "center",
        }}
      >
        <p>&copy; 2026 UnBemEstar — Todos os direitos reservados</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            marginTop: "16px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/contributors"
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#cbd5e1";
            }}
          >
            🌟 Conheça o time
          </Link>
          <Link
            href="/login"
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#cbd5e1";
            }}
          >
            Entrar
          </Link>
          <Link
            href="/register"
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#cbd5e1";
            }}
          >
            Cadastrar
          </Link>
        </div>

        <p
          style={{
            marginTop: "16px",
            fontSize: "14px",
            color: "#cbd5e1",
          }}
        >
          Desenvolvido por alunos da UnB — MDS 2026.1
        </p>
      </footer>
    </div>
  );
}