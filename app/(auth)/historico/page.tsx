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
} from "lucide-react";

interface Consulta {
  id: string;
  data: string;
  hora: string;
  profissional: string;
  servico: string;
  status: "confirmada" | "pendente" | "concluída" | "cancelada";
  podeCancelar?: boolean;
}

// ──────────────────────────────────────────────
// SIDEBAR — logo e ícones idênticos à landing page
// ──────────────────────────────────────────────
function Sidebar({ activeHref }: { activeHref: string }) {
  const navLinks = [
    {
      href: "/dashboard",
      icon: <LayoutDashboard size={16} />,
      label: "Painel Principal",
    },
    {
      href: "/schedule",
      icon: <Calendar size={16} />,
      label: "Novo Agendamento",
    },
    {
      href: "/historico",
      icon: <ClipboardList size={16} />,
      label: "Histórico",
    },
    { href: "/servicos", icon: <Wrench size={16} />, label: "Serviços" },
    { href: "/contributors", icon: <Users size={16} />, label: "Equipe" },
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "32px",
        }}
      >
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
          <h1
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "white",
              margin: 0,
              lineHeight: 1,
            }}
          >
            Un<span style={{ fontWeight: "900" }}>Bem</span>Estar
          </h1>
          <p
            style={{
              fontSize: "10px",
              color: "#cbd5e1",
              letterSpacing: "1px",
              margin: "3px 0 0",
            }}
          >
            ÁREA DO PACIENTE
          </p>
        </div>
      </div>

      {/* Nav links */}
      <nav
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
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
                backgroundColor: active
                  ? "rgba(255,255,255,0.18)"
                  : "transparent",
                color: active ? "white" : "rgba(255,255,255,0.70)",
                fontSize: "14px",
                fontWeight: active ? "600" : "400",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!active)
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.10)";
              }}
              onMouseLeave={(e) => {
                if (!active)
                  e.currentTarget.style.backgroundColor = "transparent";
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
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(255,255,255,0.45)";
        }}
      >
        <LogOut size={16} /> Sair
      </Link>
    </aside>
  );
}

// ──────────────────────────────────────────────
// SKELETON BAR
// ──────────────────────────────────────────────
function SkeletonBar({
  width,
  height = 14,
}: {
  width: string;
  height?: number;
}) {
  return (
    <div
      style={{
        height,
        backgroundColor: "#e2e8f0",
        borderRadius: "4px",
        width,
        marginBottom: "6px",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
  );
}



  function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f7f9",
        display: "flex",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }`}</style>
      <Sidebar activeHref="/historico" />
      {children}
    </div>
  );
}  




// ──────────────────────────────────────────────
// PÁGINA
// ──────────────────────────────────────────────
export default function HistoricoPage() {
  const router = useRouter();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [abaAtiva, setAbaAtiva] = useState<"proximas" | "historico">(
    "proximas",
  );
  const [cancelando, setCancelando] = useState<string | null>(null);

  

  useEffect(() => {
    async function fetchConsultas() {
      try {
        setLoading(true);
        setError(null);

        // 🔁 Substituir pelo ID real do usuário logado
        const userId = "user-teste-123";
        let data: Consulta[] = [];

        try {
          const res = await fetch(`/api/appointments/patient/${userId}`);
          if (res.ok) data = await res.json();
        } catch {
          console.log("Usando dados mockados (API não disponível)");
        }

        if (data.length === 0) {
          await new Promise((r) => setTimeout(r, 600));
          data = [
            {
              id: "1",
              data: "2026-07-15",
              hora: "09:00",
              profissional: "Dra. Fernanda Lima",
              servico: "Fisioterapia Ortopédica",
              status: "confirmada",
              podeCancelar: true,
            },
            {
              id: "2",
              data: "2026-07-22",
              hora: "14:00",
              profissional: "Dr. Carlos Mendes",
              servico: "RPG",
              status: "pendente",
              podeCancelar: true,
            },
            {
              id: "3",
              data: "2026-06-10",
              hora: "10:00",
              profissional: "Dra. Fernanda Lima",
              servico: "Fisioterapia Neurológica",
              status: "concluída",
              podeCancelar: false,
            },
            {
              id: "4",
              data: "2026-05-29",
              hora: "14:00",
              profissional: "Dr. Carlos Mendes",
              servico: "Pilates Terapêutico",
              status: "concluída",
              podeCancelar: false,
            },
            {
              id: "5",
              data: "2026-05-26",
              hora: "10:00",
              profissional: "Dra. Fernanda Lima",
              servico: "Fisioterapia Ortopédica",
              status: "cancelada",
              podeCancelar: false,
            },
            {
              id: "6",
              data: "2026-06-05",
              hora: "11:00",
              profissional: "Dra. Marina Costa",
              servico: "Fisioterapia Respiratória",
              status: "concluída",
              podeCancelar: false,
            },
          ];
        }

        setConsultas(data);
      } catch (err) {
        setError("Erro ao carregar consultas. Tente novamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchConsultas();
  }, []);

  const handleCancelar = async (consultaId: string) => {
    if (!confirm("Tem certeza que deseja cancelar esta consulta?")) return;
    setCancelando(consultaId);
    try {
      // 🔁 Substituir pela chamada real:
      // await fetch(`/api/appointments/${consultaId}/cancel`, { method: "POST" });
      await new Promise((r) => setTimeout(r, 800));
      setConsultas((prev) =>
        prev.map((c) =>
          c.id === consultaId
            ? { ...c, status: "cancelada", podeCancelar: false }
            : c,
        ),
      );
      alert("✅ Consulta cancelada com sucesso!");
    } catch (err) {
      alert("Erro ao cancelar consulta. Tente novamente.");
      console.error(err);
    } finally {
      setCancelando(null);
    }
  };

  const handleRemarcar = (consultaId: string) => {
    router.push(`/schedule?remarcar=${consultaId}`);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmada":
        return { bg: "#d4edda", color: "#155724", label: "Confirmada" };
      case "pendente":
        return { bg: "#fff3cd", color: "#856404", label: "Pendente" };
      case "concluída":
        return { bg: "#e6f7f5", color: "#2B7A78", label: "Concluída" };
      case "cancelada":
        return { bg: "#f8d7da", color: "#721c24", label: "Cancelada" };
      default:
        return { bg: "#e2e3e5", color: "#383d41", label: status };
    }
  };

  const formatarData = (data: string) =>
    new Date(data + "T12:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const proximas = consultas.filter(
    (c) => c.status === "confirmada" || c.status === "pendente",
  );
  const historicoList = consultas.filter(
    (c) => c.status === "concluída" || c.status === "cancelada",
  );
  const consultasFiltradas = abaAtiva === "proximas" ? proximas : historicoList;



  // ── Loading skeleton ──
  if (loading) {
    return (
      <Shell>
        <main style={{ flex: 1, padding: "40px 48px" }}>
          <div style={{ marginBottom: "28px" }}>
            <SkeletonBar width="260px" height={28} />
            <SkeletonBar width="200px" />
          </div>
          <SkeletonBar width="320px" height={44} />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "20px 24px",
                border: "1px solid #e2e8f0",
                marginBottom: "12px",
                marginTop: i === 1 ? "24px" : 0,
              }}
            >
              <SkeletonBar width="40%" height={18} />
              <SkeletonBar width="60%" />
              <SkeletonBar width="30%" />
            </div>
          ))}
        </main>
      </Shell>
    );
  }

  // ── Erro ──
  if (error) {
    return (
      <Shell>
        <main
          style={{
            flex: 1,
            padding: "40px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#3AAFA9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2B7A78";
              }}
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
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "28px",
              color: "#2B7A78",
              margin: 0,
              fontWeight: "bold",
            }}
          >
            Histórico de Consultas
          </h1>
          <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: "15px" }}>
            Acompanhe todas as suas consultas
          </p>
        </div>

        {/* Abas */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "24px",
            backgroundColor: "white",
            borderRadius: "14px",
            padding: "4px",
            border: "1px solid #e2e8f0",
            maxWidth: "480px",
          }}
        >
          {(["proximas", "historico"] as const).map((aba) => {
            const isAtiva = abaAtiva === aba;
            return (
              <button
                key={aba}
                onClick={() => setAbaAtiva(aba)}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: isAtiva ? "#2B7A78" : "transparent",
                  color: isAtiva ? "white" : "#64748b",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: isAtiva ? "600" : "400",
                  transition: "all 0.2s",
                }}
              >
                {aba === "proximas"
                  ? `📅 Próximas (${proximas.length})`
                  : `📜 Histórico (${historicoList.length})`}
              </button>
            );
          })}
        </div>

        {/* Lista vazia */}
        {consultasFiltradas.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "60px 40px",
              textAlign: "center",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <span style={{ fontSize: "64px" }}>📭</span>
            <h2
              style={{
                fontSize: "20px",
                color: "#2d3748",
                margin: "16px 0 8px",
              }}
            >
              {abaAtiva === "proximas"
                ? "Nenhuma consulta agendada"
                : "Nenhuma consulta no histórico"}
            </h2>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              {abaAtiva === "proximas"
                ? "Agende sua primeira consulta agora mesmo!"
                : "Suas consultas realizadas aparecerão aqui."}
            </p>
            {abaAtiva === "proximas" && (
              <Link href="/schedule">
                <button
                  style={{
                    marginTop: "20px",
                    padding: "12px 28px",
                    backgroundColor: "#2B7A78",
                    color: "white",
                    border: "none",
                    borderRadius: "30px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#3AAFA9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#2B7A78";
                  }}
                >
                  + Agendar agora
                </button>
              </Link>
            )}
          </div>
        ) : (
          consultasFiltradas.map((consulta) => {
            const status = getStatusStyle(consulta.status);
            return (
              <div
                key={consulta.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  border: "1px solid #e2e8f0",
                  marginBottom: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#2d3748",
                          margin: 0,
                        }}
                      >
                        {consulta.profissional}
                      </h3>
                      <span
                        style={{
                          backgroundColor: status.bg,
                          color: status.color,
                          padding: "3px 12px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: "600",
                          letterSpacing: "0.3px",
                        }}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#64748b",
                        margin: "6px 0 2px",
                      }}
                    >
                      📅 {formatarData(consulta.data)} às {consulta.hora}
                    </p>
                    <p
                      style={{ fontSize: "14px", color: "#64748b", margin: 0 }}
                    >
                      🛠️ {consulta.servico}
                    </p>
                  </div>

                  {/* Ações */}
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {consulta.status === "confirmada" ||
                    consulta.status === "pendente" ? (
                      <>
                        <button
                          onClick={() => handleRemarcar(consulta.id)}
                          style={{
                            padding: "7px 18px",
                            backgroundColor: "transparent",
                            color: "#3AAFA9",
                            border: "1.5px solid #3AAFA9",
                            borderRadius: "30px",
                            fontSize: "12px",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#e6f7f5";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }}
                        >
                          📅 Remarcar
                        </button>
                        {consulta.podeCancelar && (
                          <button
                            onClick={() => handleCancelar(consulta.id)}
                            disabled={cancelando === consulta.id}
                            style={{
                              padding: "7px 18px",
                              backgroundColor: "transparent",
                              color: "#dc2626",
                              border: "1.5px solid #dc2626",
                              borderRadius: "30px",
                              fontSize: "12px",
                              fontWeight: "500",
                              cursor:
                                cancelando === consulta.id
                                  ? "not-allowed"
                                  : "pointer",
                              opacity: cancelando === consulta.id ? 0.5 : 1,
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              if (cancelando !== consulta.id)
                                e.currentTarget.style.backgroundColor =
                                  "#fef2f2";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                            }}
                          >
                            {cancelando === consulta.id
                              ? "Cancelando..."
                              : "❌ Cancelar"}
                          </button>
                        )}
                      </>
                    ) : (
                      <span style={{ fontSize: "13px", color: "#a0aec0" }}>
                        {consulta.status === "concluída"
                          ? "✅ Realizada"
                          : "❌ Cancelada"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

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
          © 2026 UnBemEstar — Todos os direitos reservados &nbsp;·&nbsp;
          Desenvolvido por alunos da UnB — MDS 2026.1
        </div>
      </main>
    </Shell>
  );
}
