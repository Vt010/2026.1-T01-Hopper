"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Dados mockados
  const [proximasConsultas] = useState([
    { id: 1, data: "10/06/2026", hora: "09:00", profissional: "Dra. Fernanda Lima", status: "confirmada" },
    { id: 2, data: "13/06/2026", hora: "11:00", profissional: "Dr. Carlos Mendes", status: "pendente" },
  ]);

  const [historico] = useState([
    { id: 3, data: "02/06/2026", hora: "10:00", profissional: "Dra. Fernanda Lima", status: "concluída" },
    { id: 4, data: "29/05/2026", hora: "14:00", profissional: "Dra. Fernanda Lima", status: "concluída" },
    { id: 5, data: "26/05/2026", hora: "10:00", profissional: "Dr. Carlos Mendes", status: "cancelada" },
  ]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setUser({ nome: "Paciente", email: "paciente@teste.com" });
        setLoading(false);
      } catch (error) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada": return { bg: "#d4edda", color: "#155724", label: "Confirmada" };
      case "pendente": return { bg: "#fff3cd", color: "#856404", label: "Pendente" };
      case "concluída": return { bg: "#cce5ff", color: "#004085", label: "Concluída" };
      case "cancelada": return { bg: "#f8d7da", color: "#721c24", label: "Cancelada" };
      default: return { bg: "#e2e3e5", color: "#383d41", label: status };
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f7f9"
      }}>
        <div style={{ fontSize: "18px", color: "#2B7A78" }}>Carregando...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f0f7f9",
      display: "flex",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* SIDEBAR */}
      <aside style={{
        width: "240px",
        minHeight: "100vh",
        backgroundColor: "#2B7A78",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
          <span style={{ fontSize: "28px" }}>🩺</span>
          <div>
            <h1 style={{ fontSize: "18px", fontWeight: "bold", color: "white", margin: 0 }}>
              Un<span style={{ fontWeight: "900" }}>Bem</span>Estar
            </h1>
            <p style={{ fontSize: "10px", color: "#8dd0c9", letterSpacing: "1px", margin: 0 }}>
              ÁREA DO PACIENTE
            </p>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          <Link href="/dashboard" style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            borderRadius: "10px",
            textDecoration: "none",
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "white",
            marginBottom: "4px"
          }}>
            <span>📊</span> Painel Principal
          </Link>
          <Link href="/schedule" style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            borderRadius: "10px",
            textDecoration: "none",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "4px"
          }}>
            <span>📅</span> Novo Agendamento
          </Link>
        </nav>

        <Link href="/login" style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 12px",
          borderRadius: "10px",
          textDecoration: "none",
          color: "rgba(255,255,255,0.5)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "16px"
        }}>
          <span>🚪</span> Sair
        </Link>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main style={{
        flex: 1,
        padding: "32px 40px",
        overflowY: "auto"
      }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#2B7A78", margin: 0 }}>
            Olá, {user?.nome || "Paciente"} 👋
          </h1>
          <p style={{ color: "#718096", fontSize: "14px", margin: "4px 0 0" }}>
            Aqui está um resumo das suas consultas
          </p>
        </div>

        {/* Cards de resumo */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "32px"
        }}>
          {[
            { label: "Próximas consultas", value: "2", icon: "📅", color: "#2B7A78" },
            { label: "Sessões concluídas", value: "12", icon: "✅", color: "#155724" },
            { label: "Cancelamentos", value: "1", icon: "❌", color: "#721c24" },
            { label: "Próxima sessão", value: "2 dias", icon: "⏳", color: "#856404" },
          ].map((card) => (
            <div key={card.label} style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{card.icon}</div>
              <div style={{ fontSize: "26px", fontWeight: "bold", color: card.color }}>
                {card.value}
              </div>
              <div style={{ fontSize: "13px", color: "#718096", marginTop: "4px" }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Próximas consultas */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          marginBottom: "24px",
          overflow: "hidden"
        }}>
          <div style={{
            padding: "16px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "#2B7A78", margin: 0 }}>
              📋 Próximas Consultas
            </h2>
            <Link href="/schedule" style={{
              backgroundColor: "#3AAFA9",
              color: "white",
              padding: "6px 16px",
              borderRadius: "20px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "bold"
            }}>
              + Novo agendamento
            </Link>
          </div>

          {proximasConsultas.length === 0 ? (
            <div style={{ padding: "40px 24px", textAlign: "center", color: "#718096" }}>
              Nenhuma consulta agendada.
            </div>
          ) : (
            proximasConsultas.map((consulta, index) => {
              const status = getStatusColor(consulta.status);
              return (
                <div key={consulta.id} style={{
                  padding: "14px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: index < proximasConsultas.length - 1 ? "1px solid #f0f4f8" : "none",
                  flexWrap: "wrap",
                  gap: "8px"
                }}>
                  <div>
                    <p style={{ fontWeight: "600", fontSize: "14px", color: "#2d3748", margin: 0 }}>
                      {consulta.profissional}
                    </p>
                    <p style={{ fontSize: "13px", color: "#718096", margin: "2px 0 0" }}>
                      {consulta.data} às {consulta.hora}
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

        {/* Histórico */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden"
        }}>
          <div style={{
            padding: "16px 24px",
            borderBottom: "1px solid #e2e8f0"
          }}>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "#2B7A78", margin: 0 }}>
              📜 Histórico de Consultas
            </h2>
          </div>
          {historico.map((item, index) => {
            const status = getStatusColor(item.status);
            return (
              <div key={item.id} style={{
                padding: "12px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: index < historico.length - 1 ? "1px solid #f0f4f8" : "none",
                opacity: item.status === "cancelada" ? 0.6 : 1,
                flexWrap: "wrap",
                gap: "8px"
              }}>
                <div>
                  <p style={{ fontWeight: "500", fontSize: "14px", color: "#2d3748", margin: 0 }}>
                    {item.profissional}
                  </p>
                  <p style={{ fontSize: "13px", color: "#718096", margin: "2px 0 0" }}>
                    {item.data} às {item.hora}
                  </p>
                </div>
                <span style={{
                  backgroundColor: status.bg,
                  color: status.color,
                  padding: "3px 10px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: "600"
                }}>
                  {status.label}
                </span>
              </div>
            );
          })}
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