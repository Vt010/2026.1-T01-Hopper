"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Calendar,
  LayoutDashboard,
  ClipboardList,
  Wrench,
  Users,
  LogOut,
  ChevronDown,
} from "lucide-react";

interface Servico {
  id: string;
  nome: string;
  descricao: string;
  descricaoCompleta?: string;
  indicacoes?: string[];
  duracao: number;
  icone: string;
  categoria?: string;
}

// ──────────────────────────────────────────────
// SIDEBAR — logo e ícones idênticos à landing page
// ──────────────────────────────────────────────
function Sidebar({ activeHref }: { activeHref: string }) {
  const navLinks = [
    { href: "/dashboard",    icon: <LayoutDashboard size={16} />, label: "Painel Principal" },
    { href: "/schedule",     icon: <Calendar         size={16} />, label: "Novo Agendamento" },
    { href: "/historico",    icon: <ClipboardList    size={16} />, label: "Histórico" },
    { href: "/servicos",     icon: <Wrench           size={16} />, label: "Serviços" },
    { href: "/contributors", icon: <Users            size={16} />, label: "Equipe" },
  ];

  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #3AAFA9 0%, #2B7A78 100%)",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      {/* Logo — idêntico ao header da landing page */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "4px",
            display: "flex",
            boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
          }}
        >
          <Image
            src="/imagens/UnBemEstarLg1.png"
            alt="Logo UnBemEstar"
            width={32}
            height={32}
            style={{ borderRadius: "8px", objectFit: "contain" }}
          />
        </div>
        <div>
          <h1 style={{ fontSize: "18px", fontWeight: "bold", color: "white", margin: 0, lineHeight: 1 }}>
            Un<span style={{ fontWeight: "900" }}>Bem</span>Estar
          </h1>
          <p style={{ fontSize: "10px", color: "#cbd5e1", letterSpacing: "1px", margin: "3px 0 0" }}>
            ÁREA DO PACIENTE
          </p>
        </div>
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
        {navLinks.map(({ href, icon, label }) => {
          const active = href === activeHref;
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "10px",
                textDecoration: "none",
                backgroundColor: active ? "rgba(255,255,255,0.18)" : "transparent",
                color: active ? "white" : "rgba(255,255,255,0.70)",
                fontSize: "14px",
                fontWeight: active ? "600" : "400",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.10)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {icon} {label}
            </Link>
          );
        })}
      </nav>

      {/* Sair */}
      <Link
        href="/login"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 12px",
          borderRadius: "10px",
          textDecoration: "none",
          color: "rgba(255,255,255,0.45)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          fontSize: "14px",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "white"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
      >
        <LogOut size={16} /> Sair
      </Link>
    </aside>
  );
}

// ──────────────────────────────────────────────
// SKELETON BAR
// ──────────────────────────────────────────────
function SkeletonBlock() {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid #e2e8f0",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    >
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        <div style={{ width: "52px", height: "52px", backgroundColor: "#e2e8f0", borderRadius: "12px", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: "18px", backgroundColor: "#e2e8f0", borderRadius: "4px", width: "60%", marginBottom: "8px" }} />
          <div style={{ height: "13px", backgroundColor: "#e2e8f0", borderRadius: "4px", width: "85%", marginBottom: "4px" }} />
          <div style={{ height: "13px", backgroundColor: "#e2e8f0", borderRadius: "4px", width: "40%" }} />
        </div>
      </div>
    </div>
  );
}


  
  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f7f9", display: "flex", fontFamily: "Arial, sans-serif" }}>
      <style>{`
        @keyframes pulse   { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
        @keyframes fadeIn  { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <Sidebar activeHref="/servicos" />
      {children}
    </div>
  );

// ──────────────────────────────────────────────
// PÁGINA
// ──────────────────────────────────────────────
export default function ServicosPage() {
  const router = useRouter();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServicos() {
      try {
        setLoading(true);
        setError(null);

        // 🔁 Substituir pela chamada real da API
        // const res = await fetch('/api/services');
        // if (!res.ok) throw new Error('Erro ao carregar serviços');
        // const data = await res.json();

        await new Promise((r) => setTimeout(r, 600));
        const mockServicos: Servico[] = [
          {
            id: "1",
            nome: "Fisioterapia Ortopédica",
            descricao: "Reabilitação de lesões musculoesqueléticas",
            descricaoCompleta: "Tratamento especializado para lesões ortopédicas, fraturas, entorses, tendinites e pós-operatório. Utilizamos técnicas manuais, exercícios terapêuticos e recursos como laser e ultrassom para acelerar sua recuperação.",
            indicacoes: ["Pós-cirúrgico ortopédico", "Lesões esportivas", "Tendinites e bursites", "Fraturas e entorses", "Artrose e artrite"],
            duracao: 50,
            icone: "🦴",
            categoria: "Ortopedia",
          },
          {
            id: "2",
            nome: "Fisioterapia Neurológica",
            descricao: "Tratamento de condições neurológicas",
            descricaoCompleta: "Reabilitação de pacientes com sequelas neurológicas como AVC, traumatismos cranianos, doenças neurodegenerativas e lesões medulares. Foco na recuperação funcional e qualidade de vida.",
            indicacoes: ["AVC (Derrame)", "Traumatismo craniano", "Doença de Parkinson", "Esclerose múltipla", "Lesão medular"],
            duracao: 60,
            icone: "🧠",
            categoria: "Neurologia",
          },
          {
            id: "3",
            nome: "Fisioterapia Respiratória",
            descricao: "Reabilitação pulmonar e respiratória",
            descricaoCompleta: "Tratamento de doenças respiratórias, reabilitação pós-COVID, fibrose cística, DPOC e asma. Técnicas de desobstrução brônquica, exercícios respiratórios e recondicionamento físico.",
            indicacoes: ["DPOC", "Asma brônquica", "Pós-COVID", "Fibrose cística", "Pneumonia e bronquite"],
            duracao: 45,
            icone: "🫁",
            categoria: "Respiratória",
          },
          {
            id: "4",
            nome: "RPG - Reeducação Postural Global",
            descricao: "Reeducação postural global",
            descricaoCompleta: "Método de reeducação postural que trata desequilíbrios musculares e posturais. Trabalha cadeias musculares, alongamento global e correção de vícios posturais.",
            indicacoes: ["Dores nas costas", "Escoliose", "Hipercifose", "Lombalgia crônica", "Postura inadequada"],
            duracao: 60,
            icone: "🧘",
            categoria: "Postura",
          },
          {
            id: "5",
            nome: "Pilates Terapêutico",
            descricao: "Fortalecimento e flexibilidade",
            descricaoCompleta: "Método Pilates adaptado para reabilitação e condicionamento físico. Fortalece o core, melhora a flexibilidade, estabilidade e consciência corporal.",
            indicacoes: ["Dor lombar", "Fortalecimento muscular", "Reabilitação pós-cirúrgica", "Melhora da flexibilidade", "Prevenção de lesões"],
            duracao: 50,
            icone: "💪",
            categoria: "Condicionamento",
          },
          {
            id: "6",
            nome: "Acupuntura",
            descricao: "Tratamento por estimulação de pontos",
            descricaoCompleta: "Técnica milenar da medicina chinesa que utiliza agulhas em pontos específicos do corpo para tratar dores, estresse, ansiedade, insônia e diversos outros problemas de saúde.",
            indicacoes: ["Dores crônicas", "Estresse e ansiedade", "Insônia", "Enxaqueca", "Dores articulares"],
            duracao: 40,
            icone: "🎯",
            categoria: "Terapias Complementares",
          },
        ];

        setServicos(mockServicos);
      } catch (err) {
        setError("Erro ao carregar serviços. Tente novamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchServicos();
  }, []);

  const toggleExpand = (id: string) => setExpandedId(expandedId === id ? null : id);
  const handleAgendar = (servicoId: string) => router.push(`/schedule?servico=${servicoId}`);


  // ── Loading skeleton ──
  if (loading) {
    return (
      <Shell>
        <main style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>
          <div style={{ marginBottom: "32px" }}>
            <div style={{ height: "28px", backgroundColor: "#e2e8f0", borderRadius: "4px", width: "220px", marginBottom: "8px", animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ height: "14px", backgroundColor: "#e2e8f0", borderRadius: "4px", width: "300px", animation: "pulse 1.5s ease-in-out infinite" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
            {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonBlock key={i} />)}
          </div>
        </main>
      </Shell>
    );
  }

  // ── Erro ──
  if (error) {
    return (
      <Shell>
        <main style={{ flex: 1, padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#dc2626", fontSize: "18px" }}>⚠️ {error}</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: "16px",
                padding: "10px 24px",
                backgroundColor: "#2B7A78",
                color: "white",
                border: "none",
                borderRadius: "30px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#3AAFA9"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#2B7A78"; }}
            >
              Tentar novamente
            </button>
          </div>
        </main>
      </Shell>
    );
  }

  // ── Página completa ──
  return (
    <Shell>
      <main style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>

        {/* Cabeçalho */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", color: "#2B7A78", margin: 0, fontWeight: "bold" }}>
            Nossos Serviços
          </h1>
          <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: "15px" }}>
            Conheça os tratamentos disponíveis na clínica
          </p>
        </div>

        {/* Grid de cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
          {servicos.map((servico) => {
            const isExpanded = expandedId === servico.id;
            return (
              <div
                key={servico.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "16px",
                  padding: "24px",
                  border: isExpanded ? "2px solid #3AAFA9" : "1px solid #e2e8f0",
                  boxShadow: isExpanded
                    ? "0 8px 25px rgba(58,175,169,0.15)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                  transform: isExpanded ? "translateY(-4px)" : "translateY(0)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() => toggleExpand(servico.id)}
              >
                {/* Cabeçalho do card */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "12px",
                      backgroundColor: "#e6f7f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      flexShrink: 0,
                    }}
                  >
                    {servico.icone}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#2d3748", margin: "0 0 4px 0" }}>
                      {servico.nome}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                      {servico.descricao}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#3AAFA9",
                          backgroundColor: "#e6f7f5",
                          padding: "2px 10px",
                          borderRadius: "20px",
                        }}
                      >
                        ⏱ {servico.duracao} min
                      </span>
                      {servico.categoria && (
                        <span
                          style={{
                            fontSize: "11px",
                            color: "#2B7A78",
                            backgroundColor: "#f0f7f9",
                            padding: "2px 10px",
                            borderRadius: "20px",
                          }}
                        >
                          {servico.categoria}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Chevron rotativo */}
                  <div
                    style={{
                      color: isExpanded ? "#3AAFA9" : "#a0aec0",
                      transition: "transform 0.3s",
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  >
                    <ChevronDown size={20} />
                  </div>
                </div>

                {/* Conteúdo expandido */}
                {isExpanded && (
                  <div
                    style={{
                      marginTop: "16px",
                      paddingTop: "16px",
                      borderTop: "1px solid #e2e8f0",
                      animation: "fadeIn 0.25s ease",
                    }}
                  >
                    <p style={{ fontSize: "14px", color: "#4a5568", lineHeight: "1.65", margin: "0 0 14px 0" }}>
                      {servico.descricaoCompleta}
                    </p>

                    {servico.indicacoes && servico.indicacoes.length > 0 && (
                      <div style={{ marginBottom: "16px" }}>
                        <p style={{ fontSize: "12px", fontWeight: "600", color: "#2B7A78", margin: "0 0 6px 0" }}>
                          📌 Indicações:
                        </p>
                        <ul
                          style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "6px",
                          }}
                        >
                          {servico.indicacoes.map((item, idx) => (
                            <li
                              key={idx}
                              style={{
                                fontSize: "12px",
                                backgroundColor: "#f0f7f9",
                                padding: "3px 12px",
                                borderRadius: "20px",
                                color: "#4a5568",
                              }}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAgendar(servico.id);
                      }}
                      style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#2B7A78",
                        color: "white",
                        border: "none",
                        borderRadius: "30px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#3AAFA9"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#2B7A78"; }}
                    >
                      📅 Agendar este serviço
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            fontSize: "12px",
            color: "#a0aec0",
            borderTop: "1px solid #e2e8f0",
            paddingTop: "20px",
          }}
        >
          © 2026 UnBemEstar — Todos os direitos reservados &nbsp;·&nbsp; Desenvolvido por alunos da UnB — MDS 2026.1
        </div>
      </main>
    </Shell>
  );
}