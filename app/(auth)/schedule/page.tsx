"use client";

import Link from "next/link";
import { useState } from "react";

export default function SchedulePage() {
  // Estados
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [horarios, setHorarios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  // Buscar horários disponíveis (simulado)
  const buscarHorarios = async () => {
    if (!selectedDate) {
      setMessage("Por favor, selecione uma data.");
      return;
    }

    setLoading(true);
    setMessage("");
    setHorarios([]);
    setSelectedTime("");

    try {
      // 🔁 Substituir pela chamada real da API posteriormente
      await new Promise((resolve) => setTimeout(resolve, 800));
      const horariosGerados = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
      setHorarios(horariosGerados);
      setStep(2);
    } catch (error) {
      setMessage("Erro ao buscar horários. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Confirmar agendamento
  const confirmarAgendamento = () => {
    if (!selectedTime) {
      setMessage("Selecione um horário para continuar.");
      return;
    }

    setMessage("");
    alert(`✅ Agendamento confirmado para ${selectedDate} às ${selectedTime}!`);
    // Aqui você pode adicionar a lógica para salvar no backend
  };

  // Voltar para seleção de data
  const voltar = () => {
    setStep(1);
    setHorarios([]);
    setSelectedTime("");
    setMessage("");
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f0f7f9",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* ========== SIDEBAR ========== */}
      <aside style={{
        width: "240px",
        backgroundColor: "#2B7A78",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "sticky",
        top: 0
      }}>
        {/* Logo */}
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

        {/* Navegação */}
        <nav style={{ flex: 1 }}>
          <Link href="/dashboard" style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            borderRadius: "10px",
            textDecoration: "none",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "4px",
            transition: "all 0.2s"
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
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "white",
            marginBottom: "4px"
          }}>
            <span>📅</span> Novo Agendamento
          </Link>
        </nav>

        {/* Logout */}
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

      {/* ========== CONTEÚDO PRINCIPAL ========== */}
      <main style={{
        flex: 1,
        padding: "40px",
        overflowY: "auto"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Cabeçalho */}
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{
              fontSize: "28px",
              color: "#2B7A78",
              margin: 0,
              fontWeight: "bold"
            }}>
              📅 Agendamento de Consulta
            </h1>
            <p style={{ color: "#718096", margin: "4px 0 0", fontSize: "14px" }}>
              {step === 1 ? "Selecione uma data para ver os horários disponíveis." : "Escolha um horário para confirmar seu agendamento."}
            </p>
          </div>

          {/* Progresso */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: step >= 1 ? "#3AAFA9" : "#e2e8f0",
                color: step >= 1 ? "white" : "#a0aec0",
                fontWeight: "bold",
                fontSize: "13px"
              }}>
                1
              </span>
              <span style={{ color: step >= 1 ? "#2B7A78" : "#a0aec0", fontSize: "13px" }}>
                Data
              </span>
            </div>
            <div style={{
              flex: 1,
              height: "2px",
              backgroundColor: step >= 2 ? "#3AAFA9" : "#e2e8f0"
            }} />
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: step >= 2 ? "#3AAFA9" : "#e2e8f0",
                color: step >= 2 ? "white" : "#a0aec0",
                fontWeight: "bold",
                fontSize: "13px"
              }}>
                2
              </span>
              <span style={{ color: step >= 2 ? "#2B7A78" : "#a0aec0", fontSize: "13px" }}>
                Horário
              </span>
            </div>
          </div>

          {/* Mensagens */}
          {message && (
            <div style={{
              padding: "12px 16px",
              borderRadius: "12px",
              marginBottom: "24px",
              backgroundColor: "#fef2f2",
              color: "#dc2626",
              border: "1px solid #fecaca"
            }}>
              {message}
            </div>
          )}

          {/* PASSO 1: Seleção de Data */}
          {step === 1 && (
            <div style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "32px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}>
              <label style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "8px"
              }}>
                Selecione a data desejada:
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  fontSize: "16px",
                  outline: "none",
                  transition: "all 0.2s"
                }}
              />
              <button
                onClick={buscarHorarios}
                disabled={loading}
                style={{
                  width: "100%",
                  marginTop: "16px",
                  padding: "14px",
                  backgroundColor: loading ? "#a0aec0" : "#3AAFA9",
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s"
                }}
              >
                {loading ? "Buscando horários..." : "🔍 Buscar Horários"}
              </button>
            </div>
          )}

          {/* PASSO 2: Seleção de Horário */}
          {step === 2 && (
            <div>
              <div style={{
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "32px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "12px"
                }}>
                  <div>
                    <h2 style={{
                      fontSize: "18px",
                      color: "#2B7A78",
                      margin: 0,
                      fontWeight: "600"
                    }}>
                      Horários disponíveis
                    </h2>
                    <p style={{ fontSize: "13px", color: "#718096", margin: "4px 0 0" }}>
                      Para {selectedDate}
                    </p>
                  </div>
                  <button
                    onClick={voltar}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "transparent",
                      color: "#3AAFA9",
                      border: "1px solid #3AAFA9",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "13px"
                    }}
                  >
                    ← Voltar
                  </button>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                  gap: "12px"
                }}>
                  {horarios.map((horario) => (
                    <button
                      key={horario}
                      onClick={() => setSelectedTime(horario)}
                      style={{
                        padding: "12px 8px",
                        borderRadius: "12px",
                        border: selectedTime === horario ? "2px solid #3AAFA9" : "1px solid #e2e8f0",
                        backgroundColor: selectedTime === horario ? "#e6f7f5" : "white",
                        color: selectedTime === horario ? "#2B7A78" : "#4a4a4a",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: selectedTime === horario ? "600" : "400",
                        transition: "all 0.2s"
                      }}
                    >
                      {horario}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão Confirmar */}
              <button
                onClick={confirmarAgendamento}
                style={{
                  width: "100%",
                  marginTop: "16px",
                  padding: "16px",
                  backgroundColor: "#2B7A78",
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
              >
                ✅ Confirmar Agendamento
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}