"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Wrench,
  Users,
  LogOut,
} from "lucide-react";

interface Profissional {
  id: string;
  nome: string;
  crefito: string;
  especialidades: string[];
  bio: string;
  foto?: string;
}

const navLinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 12px",
  borderRadius: "10px",
  textDecoration: "none",
  color: "rgba(255,255,255,0.75)",
  marginBottom: "4px",
  fontSize: "14px",
  transition: "all 0.2s",
} as const;

async function buscarProfissionais(): Promise<Profissional[]> {
  await new Promise((r) => setTimeout(r, 500));
  return [
    {
      id: "p1",
      nome: "Dra. Ana Souza",
      crefito: "CREFITO-1/12345-F",
      especialidades: ["Ortopedia", "Esportes"],
      bio: "Formada pela Universidade de Brasília com especialização em fisioterapia esportiva e ortopédica. Mais de 8 anos de experiência no tratamento de lesões ligamentares, pós-operatório e reabilitação de atletas.",
    },
    {
      id: "p2",
      nome: "Dr. Carlos Lima",
      crefito: "CREFITO-1/23456-F",
      especialidades: ["Neurologia", "Reabilitação"],
      bio: "Especialista em fisioterapia neurológica com foco em reabilitação pós-AVC, esclerose múltipla e Parkinson. Mestre em neurociências pela UnB.",
    },
    {
      id: "p3",
      nome: "Dra. Marina Costa",
      crefito: "CREFITO-1/34567-F",
      especialidades: ["Respiratória", "UTI"],
      bio: "Fisioterapeuta respiratória com experiência em UTI adulta e pediátrica. Especialização em ventilação mecânica e reabilitação pulmonar.",
    },
    {
      id: "p4",
      nome: "Dra. Julia Ferreira",
      crefito: "CREFITO-1/45678-F",
      especialidades: ["Pilates", "Ortopedia"],
      bio: "Certificada em Pilates Clínico pelo método STOTT. Combina exercícios terapêuticos com técnicas ortopédicas para tratar dores crônicas e escoliose.",
    },
    {
      id: "p5",
      nome: "Dr. Roberto Alves",
      crefito: "CREFITO-1/56789-F",
      especialidades: ["RPG", "Postura"],
      bio: "Especialista em Reeducação Postural Global pela metodologia Philippe Souchard. Trata desvios posturais e dores crônicas com abordagem global do corpo.",
    },
    {
      id: "p6",
      nome: "Dra. Patrícia Nunes",
      crefito: "CREFITO-1/67890-F",
      especialidades: ["Acupuntura", "Esportes"],
      bio: "Formada em fisioterapia com especialização em acupuntura pela Faculdade de Medicina da USP. Integra a acupuntura ao tratamento fisioterapêutico.",
    },
  ];
}

function iniciais(nome: string) {
  return nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function EquipePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroAtivo, setFiltroAtivo] = useState<string | null>(null);
  const [expandido, setExpandido] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    buscarProfissionais()
      .then(setProfissionais)
      .finally(() => setCarregando(false));
  }, []);

  const todasEspecialidades = Array.from(
    new Set(profissionais.flatMap((p) => p.especialidades)),
  ).sort();

  const profissionaisFiltrados = filtroAtivo
    ? profissionais.filter((p) => p.especialidades.includes(filtroAtivo))
    : profissionais;

  function toggleFiltro(esp: string) {
    setFiltroAtivo((atual) => (atual === esp ? null : esp));
  }

  function toggleBio(id: string) {
    setExpandido((atual) => (atual === id ? null : id));
  }

  if (carregando) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F0F7F9",
        }}
      >
        <div style={{ fontSize: "16px", color: "#2B7A78", fontWeight: 600 }}>
          Carregando...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F0F7F9",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: isMobile ? "100%" : "240px",
          minHeight: isMobile ? "auto" : "100vh",
          background: "linear-gradient(180deg, #3AAFA9 0%, #2B7A78 100%)",
          padding: "24px 16px",
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          alignItems: isMobile ? "center" : "stretch",
          justifyContent: isMobile ? "space-between" : "flex-start",
          position: isMobile ? "relative" : "sticky",
          top: 0,
          height: isMobile ? "auto" : "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: isMobile ? 0 : "32px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "4px",
              display: "flex",
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
          {!isMobile && (
            <div>
              <h1
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "white",
                  margin: 0,
                }}
              >
                Un<span style={{ fontWeight: "900" }}>Bem</span>Estar
              </h1>
              <p
                style={{
                  fontSize: "10px",
                  color: "#cbd5e1",
                  letterSpacing: "1px",
                  margin: 0,
                }}
              >
                ÁREA DO PACIENTE
              </p>
            </div>
          )}
        </div>

        {!isMobile && (
          <nav style={{ flex: 1 }}>
            <Link
              href="/dashboard"
              style={{
                ...navLinkStyle,
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "white",
                fontWeight: 600,
              }}
            >
              <LayoutDashboard size={18} /> Painel Principal
            </Link>

            <Link
              href="/schedule"
              style={navLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              }}
            >
              <Calendar size={18} /> Novo Agendamento
            </Link>

            <Link
              href="/historico"
              style={navLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              }}
            >
              <FileText size={18} /> Histórico
            </Link>

            <Link
              href="/servicos"
              style={navLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              }}
            >
              <Wrench size={18} /> Serviços
            </Link>

            <Link
              href="/equipe"
              style={{
                ...navLinkStyle,
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "white",
                fontWeight: 600,
              }}
            >
              <Users size={18} /> Equipe
            </Link>
          </nav>
        )}

        <Link
          href="/login"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            borderRadius: "10px",
            textDecoration: "none",
            color: "rgba(255,255,255,0.55)",
            borderTop: isMobile ? "none" : "1px solid rgba(255,255,255,0.15)",
            paddingTop: isMobile ? "10px" : "16px",
            fontSize: "14px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.55)";
          }}
        >
          <LogOut size={18} /> {!isMobile && "Sair"}
        </Link>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main
        style={{
          flex: 1,
          padding: isMobile ? "20px" : "32px 40px",
          overflowY: "auto",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {/* Cabeçalho */}
          <div style={{ marginBottom: "8px" }}>
            <h1
              style={{
                fontSize: "28px",
                color: "#2B7A78",
                margin: 0,
                fontWeight: "bold",
              }}
            >
              👥 Corpo Clínico
            </h1>
            <p
              style={{ color: "#718096", margin: "4px 0 0", fontSize: "14px" }}
            >
              Conheça nossa equipe de fisioterapeutas
            </p>
          </div>

          {/* Filtros */}
          {todasEspecialidades.length > 0 && (
            <div style={{ marginTop: "20px", marginBottom: "24px" }}>
              <p
                style={{
                  fontSize: "13px",
                  color: "#a0aec0",
                  marginBottom: "8px",
                  marginTop: 0,
                }}
              >
                Filtrar por especialidade:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {todasEspecialidades.map((esp) => (
                  <button
                    key={esp}
                    onClick={() => toggleFiltro(esp)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      border:
                        filtroAtivo === esp ? "none" : "1px solid #3AAFA9",
                      backgroundColor:
                        filtroAtivo === esp ? "#3AAFA9" : "white",
                      color: filtroAtivo === esp ? "white" : "#3AAFA9",
                      fontWeight: filtroAtivo === esp ? "600" : "400",
                    }}
                  >
                    {esp}
                    {filtroAtivo === esp && (
                      <span style={{ marginLeft: "6px", opacity: 0.8 }}>✕</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lista de profissionais */}
          {profissionaisFiltrados.length === 0 ? (
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "60px 40px",
                textAlign: "center",
                border: "1px solid #e2e8f0",
              }}
            >
              <span style={{ fontSize: "64px" }}>🔍</span>
              <h2
                style={{
                  fontSize: "20px",
                  color: "#2d3748",
                  margin: "16px 0 8px",
                }}
              >
                Nenhum profissional encontrado
              </h2>
              <p style={{ color: "#718096", fontSize: "14px" }}>
                Nenhum profissional com a especialidade &quot;{filtroAtivo}
                &quot;.
              </p>
              <button
                onClick={() => setFiltroAtivo(null)}
                style={{
                  marginTop: "16px",
                  padding: "10px 24px",
                  backgroundColor: "#3AAFA9",
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Limpar filtro
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "20px",
              }}
            >
              {profissionaisFiltrados.map((prof) => {
                const aberto = expandido === prof.id;
                return (
                  <div
                    key={prof.id}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "20px",
                      border: aberto
                        ? "2px solid #3AAFA9"
                        : "1px solid #e2e8f0",
                      boxShadow: aberto
                        ? "0 8px 25px rgba(58,175,169,0.12)"
                        : "0 2px 8px rgba(0,0,0,0.04)",
                      transition: "all 0.2s",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ padding: "24px" }}>
                      {/* Cabeçalho do card */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          marginBottom: "16px",
                        }}
                      >
                        {prof.foto ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={prof.foto}
                            alt={prof.nome}
                            style={{
                              width: "56px",
                              height: "56px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              flexShrink: 0,
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "56px",
                              height: "56px",
                              borderRadius: "50%",
                              background:
                                "linear-gradient(135deg, #2B7A78, #3AAFA9)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              fontWeight: "bold",
                              fontSize: "18px",
                              flexShrink: 0,
                            }}
                          >
                            {iniciais(prof.nome)}
                          </div>
                        )}
                        <div>
                          <p
                            style={{
                              fontSize: "15px",
                              fontWeight: "700",
                              color: "#2d3748",
                              margin: "0 0 3px",
                            }}
                          >
                            {prof.nome}
                          </p>
                          <p
                            style={{
                              fontSize: "11px",
                              color: "#a0aec0",
                              margin: 0,
                              letterSpacing: "0.3px",
                            }}
                          >
                            {prof.crefito}
                          </p>
                        </div>
                      </div>

                      {/* Especialidades */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                          marginBottom: "16px",
                        }}
                      >
                        {prof.especialidades.map((esp) => (
                          <button
                            key={esp}
                            onClick={() => toggleFiltro(esp)}
                            style={{
                              padding: "4px 10px",
                              borderRadius: "20px",
                              fontSize: "11px",
                              cursor: "pointer",
                              transition: "all 0.15s",
                              border: "none",
                              backgroundColor:
                                filtroAtivo === esp ? "#2B7A78" : "#e6f7f5",
                              color: filtroAtivo === esp ? "white" : "#2B7A78",
                              fontWeight: "600",
                            }}
                          >
                            {esp}
                          </button>
                        ))}
                      </div>

                      {/* Bio expandida */}
                      {aberto && (
                        <div
                          style={{
                            fontSize: "13px",
                            color: "#4a5568",
                            lineHeight: "1.7",
                            marginBottom: "16px",
                            paddingTop: "16px",
                            borderTop: "1px solid #f0f4f7",
                          }}
                        >
                          {prof.bio}
                        </div>
                      )}

                      {/* Botões */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <button
                          onClick={() => toggleBio(prof.id)}
                          style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "12px",
                            border: "1px solid #e2e8f0",
                            backgroundColor: "white",
                            color: "#3AAFA9",
                            fontSize: "13px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#e6f7f5";
                            e.currentTarget.style.borderColor = "#3AAFA9";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "white";
                            e.currentTarget.style.borderColor = "#e2e8f0";
                          }}
                        >
                          {aberto ? "▲ Fechar perfil" : "▼ Ver perfil completo"}
                        </button>

                        <Link
                          href={`/schedule?profissionalId=${prof.id}&profissionalNome=${encodeURIComponent(prof.nome)}`}
                          style={{
                            display: "block",
                            width: "100%",
                            padding: "10px",
                            borderRadius: "12px",
                            border: "none",
                            background:
                              "linear-gradient(135deg, #2B7A78, #3AAFA9)",
                            color: "white",
                            fontSize: "13px",
                            fontWeight: "600",
                            cursor: "pointer",
                            textAlign: "center",
                            textDecoration: "none",
                            transition: "opacity 0.2s",
                            boxSizing: "border-box",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.opacity = "0.9")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.opacity = "1")
                          }
                        >
                          📅 Agendar com este profissional
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div
            style={{
              marginTop: "32px",
              textAlign: "center",
              fontSize: "12px",
              color: "#a0aec0",
              borderTop: "1px solid #e2e8f0",
              paddingTop: "16px",
            }}
          >
            © 2026 UnBemEstar — Todos os direitos reservados
          </div>
        </div>
      </main>
    </div>
  );
}
