"use client";

import Link from "next/link";
import { useState } from "react";

// ─── Componente de estatísticas ─────────────────────────────────────────────────

function StatCard({ icon, title, value, change, color }: { 
  icon: string; 
  title: string; 
  value: string; 
  change?: string; 
  color: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 24,
        padding: "24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        border: "1px solid rgba(42,181,160,0.08)",
        transition: "all 0.3s",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 28px rgba(42,181,160,0.1)";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 16,
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          {icon}
        </div>
        {change && (
          <span style={{ fontSize: 12, color: change.startsWith("+") ? "#2ab5a0" : "#e74c3c", background: change.startsWith("+") ? "rgba(42,181,160,0.1)" : "rgba(231,76,60,0.1)", padding: "4px 8px", borderRadius: 20 }}>
            {change}
          </span>
        )}
      </div>
      <h3 style={{ fontSize: 28, fontWeight: 800, color: "#1a2e2e", marginBottom: 4 }}>{value}</h3>
      <p style={{ fontSize: 13, color: "#5a7a7a", margin: 0 }}>{title}</p>
    </div>
  );
}

// ─── Componente de agendamento próximo ─────────────────────────────────────────

function NextAppointmentCard() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #2ab5a0, #1a8a7a)",
        borderRadius: 28,
        padding: "28px",
        color: "#fff",
        marginBottom: 32,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
        <div>
          <span style={{ fontSize: 12, opacity: 0.8, letterSpacing: "0.1em" }}>PRÓXIMA CONSULTA</span>
          <h2 style={{ fontSize: 28, fontWeight: 700, margin: "12px 0 8px" }}>Fisioterapia Ortopédica</h2>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
              📅 Segunda-feira, 10 de junho de 2026
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
              ⏰ 14:30 - 15:30
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
              👨‍⚕️ Dra. Ana Beatriz
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              padding: "10px 20px",
              borderRadius: 40,
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Remarcar
          </button>
          <button
            style={{
              background: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: 40,
              color: "#2ab5a0",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Componente de histórico de consultas ──────────────────────────────────────

function AppointmentHistory() {
  const appointments = [
    { date: "03/06/2026", time: "09:00", type: "Fisioterapia Ortopédica", professional: "Dr. Carlos Mendes", status: "Concluída", rating: 5 },
    { date: "27/05/2026", time: "14:30", type: "Pilates Terapêutico", professional: "Dra. Fernanda Lima", status: "Concluída", rating: 5 },
    { date: "20/05/2026", time: "11:00", type: "RPG e Postural", professional: "Dr. Rafael Sousa", status: "Concluída", rating: 4 },
    { date: "13/05/2026", time: "16:00", type: "Fisioterapia Esportiva", professional: "Dra. Beatriz Campos", status: "Concluída", rating: 5 },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Concluída": return { bg: "rgba(42,181,160,0.1)", text: "#2ab5a0" };
      case "Cancelada": return { bg: "rgba(231,76,60,0.1)", text: "#e74c3c" };
      default: return { bg: "rgba(42,181,160,0.1)", text: "#2ab5a0" };
    }
  };

  return (
    <div style={{ background: "#fff", borderRadius: 28, padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a2e2e", margin: 0 }}>Histórico de Consultas</h3>
        <Link href="/schedulee" style={{ color: "#2ab5a0", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
          Nova consulta →
        </Link>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e0e8e8" }}>
              <th style={{ textAlign: "left", padding: "12px 8px", fontSize: 13, fontWeight: 600, color: "#5a7a7a" }}>Data</th>
              <th style={{ textAlign: "left", padding: "12px 8px", fontSize: 13, fontWeight: 600, color: "#5a7a7a" }}>Horário</th>
              <th style={{ textAlign: "left", padding: "12px 8px", fontSize: 13, fontWeight: 600, color: "#5a7a7a" }}>Serviço</th>
              <th style={{ textAlign: "left", padding: "12px 8px", fontSize: 13, fontWeight: 600, color: "#5a7a7a" }}>Profissional</th>
              <th style={{ textAlign: "left", padding: "12px 8px", fontSize: 13, fontWeight: 600, color: "#5a7a7a" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app, idx) => {
              const statusColor = getStatusColor(app.status);
              return (
                <tr key={idx} style={{ borderBottom: "1px solid #f0f4f4" }}>
                  <td style={{ padding: "14px 8px", fontSize: 14, color: "#1a2e2e" }}>{app.date}</td>
                  <td style={{ padding: "14px 8px", fontSize: 14, color: "#5a7a7a" }}>{app.time}</td>
                  <td style={{ padding: "14px 8px", fontSize: 14, color: "#1a2e2e", fontWeight: 500 }}>{app.type}</td>
                  <td style={{ padding: "14px 8px", fontSize: 14, color: "#5a7a7a" }}>{app.professional}</td>
                  <td style={{ padding: "14px 8px" }}>
                    <span style={{ background: statusColor.bg, color: statusColor.text, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Componente de tratamentos ativos ──────────────────────────────────────────

function ActiveTreatments() {
  const treatments = [
    { name: "Fisioterapia Ortopédica", progress: 75, sessions: "12/16 sessões", nextSession: "10/06/2026" },
    { name: "Pilates Terapêutico", progress: 40, sessions: "6/15 sessões", nextSession: "12/06/2026" },
  ];

  return (
    <div style={{ background: "#fff", borderRadius: 28, padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a2e2e", marginBottom: 24 }}>Tratamentos Ativos</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {treatments.map((treatment, idx) => (
          <div key={idx}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
              <span style={{ fontWeight: 600, color: "#1a2e2e" }}>{treatment.name}</span>
              <span style={{ fontSize: 13, color: "#5a7a7a" }}>{treatment.sessions}</span>
            </div>
            <div style={{ background: "#e8f4f2", borderRadius: 20, height: 8, overflow: "hidden", marginBottom: 8 }}>
              <div style={{ width: `${treatment.progress}%`, background: "#2ab5a0", height: "100%", borderRadius: 20 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#5a7a7a" }}>
              <span>Progresso: {treatment.progress}%</span>
              <span>Próxima: {treatment.nextSession}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Componente de sidebar ─────────────────────────────────────────────────────

function DashboardSidebar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const menuItems = [
    { id: "overview", icon: "📊", label: "Visão Geral" },
    { id: "appointments", icon: "📅", label: "Minhas Consultas" },
    { id: "treatments", icon: "💪", label: "Tratamentos" },
    { id: "profile", icon: "👤", label: "Meu Perfil" },
    { id: "payments", icon: "💰", label: "Pagamentos" },
  ];

  return (
    <aside
      style={{
        background: "#fff",
        borderRadius: 28,
        padding: "28px 20px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        height: "fit-content",
        position: "sticky",
        top: 90,
      }}
    >
      {/* Perfil do usuário */}
      <div style={{ textAlign: "center", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid #e0e8e8" }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#2ab5a0,#1a5c5c)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
            fontSize: 32,
          }}
        >
          👤
        </div>
        <h4 style={{ fontSize: 16, fontWeight: 700, color: "#1a2e2e", marginBottom: 4 }}>Ana Martins</h4>
        <p style={{ fontSize: 12, color: "#5a7a7a" }}>ana.martins@email.com</p>
      </div>

      {/* Menu */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              background: activeTab === item.id ? "linear-gradient(135deg, rgba(42,181,160,0.1), rgba(42,181,160,0.05))" : "transparent",
              border: "none",
              borderRadius: 16,
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              transition: "all 0.2s",
              color: activeTab === item.id ? "#2ab5a0" : "#5a7a7a",
              fontWeight: activeTab === item.id ? 600 : 500,
            }}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 14 }}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Botão sair */}
      <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid #e0e8e8" }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 16px",
            color: "#e74c3c",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <span style={{ fontSize: 20 }}>🚪</span>
          <span>Sair</span>
        </Link>
      </div>
    </aside>
  );
}

// ─── Componente de perfil ──────────────────────────────────────────────────────

function ProfileTab() {
  return (
    <div style={{ background: "#fff", borderRadius: 28, padding: "32px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      <h3 style={{ fontSize: 22, fontWeight: 700, color: "#1a2e2e", marginBottom: 24 }}>Meu Perfil</h3>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#5a7a7a", marginBottom: 6 }}>Nome completo</label>
          <p style={{ fontSize: 16, color: "#1a2e2e", fontWeight: 500, padding: "8px 0", borderBottom: "1px solid #e0e8e8" }}>Ana Martins da Silva</p>
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#5a7a7a", marginBottom: 6 }}>E-mail</label>
          <p style={{ fontSize: 16, color: "#1a2e2e", fontWeight: 500, padding: "8px 0", borderBottom: "1px solid #e0e8e8" }}>ana.martins@email.com</p>
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#5a7a7a", marginBottom: 6 }}>Telefone</label>
          <p style={{ fontSize: 16, color: "#1a2e2e", fontWeight: 500, padding: "8px 0", borderBottom: "1px solid #e0e8e8" }}>(61) 99999-9999</p>
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#5a7a7a", marginBottom: 6 }}>Data de nascimento</label>
          <p style={{ fontSize: 16, color: "#1a2e2e", fontWeight: 500, padding: "8px 0", borderBottom: "1px solid #e0e8e8" }}>15/03/1985</p>
        </div>
      </div>

      <button
        style={{
          marginTop: 32,
          background: "#2ab5a0",
          color: "#fff",
          padding: "12px 28px",
          borderRadius: 40,
          border: "none",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Editar Perfil
      </button>
    </div>
  );
}

// ─── Componente de pagamentos ──────────────────────────────────────────────────

function PaymentsTab() {
  const payments = [
    { date: "01/06/2026", description: "Consulta - Fisioterapia Ortopédica", amount: "R$ 180,00", status: "Pago", method: "Cartão de Crédito" },
    { date: "25/05/2026", description: "Pacote Pilates - 4 sessões", amount: "R$ 320,00", status: "Pago", method: "PIX" },
    { date: "18/05/2026", description: "Consulta - RPG e Postural", amount: "R$ 180,00", status: "Pago", method: "Cartão de Débito" },
  ];

  return (
    <div style={{ background: "#fff", borderRadius: 28, padding: "32px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: "#1a2e2e", margin: 0 }}>Histórico de Pagamentos</h3>
        <button style={{ background: "#2ab5a0", color: "#fff", padding: "10px 20px", borderRadius: 40, border: "none", fontWeight: 600, cursor: "pointer" }}>
          + Adicionar Pagamento
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e0e8e8" }}>
              <th style={{ textAlign: "left", padding: "12px 8px", fontSize: 13, fontWeight: 600, color: "#5a7a7a" }}>Data</th>
              <th style={{ textAlign: "left", padding: "12px 8px", fontSize: 13, fontWeight: 600, color: "#5a7a7a" }}>Descrição</th>
              <th style={{ textAlign: "left", padding: "12px 8px", fontSize: 13, fontWeight: 600, color: "#5a7a7a" }}>Valor</th>
              <th style={{ textAlign: "left", padding: "12px 8px", fontSize: 13, fontWeight: 600, color: "#5a7a7a" }}>Forma de Pagamento</th>
              <th style={{ textAlign: "left", padding: "12px 8px", fontSize: 13, fontWeight: 600, color: "#5a7a7a" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #f0f4f4" }}>
                <td style={{ padding: "14px 8px", fontSize: 14, color: "#5a7a7a" }}>{payment.date}</td>
                <td style={{ padding: "14px 8px", fontSize: 14, color: "#1a2e2e" }}>{payment.description}</td>
                <td style={{ padding: "14px 8px", fontSize: 14, fontWeight: 600, color: "#1a2e2e" }}>{payment.amount}</td>
                <td style={{ padding: "14px 8px", fontSize: 14, color: "#5a7a7a" }}>{payment.method}</td>
                <td style={{ padding: "14px 8px" }}>
                  <span style={{ background: "rgba(42,181,160,0.1)", color: "#2ab5a0", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Página principal do Dashboard ─────────────────────────────────────────────

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{ minHeight: "100vh", paddingTop: "80px", background: "#e8f4f2" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "32px 24px" }}>
        
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 8 }}>
            <h1 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 800, color: "#1a2e2e", margin: 0 }}>
              Olá, Ana! 👋
            </h1>
            <Link 
              href="/schedulee" 
              style={{
                background: "linear-gradient(135deg,#2ab5a0,#1a8a7a)",
                color: "#fff",
                padding: "12px 28px",
                borderRadius: 40,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
                boxShadow: "0 4px 12px rgba(42,181,160,0.25)",
              }}
            >
              📅 Nova Consulta
            </Link>
          </div>
          <p style={{ color: "#5a7a7a" }}>Acompanhe seus tratamentos, consultas e muito mais.</p>
        </div>

        {/* Grid principal */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 32 }}>
          <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {activeTab === "overview" && (
              <>
                {/* Cards de estatísticas */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
                  <StatCard icon="📅" title="Consultas Realizadas" value="12" change="+2" color="rgba(42,181,160,0.1)" />
                  <StatCard icon="⏳" title="Próximas Consultas" value="3" change="+1" color="rgba(42,181,160,0.1)" />
                  <StatCard icon="💪" title="Tratamentos Ativos" value="2" change="" color="rgba(42,181,160,0.1)" />
                  <StatCard icon="💰" title="Total Investido" value="R$ 1.860" change="+R$ 320" color="rgba(42,181,160,0.1)" />
                </div>

                {/* Próxima consulta */}
                <NextAppointmentCard />

                {/* Grid de tratamentos e histórico */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 32 }}>
                  <ActiveTreatments />
                  <div style={{ background: "#fff", borderRadius: 28, padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a2e2e", marginBottom: 16 }}>Recomendações</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      <li style={{ padding: "12px 0", borderBottom: "1px solid #f0f4f4", display: "flex", gap: 12 }}>
                        <span>🧘</span>
                        <span style={{ fontSize: 14, color: "#5a7a7a" }}>Continue os exercícios de alongamento diários</span>
                      </li>
                      <li style={{ padding: "12px 0", borderBottom: "1px solid #f0f4f4", display: "flex", gap: 12 }}>
                        <span>💧</span>
                        <span style={{ fontSize: 14, color: "#5a7a7a" }}>Beba bastante água antes das sessões</span>
                      </li>
                      <li style={{ padding: "12px 0", borderBottom: "1px solid #f0f4f4", display: "flex", gap: 12 }}>
                        <span>📝</span>
                        <span style={{ fontSize: 14, color: "#5a7a7a" }}>Traga seus exames na próxima consulta</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Histórico de consultas */}
                <AppointmentHistory />
              </>
            )}

            {activeTab === "appointments" && <AppointmentHistory />}
            {activeTab === "treatments" && <ActiveTreatments />}
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "payments" && <PaymentsTab />}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}