"use client";

import Link from "next/link";
import { useState } from "react";

// ─── Dados estáticos ───────────────────────────────────────────────────────────

const services = [
  {
    icon: "🦴",
    title: "Fisioterapia Ortopédica",
    desc: "Reabilitação de lesões musculoesqueléticas, pós-cirúrgico e dores crônicas.",
  },
  {
    icon: "🧠",
    title: "Fisioterapia Neurológica",
    desc: "Tratamento de AVC, Parkinson, lesão medular e doenças neuromusculares.",
  },
  {
    icon: "🤸",
    title: "RPG e Postural",
    desc: "Reeducação Postural Global para correção de desvios e melhora da qualidade de vida.",
  },
  {
    icon: "🏃",
    title: "Fisioterapia Esportiva",
    desc: "Prevenção e recuperação de atletas amadores e profissionais.",
  },
  {
    icon: "👶",
    title: "Fisioterapia Pediátrica",
    desc: "Acompanhamento do desenvolvimento motor de bebês e crianças.",
  },
  {
    icon: "💆",
    title: "Pilates Terapêutico",
    desc: "Exercícios supervisionados para fortalecimento, equilíbrio e flexibilidade.",
  },
];

const testimonials = [
  {
    initials: "AM",
    name: "Ana Martins",
    text: "Recuperei minha mobilidade em 3 meses de tratamento. A equipe é incrível e muito atenciosa!",
    stars: 5,
  },
  {
    initials: "RO",
    name: "Roberto Oliveira",
    text: "Fiz fisioterapia pós-operatória aqui. O atendimento é excelente e o agendamento online facilita muito.",
    stars: 5,
  },
  {
    initials: "CS",
    name: "Carla Souza",
    text: "Recomendo para todos! O pilates terapêutico mudou minha postura e acabou com minhas dores nas costas.",
    stars: 5,
  },
];

const faqs = [
  {
    q: "Preciso de encaminhamento médico?",
    a: "Não é obrigatório. Você pode agendar diretamente pelo nosso site ou telefone. Porém, se tiver laudo médico, traga para a primeira consulta.",
  },
  {
    q: "Quanto tempo dura uma sessão?",
    a: "As sessões têm duração média de 50 minutos, podendo variar conforme o protocolo de tratamento individual.",
  },
  {
    q: "Atendem convênio?",
    a: "Atendemos os principais convênios. Entre em contato para verificar se o seu plano está na lista de convênios aceitos.",
  },
  {
    q: "Como cancelo uma consulta?",
    a: "Cancelamentos devem ser feitos com pelo menos 24 horas de antecedência, diretamente pelo sistema ou pelo telefone da clínica.",
  },
];

// ─── Componentes auxiliares ────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#f59e0b", fontSize: "14px" }}>★</span>
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(42,181,160,0.15)",
        paddingBottom: "1rem",
        marginBottom: "1rem",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          textAlign: "left",
          color: "#1a2e2e",
          fontWeight: 600,
          fontSize: "15px",
          gap: "12px",
        }}
      >
        <span>{q}</span>
        <span
          style={{
            fontSize: "20px",
            color: "#2ab5a0",
            flexShrink: 0,
            transition: "transform 0.2s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "14px",
            lineHeight: 1.7,
            color: "#5a7a7a",
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

// ─── Componente de Login/Register Popup ─────────────────────────────────────────

function AuthModal({ isOpen, onClose, initialView = "login" }: { isOpen: boolean; onClose: () => void; initialView?: "login" | "register" }) {
  const [view, setView] = useState<"login" | "register">(initialView);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          maxWidth: "450px",
          width: "100%",
          padding: "32px",
          position: "relative",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#999",
          }}
        >
          ✕
        </button>

        {view === "login" ? (
          <>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#1a2e2e", marginBottom: "8px" }}>
              Boas-vindas 👋
            </h2>
            <p style={{ color: "#5a7a7a", marginBottom: "28px", fontSize: "14px" }}>
              Faça login para acessar sua conta
            </p>

            <form>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#1a2e2e", marginBottom: "6px" }}>
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #e0e8e8",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#1a2e2e", marginBottom: "6px" }}>
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #e0e8e8",
                    fontSize: "14px",
                  }}
                />
              </div>
              <Link
                href="/dashboardd"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#2ab5a0",
                  color: "#fff",
                  padding: "12px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                Entrar
              </Link>
            </form>

            <p style={{ textAlign: "center", fontSize: "13px", color: "#5a7a7a" }}>
              Não tem uma conta?{" "}
              <button
                onClick={() => setView("register")}
                style={{ color: "#2ab5a0", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}
              >
                Cadastre-se
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#1a2e2e", marginBottom: "8px" }}>
              Criar conta ✨
            </h2>
            <p style={{ color: "#5a7a7a", marginBottom: "28px", fontSize: "14px" }}>
              Preencha os dados para começar
            </p>

            <form>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#1a2e2e", marginBottom: "6px" }}>
                  Nome completo
                </label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #e0e8e8",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#1a2e2e", marginBottom: "6px" }}>
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #e0e8e8",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#1a2e2e", marginBottom: "6px" }}>
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #e0e8e8",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#1a2e2e", marginBottom: "6px" }}>
                  Confirmar senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #e0e8e8",
                    fontSize: "14px",
                  }}
                />
              </div>
              <Link
                href="/dashboardd"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#2ab5a0",
                  color: "#fff",
                  padding: "12px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                Cadastrar
              </Link>
            </form>

            <p style={{ textAlign: "center", fontSize: "13px", color: "#5a7a7a" }}>
              Já tem uma conta?{" "}
              <button
                onClick={() => setView("login")}
                style={{ color: "#2ab5a0", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}
              >
                Faça login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Navbar atualizada ──────────────────────────────────────────────────────────

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState<"login" | "register">("login");

  const handleAuthClick = (view: "login" | "register") => {
    setAuthView(view);
    setShowAuthModal(true);
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(42,181,160,0.15)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                background: "linear-gradient(135deg,#2ab5a0,#1a5c5c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              🏥
            </div>
            <div>
              <p style={{ color: "#1a2e2e", fontWeight: 800, fontSize: 16, margin: 0, lineHeight: 1.1 }}>
                UnBilidade
              </p>
              <p style={{ color: "#2ab5a0", fontSize: 9, margin: 0, letterSpacing: "0.1em", fontWeight: 600 }}>
                FISIOTERAPIA
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="desktop-nav">
            {["Serviços", "Sobre", "Depoimentos", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  color: "#5a7a7a",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => ((e.target as HTMLElement).style.color = "#2ab5a0")}
                onMouseOut={(e) => ((e.target as HTMLElement).style.color = "#5a7a7a")}
              >
                {item}
              </a>
            ))}
            <Link
              href="/schedulee"
              style={{
                background: "linear-gradient(135deg,#2ab5a0,#1a8a7a)",
                color: "#fff",
                padding: "10px 24px",
                borderRadius: 40,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(42,181,160,0.25)",
              }}
              onMouseOver={(e) => {
                (e.target as HTMLElement).style.transform = "translateY(-2px)";
                (e.target as HTMLElement).style.boxShadow = "0 6px 16px rgba(42,181,160,0.35)";
              }}
              onMouseOut={(e) => {
                (e.target as HTMLElement).style.transform = "translateY(0)";
                (e.target as HTMLElement).style.boxShadow = "0 4px 12px rgba(42,181,160,0.25)";
              }}
            >
              📅 Agendar
            </Link>
            <button
              onClick={() => handleAuthClick("login")}
              style={{
                background: "transparent",
                border: "1px solid #2ab5a0",
                color: "#2ab5a0",
                padding: "10px 24px",
                borderRadius: 40,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                (e.target as HTMLElement).style.background = "#2ab5a0";
                (e.target as HTMLElement).style.color = "#fff";
              }}
              onMouseOut={(e) => {
                (e.target as HTMLElement).style.background = "transparent";
                (e.target as HTMLElement).style.color = "#2ab5a0";
              }}
            >
              👤 Entrar
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#1a2e2e",
              fontSize: 24,
              display: "none",
            }}
            className="mobile-menu-btn"
          >
            ☰
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            style={{
              background: "#fff",
              padding: "20px 24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              borderBottom: "1px solid #e0e8e8",
            }}
          >
            {["Serviços", "Sobre", "Depoimentos", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                style={{ color: "#5a7a7a", textDecoration: "none", fontSize: 15, padding: "8px 0" }}
              >
                {item}
              </a>
            ))}
            <Link
              href="/schedulee"
              onClick={() => setMobileOpen(false)}
              style={{
                background: "linear-gradient(135deg,#2ab5a0,#1a8a7a)",
                color: "#fff",
                padding: "12px",
                borderRadius: 40,
                textDecoration: "none",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              📅 Agendar Consulta
            </Link>
            <button
              onClick={() => handleAuthClick("login")}
              style={{
                background: "transparent",
                border: "1px solid #2ab5a0",
                color: "#2ab5a0",
                padding: "12px",
                borderRadius: 40,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              👤 Entrar
            </button>
            <button
              onClick={() => handleAuthClick("register")}
              style={{
                background: "#2ab5a0",
                color: "#fff",
                padding: "12px",
                borderRadius: 40,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              ✨ Cadastrar
            </button>
          </div>
        )}

        <style>{`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: flex !important; }
          }
        `}</style>
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialView={authView} />
    </>
  );
}

// ─── Página principal ──────────────────────────────────────────────────────────

export default function HomePage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      <Navbar />

      <main style={{ paddingTop: 70 }}>
        {/* ── HERO ── */}
        <section
          style={{
            background: "linear-gradient(135deg, #e8f4f2 0%, #d4ece8 50%, #c2e4df 100%)",
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Elementos decorativos */}
          <div
            style={{
              position: "absolute",
              right: "-80px",
              top: "-80px",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "rgba(42,181,160,0.08)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -100,
              bottom: -50,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "rgba(42,181,160,0.05)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "80px 24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Texto */}
            <div>
              <span
                style={{
                  background: "rgba(42,181,160,0.12)",
                  border: "1px solid rgba(42,181,160,0.25)",
                  color: "#1a8a7a",
                  padding: "6px 14px",
                  borderRadius: 99,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  display: "inline-block",
                  marginBottom: 24,
                }}
              >
                ✨ CLÍNICA DE FISIOTERAPIA — UnB
              </span>
              <h1
                style={{
                  color: "#1a2e2e",
                  fontSize: "clamp(32px, 5vw, 54px)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  margin: "0 0 20px",
                }}
              >
                Recupere seu{" "}
                <span style={{ color: "#2ab5a0", position: "relative" }}>
                  movimento
                  <span
                    style={{
                      position: "absolute",
                      bottom: 8,
                      left: 0,
                      right: 0,
                      height: 8,
                      background: "rgba(42,181,160,0.2)",
                      borderRadius: 4,
                      zIndex: -1,
                    }}
                  />
                </span>
                ,<br />
                retome sua vida.
              </h1>
              <p
                style={{
                  color: "#5a7a7a",
                  fontSize: 17,
                  lineHeight: 1.7,
                  margin: "0 0 40px",
                  maxWidth: 480,
                }}
              >
                Tratamentos especializados em fisioterapia com equipe multidisciplinar,
                ambiente moderno e agendamento 100% online.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link
                  href="/schedulee"
                  style={{
                    background: "linear-gradient(135deg,#2ab5a0,#1a8a7a)",
                    color: "#fff",
                    padding: "15px 32px",
                    borderRadius: 50,
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: 15,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 8px 20px rgba(42,181,160,0.3)",
                    transition: "all 0.3s",
                  }}
                  onMouseOver={(e) => {
                    (e.target as HTMLElement).style.transform = "translateY(-2px)";
                    (e.target as HTMLElement).style.boxShadow = "0 12px 28px rgba(42,181,160,0.4)";
                  }}
                  onMouseOut={(e) => {
                    (e.target as HTMLElement).style.transform = "translateY(0)";
                    (e.target as HTMLElement).style.boxShadow = "0 8px 20px rgba(42,181,160,0.3)";
                  }}
                >
                  📅 Agendar Consulta
                </Link>
                <a
                  href="#serviços"
                  style={{
                    background: "#fff",
                    border: "1px solid #2ab5a0",
                    color: "#2ab5a0",
                    padding: "15px 32px",
                    borderRadius: 50,
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: 15,
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    (e.target as HTMLElement).style.background = "#2ab5a0";
                    (e.target as HTMLElement).style.color = "#fff";
                  }}
                  onMouseOut={(e) => {
                    (e.target as HTMLElement).style.background = "#fff";
                    (e.target as HTMLElement).style.color = "#2ab5a0";
                  }}
                >
                  Conhecer serviços
                </a>
              </div>
            </div>

            {/* Cards de destaque */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {[
                { emoji: "👨‍⚕️", number: "15+", label: "Fisioterapeutas especializados" },
                { emoji: "🏆", number: "98%", label: "Índice de satisfação" },
                { emoji: "📅", number: "500+", label: "Consultas por mês" },
                { emoji: "⏱️", number: "24h", label: "Agendamento online" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    borderRadius: 20,
                    padding: "24px 20px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{stat.emoji}</div>
                  <div style={{ color: "#2ab5a0", fontSize: 28, fontWeight: 800, lineHeight: 1 }}>
                    {stat.number}
                  </div>
                  <div style={{ color: "#5a7a7a", fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) {
              section > div { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* ── SERVIÇOS ── */}
        <section
          id="serviços"
          style={{ padding: "100px 24px", background: "#fff" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span
                style={{
                  color: "#2ab5a0",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                O que oferecemos
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px,4vw,40px)",
                  fontWeight: 800,
                  color: "#1a2e2e",
                  margin: "10px 0 12px",
                }}
              >
                Especialidades da clínica
              </h2>
              <p style={{ color: "#5a7a7a", maxWidth: 600, margin: "0 auto" }}>
                Tratamentos personalizados para cada necessidade
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 28,
              }}
            >
              {services.map((s, idx) => (
                <div
                  key={s.title}
                  style={{
                    background: "#fff",
                    borderRadius: 24,
                    padding: "32px 28px",
                    border: "1px solid rgba(42,181,160,0.1)",
                    transition: "all 0.3s",
                    cursor: "default",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(42,181,160,0.1)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(42,181,160,0.2)";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(42,181,160,0.1)";
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 18,
                      background: "linear-gradient(135deg, rgba(42,181,160,0.1), rgba(42,181,160,0.05))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 30,
                      marginBottom: 20,
                    }}
                  >
                    {s.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#1a2e2e",
                      margin: "0 0 10px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#5a7a7a", lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOBRE ── */}
        <section
          id="sobre"
          style={{
            padding: "100px 24px",
            background: "#e8f4f2",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  color: "#2ab5a0",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Sobre a clínica
              </span>
              <h2
                style={{
                  color: "#1a2e2e",
                  fontSize: "clamp(28px,4vw,40px)",
                  fontWeight: 800,
                  margin: "10px 0 20px",
                  lineHeight: 1.2,
                }}
              >
                Cuidado humanizado com <span style={{ color: "#2ab5a0" }}>tecnologia de ponta</span>
              </h2>
              <p style={{ color: "#5a7a7a", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
                A UnBilidade nasceu com o propósito de tornar a fisioterapia acessível e eficaz para todos.
                Nossa equipe é formada por profissionais graduados pela Universidade de Brasília,
                com especializações nas principais áreas da fisioterapia.
              </p>
              <p style={{ color: "#5a7a7a", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
                Utilizamos equipamentos modernos e protocolos baseados em evidências científicas para
                garantir a melhor recuperação possível para cada paciente.
              </p>
              <Link
                href="/schedulee"
                style={{
                  background: "linear-gradient(135deg,#2ab5a0,#1a8a7a)",
                  color: "#fff",
                  padding: "14px 28px",
                  borderRadius: 50,
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 14,
                  display: "inline-block",
                  boxShadow: "0 4px 12px rgba(42,181,160,0.25)",
                }}
              >
                📅 Agendar consulta
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { title: "Equipe multidisciplinar", desc: "Fisioterapeutas, educadores físicos e nutricionistas trabalhando em conjunto." },
                { title: "Tecnologia moderna", desc: "Equipamentos de última geração para tratamento eficaz." },
                { title: "Localização UnB", desc: "Instalações dentro do campus da Universidade de Brasília." },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "24px 28px",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#2ab5a0",
                      flexShrink: 0,
                      marginTop: 5,
                    }}
                  />
                  <div>
                    <p style={{ color: "#1a2e2e", fontWeight: 700, fontSize: 15, margin: "0 0 4px" }}>
                      {item.title}
                    </p>
                    <p style={{ color: "#5a7a7a", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) {
              #sobre > div { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* ── DEPOIMENTOS ── */}
        <section
          id="depoimentos"
          style={{ padding: "100px 24px", background: "#fff" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span
                style={{
                  color: "#2ab5a0",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                O que dizem nossos pacientes
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px,4vw,40px)",
                  fontWeight: 800,
                  color: "#1a2e2e",
                  margin: "10px 0 0",
                }}
              >
                Histórias de recuperação
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 28,
              }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  style={{
                    background: "#f9fbfb",
                    borderRadius: 24,
                    padding: "32px 28px",
                    border: "1px solid rgba(42,181,160,0.08)",
                    transition: "all 0.3s",
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(42,181,160,0.08)";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <Stars count={t.stars} />
                  <p
                    style={{
                      color: "#1a2e2e",
                      fontSize: 14,
                      lineHeight: 1.7,
                      margin: "16px 0 24px",
                    }}
                  >
                    "{t.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg,#2ab5a0,#1a5c5c)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      {t.initials}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 14, color: "#1a2e2e" }}>
                      {t.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          id="faq"
          style={{ padding: "100px 24px", background: "#e8f4f2" }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span
                style={{
                  color: "#2ab5a0",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Dúvidas frequentes
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px,4vw,40px)",
                  fontWeight: 800,
                  color: "#1a2e2e",
                  margin: "10px 0 0",
                }}
              >
                Perguntas frequentes
              </h2>
            </div>
            <div style={{ background: "#fff", borderRadius: 32, padding: "32px 40px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section
          style={{
            background: "linear-gradient(135deg, #1a2e2e, #0d2b2b)",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(28px,4vw,38px)",
              fontWeight: 800,
              margin: "0 0 16px",
            }}
          >
            Pronto para começar sua recuperação?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 16,
              margin: "0 0 40px",
              maxWidth: 500,
              marginInline: "auto",
            }}
          >
            Agende sua consulta agora mesmo de forma rápida e fácil.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/schedulee"
              style={{
                background: "#2ab5a0",
                color: "#fff",
                padding: "16px 36px",
                borderRadius: 50,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 16,
                display: "inline-block",
                boxShadow: "0 8px 24px rgba(42,181,160,0.3)",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                (e.target as HTMLElement).style.transform = "translateY(-2px)";
                (e.target as HTMLElement).style.boxShadow = "0 12px 32px rgba(42,181,160,0.4)";
              }}
              onMouseOut={(e) => {
                (e.target as HTMLElement).style.transform = "translateY(0)";
                (e.target as HTMLElement).style.boxShadow = "0 8px 24px rgba(42,181,160,0.3)";
              }}
            >
              📅 Agendar Consulta
            </Link>
            <button
              onClick={() => {
                const modal = document.querySelector('button[aria-label="open-login"]');
                if (modal) (modal as HTMLElement).click();
              }}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                padding: "16px 36px",
                borderRadius: 50,
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                (e.target as HTMLElement).style.borderColor = "#2ab5a0";
                (e.target as HTMLElement).style.background = "rgba(42,181,160,0.1)";
              }}
              onMouseOut={(e) => {
                (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                (e.target as HTMLElement).style.background = "transparent";
              }}
            >
              👤 Já tenho conta
            </button>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer
          style={{
            background: "#071a1a",
            padding: "48px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 32, flexWrap: "wrap" }}>
              <Link href="/schedulee" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13 }}>Agendar</Link>
              <Link href="/loginn" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13 }}>Área do Paciente</Link>
              <Link href="/dashboardd" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13 }}>Dashboard</Link>
              <a href="#serviços" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13 }}>Serviços</a>
              <a href="#faq" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13 }}>FAQ</a>
            </div>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>
              © 2026 UnBilidade Fisioterapia · Universidade de Brasília · Todos os direitos reservados
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}