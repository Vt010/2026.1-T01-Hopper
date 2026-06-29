"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Wrench,
  Users,
  LogOut,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

interface Consulta {
  id: string;
  data: string;
  hora: string;
  profissional: string;
  servico: string;
  status: "confirmada" | "pendente" | "concluída" | "cancelada";
}

interface ProximaConsulta {
  id: string;
  data: string;
  hora: string;
  profissional: string;
  servico: string;
}

// ID fixo para testes (substituir pelo real depois)
const USER_ID_FIXO = "user-teste-123";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<{ nome: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [proximaConsulta, setProximaConsulta] = useState<ProximaConsulta | null>(null);
  const [ultimasConsultas, setUltimasConsultas] = useState<Consulta[]>([]);
  const [stats, setStats] = useState({
    totalConsultas: 0,
    concluidas: 0,
    canceladas: 0,
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);

        //  Usar ID fixo (sem Supabase Auth)
        const userId = USER_ID_FIXO;

        // tentar buscar dados reais, com fallback para mock
        let userData = { nome: "Paciente Teste", email: "paciente@teste.com" };
        let consultasMock: Consulta[] = [];

        try {
          // Tenta buscar do backend
          const userRes = await fetch(`/api/users/${userId}`);
          if (userRes.ok) {
            const data = await userRes.json();
            userData = { nome: data.nome || "Paciente", email: data.email };
          }
        } catch {
          // fallback: dados mockados
          console.log("Usando dados mockados (API não disponível)");
        }

        setUser(userData);

        // mock de consultas (enquanto a API não existe)
        consultasMock = [
          { id: "1", data: "2026-07-10", hora: "09:00", profissional: "Dra. Fernanda Lima", servico: "Fisioterapia Ortopédica", status: "confirmada" },
          { id: "2", data: "2026-06-02", hora: "10:00", profissional: "Dra. Fernanda Lima", servico: "RPG", status: "concluída" },
          { id: "3", data: "2026-05-29", hora: "14:00", profissional: "Dr. Carlos Mendes", servico: "Pilates", status: "concluída" },
          { id: "4", data: "2026-05-26", hora: "10:00", profissional: "Dra. Fernanda Lima", servico: "Fisioterapia", status: "cancelada" },
        ];

        // calcular estatísticas
        const total = consultasMock.length;
        const concluidas = consultasMock.filter(c => c.status === "concluída").length;
        const canceladas = consultasMock.filter(c => c.status === "cancelada").length;
        setStats({ totalConsultas: total, concluidas, canceladas });

        // encontrar próxima consulta
        const futuras = consultasMock
          .filter(c => c.status === "confirmada" || c.status === "pendente")
          .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

        setProximaConsulta(futuras.length > 0 ? futuras[0] : null);

        // ultimas 3 consultas (concluídas ou canceladas)
        const ultimas = consultasMock
          .filter(c => c.status === "concluída" || c.status === "cancelada")
          .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
          .slice(0, 3);
        setUltimasConsultas(ultimas);

      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
        // Fallback seguro
        setUser({ nome: "Paciente", email: "paciente@teste.com" });
        setProximaConsulta({
          id: "1",
          data: "2026-07-10",
          hora: "09:00",
          profissional: "Dra. Fernanda Lima",
          servico: "Fisioterapia Ortopédica",
        });
        setUltimasConsultas([
          { id: "2", data: "2026-06-02", hora: "10:00", profissional: "Dra. Fernanda Lima", servico: "RPG", status: "concluída" },
          { id: "3", data: "2026-05-29", hora: "14:00", profissional: "Dr. Carlos Mendes", servico: "Pilates", status: "concluída" },
          { id: "4", data: "2026-05-26", hora: "10:00", profissional: "Dra. Fernanda Lima", servico: "Fisioterapia", status: "cancelada" },
        ]);
        setStats({ totalConsultas: 5, concluidas: 3, canceladas: 2 });
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada": return { bg: "#d4edda", color: "#155724", label: "Confirmada" };
      case "pendente": return { bg: "#fff3cd", color: "#856404", label: "Pendente" };
      case "concluída": return { bg: "#cce5ff", color: "#004085", label: "Concluída" };
      case "cancelada": return { bg: "#f8d7da", color: "#721c24", label: "Cancelada" };
      default: return { bg: "#e2e3e5", color: "#383d41", label: status };
    }
  };

  const getSaudacao = () => {
    const hora = new Date().getHours();
    if (hora < 12) return "Bom dia";
    if (hora < 18) return "Boa tarde";
    return "Boa noite";
  };

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

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F0F7F9"
      }}>
        <div style={{ fontSize: "16px", color: "#2B7A78", fontWeight: 600 }}>
          Carregando...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#F0F7F9",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* SIDEBAR */}
      <aside style={{
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
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: isMobile ? 0 : "32px" }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "4px",
            display: "flex",
          }}>
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
              <h1 style={{ fontSize: "18px", fontWeight: "bold", color: "white", margin: 0 }}>
                Un<span style={{ fontWeight: "900" }}>Bem</span>Estar
              </h1>
              <p style={{ fontSize: "10px", color: "#cbd5e1", letterSpacing: "1px", margin: 0 }}>
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
      <main style={{
        flex: 1,
        padding: isMobile ? "20px" : "32px 40px",
        overflowY: "auto"
      }}>
        {/* Card "Bem-vindo" */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: isMobile ? "20px" : "24px 32px",
          marginBottom: "24px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <div>
            <h1 style={{
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: "bold",
              color: "#2B7A78",
              margin: 0
            }}>
              {getSaudacao()}, {user?.nome || "Paciente"} 👋
            </h1>
            <p style={{ color: "#718096", fontSize: "14px", margin: "4px 0 0" }}>
              {user?.email || ""}
            </p>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#e6f7f5",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "13px",
            color: "#2B7A78",
            fontWeight: 600,
          }}>
            <Stethoscope size={16} /> {stats.totalConsultas} consultas no total
          </div>
        </div>

        {/* Grid responsivo: 2 colunas no desktop, 1 no mobile */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "24px",
          marginBottom: "32px"
        }}>

          {/* Card "Próxima Consulta" */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
          }}>
            <h2 style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2B7A78",
              margin: "0 0 16px 0"
            }}>
              <Calendar size={18} /> Próxima Consulta
            </h2>
            {proximaConsulta ? (
              <div>
                <p style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#2d3748",
                  margin: "0 0 8px 0"
                }}>
                  {new Date(proximaConsulta.data + "T12:00:00").toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                  })} às {proximaConsulta.hora}
                </p>
                <p style={{ fontSize: "14px", color: "#718096", margin: "0" }}>
                  <strong>Profissional:</strong> {proximaConsulta.profissional}
                </p>
                <p style={{ fontSize: "14px", color: "#718096", margin: "4px 0 0" }}>
                  <strong>Serviço:</strong> {proximaConsulta.servico}
                </p>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{ color: "#718096" }}>Nenhuma consulta agendada</p>
                <Link href="/schedule">
                  <button
                    style={{
                      marginTop: "12px",
                      padding: "10px 24px",
                      backgroundColor: "#3AAFA9",
                      color: "white",
                      border: "none",
                      borderRadius: "30px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      transition: "all 0.2s",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#2B7A78";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#3AAFA9";
                    }}
                  >
                    Agendar agora <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Card "Acesso Rápido" */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
          }}>
            <h2 style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2B7A78",
              margin: "0 0 16px 0"
            }}>
               Acesso Rápido
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px"
            }}>
              {[
                { href: "/schedule", label: "Agendar", Icon: Calendar },
                { href: "/historico", label: "Histórico", Icon: FileText },
                { href: "/servicos", label: "Serviços", Icon: Wrench },
                { href: "/equipe", label: "Equipe", Icon: Users },
              ].map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    padding: "14px",
                    backgroundColor: "#F0F7F9",
                    borderRadius: "12px",
                    textDecoration: "none",
                    color: "#2d3748",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.2s",
                    border: "1px solid transparent"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e6f7f5";
                    e.currentTarget.style.borderColor = "#3AAFA9";
                    e.currentTarget.style.color = "#2B7A78";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#F0F7F9";
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.color = "#2d3748";
                  }}
                >
                  <Icon size={20} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Card "Últimas Consultas" */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <div style={{
            padding: "16px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "#2B7A78", margin: 0 }}>
              📜 Últimas Consultas
            </h2>
            <Link
              href="/historico"
              style={{
                fontSize: "13px",
                color: "#3AAFA9",
                textDecoration: "none",
                fontWeight: 600,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#2B7A78";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#3AAFA9";
              }}
            >
              Ver todas →
            </Link>
          </div>

          {ultimasConsultas.length === 0 ? (
            <div style={{ padding: "40px 24px", textAlign: "center", color: "#718096" }}>
              Nenhuma consulta realizada ainda.
            </div>
          ) : (
            ultimasConsultas.map((consulta, index) => {
              const status = getStatusColor(consulta.status);
              return (
                <div key={consulta.id} style={{
                  padding: "14px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: index < ultimasConsultas.length - 1 ? "1px solid #f0f4f8" : "none",
                  flexWrap: "wrap",
                  gap: "8px"
                }}>
                  <div>
                    <p style={{ fontWeight: "600", fontSize: "14px", color: "#2d3748", margin: 0 }}>
                      {consulta.profissional}
                    </p>
                    <p style={{ fontSize: "13px", color: "#718096", margin: "2px 0 0" }}>
                      {new Date(consulta.data + "T12:00:00").toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })} às {consulta.hora} — {consulta.servico}
                    </p>
                  </div>
                  <span style={{
                    backgroundColor: status.bg,
                    color: status.color,
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}>
                    {status.label}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div style={{
          marginTop: "32px",
          textAlign: "center",
          fontSize: "12px",
          color: "#a0aec0",
          borderTop: "1px solid #e2e8f0",
          paddingTop: "16px"
        }}>
          © 2026 UnBemEstar — Todos os direitos reservados
        </div>
      </main>
    </div>
  );
}