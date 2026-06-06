"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── Sidebar (mesmo código do dashboard — mover para components/Sidebar.tsx) ──

const NAV_ITEMS = [
  { href: "/dashboardd", icon: "⊞", label: "Painel Principal" },
  { href: "/schedulee",  icon: "📅", label: "Novo Agendamento" },
];

function Sidebar({ active }: { active: string }) {
  return (
    <aside
      style={{
        width: 240,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0d2b2b 0%, #0f3333 100%)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          padding: "28px 20px 24px",
          borderBottom: "1px solid rgba(42,181,160,0.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "rgba(42,181,160,0.15)",
              border: "1px solid rgba(42,181,160,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            🏥
          </div>
          <div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: 0, lineHeight: 1.1 }}>
              UnBemEstar
            </p>
            <p style={{ color: "#4dd6c0", fontSize: 10, margin: 0, letterSpacing: "0.06em" }}>
              ÁREA DO PACIENTE
            </p>
          </div>
        </div>
      </div>

      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                textDecoration: "none",
                marginBottom: 4,
                background: isActive ? "rgba(42,181,160,0.18)" : "transparent",
                border: isActive ? "1px solid rgba(42,181,160,0.25)" : "1px solid transparent",
                transition: "all 0.15s",
                color: isActive ? "#4dd6c0" : "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(42,181,160,0.12)" }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 10,
            textDecoration: "none",
            color: "rgba(255,255,255,0.4)",
            fontSize: 14,
          }}
        >
          <span>🚪</span>
          Sair do Sistema
        </Link>
      </div>
    </aside>
  );
}

// ─── Helpers de calendário ────────────────────────────────────────────────────

const WEEK_LABELS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const MONTH_NAMES = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];

// Horários fixos — quando backend estiver pronto, virão de GET /api/appointments/slots
const ALL_SLOTS = ["08:00","09:00","10:00","11:00","13:00","14:00","15:00","16:00"];

// Simulação de slots já reservados (formato "YYYY-MM-DD|HH:MM")
// TODO: substituir por fetch à API quando backend estiver integrado
const BOOKED_MOCK = new Set([
  "2026-06-02|09:00",
  "2026-06-04|08:00",
  "2026-06-08|15:00",
  "2026-06-09|11:00",
  "2026-06-10|10:00",
  "2026-06-10|14:00",
  "2026-06-11|08:00",
]);

function buildMonth(year: number, month: number) {
  // month: 0-indexado (como Date)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => {
    const d = i + 1;
    const date = new Date(year, month, d);
    const weekday = date.getDay();
    const isWeekend = weekday === 0 || weekday === 6;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const isPast = date < new Date(new Date().setHours(0,0,0,0));
    return {
      day: d,
      weekday,
      label: WEEK_LABELS[weekday],
      dateStr,
      disabled: isWeekend || isPast,
    };
  });
}

function getSlotsForDate(dateStr: string) {
  return ALL_SLOTS.map((t) => ({
    time: t,
    booked: BOOKED_MOCK.has(`${dateStr}|${t}`),
  }));
}

// ─── Página ────────────────────────────────────────────────────────────────────

export default function SchedulePage() {
  const pathname = usePathname() || "/dashboard";
  const today = new Date();

  const [viewYear, setViewYear]     = useState(today.getFullYear());
  const [viewMonth, setViewMonth]   = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [status, setStatus]         = useState<"idle"|"loading"|"success"|"error">("idle");
  const [errorMsg, setErrorMsg]     = useState("");

  const days  = useMemo(() => buildMonth(viewYear, viewMonth), [viewYear, viewMonth]);
  const slots = useMemo(
    () => (selectedDate ? getSlotsForDate(selectedDate) : []),
    [selectedDate]
  );

  // Navegação de mês
  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDate(null); setSelectedTime(null);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDate(null); setSelectedTime(null);
  }

  function selectDay(dateStr: string, disabled: boolean) {
    if (disabled) return;
    setSelectedDate(dateStr);
    setSelectedTime(null);
    setStatus("idle");
  }

  async function handleBook() {
    if (!selectedDate || !selectedTime) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      // TODO: integrar com POST /api/appointments/book quando backend estiver pronto
      // const token = await supabase.auth.getSession().then(s => s.data.session?.access_token)
      // const res = await fetch("/api/appointments/book", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      //   body: JSON.stringify({ date: selectedDate, time: selectedTime }),
      // })
      // if (!res.ok) throw new Error((await res.json()).error)

      // Simulação enquanto backend não está integrado
      await new Promise(r => setTimeout(r, 1200));
      BOOKED_MOCK.add(`${selectedDate}|${selectedTime}`);
      setStatus("success");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Erro ao agendar.");
      setStatus("error");
    }
  }

  function resetForm() {
    setSelectedDate(null);
    setSelectedTime(null);
    setStatus("idle");
    setErrorMsg("");
  }

  // Formato legível da data selecionada
  const selectedDateLabel = selectedDate
    ? new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR", {
        weekday: "long", day: "numeric", month: "long",
      })
    : null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f4f4" }}>
      <Sidebar active={pathname} />

      <main style={{ flex: 1, padding: "36px", overflowY: "auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1a2e2e", margin: "0 0 4px" }}>
              Agendamento de Sessão
            </h1>
            <p style={{ color: "#5a7a7a", fontSize: 13, margin: 0 }}>
              Selecione o melhor dia e horário para seu atendimento de Fisioterapia
            </p>
          </div>
          <div
            style={{
              background: "#fff",
              border: "1px solid rgba(42,181,160,0.2)",
              borderRadius: 8,
              padding: "6px 14px",
              fontSize: 12,
              color: "#5a7a7a",
            }}
          >
            ⚠️ Regra: Cancelamentos com até 24h de antecedência.
          </div>
        </div>

        {/* ── CALENDÁRIO ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid rgba(42,181,160,0.12)",
            padding: "28px",
            marginBottom: 20,
          }}
        >
          {/* Navegação de mês */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1a2e2e", margin: 0 }}>
              {MONTH_NAMES[viewMonth]} de {viewYear}
            </h2>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ fn: prevMonth, label: "←" }, { fn: nextMonth, label: "→" }].map(({ fn, label }) => (
                <button
                  key={label}
                  onClick={fn}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: "1px solid rgba(42,181,160,0.2)",
                    background: "#fff",
                    cursor: "pointer",
                    color: "#1a5c5c",
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.15s",
                  }}
                  onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(42,181,160,0.08)")}
                  onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.background = "#fff")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Label de dias disponíveis */}
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#9ab0b0", marginBottom: 12 }}>
            DIAS DISPONÍVEIS PARA CONSULTA
          </p>

          {/* Grade de dias — scroll horizontal no mobile */}
          <div style={{ overflowX: "auto", paddingBottom: 8 }}>
            <div
              style={{
                display: "flex",
                gap: 8,
                minWidth: "max-content",
              }}
            >
              {days.map(({ day, label, dateStr, disabled }) => {
                const isSelected = selectedDate === dateStr;
                const isToday =
                  dateStr ===
                  today.toISOString().split("T")[0];

                return (
                  <button
                    key={dateStr}
                    onClick={() => selectDay(dateStr, disabled)}
                    title={disabled ? "Dia indisponível" : dateStr}
                    style={{
                      width: 56,
                      padding: "10px 0",
                      borderRadius: 12,
                      border: isSelected
                        ? "2px solid #2ab5a0"
                        : isToday
                        ? "2px solid rgba(42,181,160,0.4)"
                        : "1.5px solid rgba(42,181,160,0.12)",
                      background: isSelected
                        ? "#2ab5a0"
                        : isToday
                        ? "rgba(42,181,160,0.06)"
                        : disabled
                        ? "transparent"
                        : "#fafcfc",
                      cursor: disabled ? "default" : "pointer",
                      opacity: disabled ? 0.35 : 1,
                      transition: "all 0.15s",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      flexShrink: 0,
                    }}
                    onMouseOver={(e) => {
                      if (!disabled && !isSelected)
                        (e.currentTarget as HTMLElement).style.background = "rgba(42,181,160,0.08)";
                    }}
                    onMouseOut={(e) => {
                      if (!disabled && !isSelected)
                        (e.currentTarget as HTMLElement).style.background = isToday ? "rgba(42,181,160,0.06)" : "#fafcfc";
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        color: isSelected ? "rgba(255,255,255,0.8)" : "#9ab0b0",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: isSelected ? "#fff" : "#1a2e2e",
                        lineHeight: 1,
                      }}
                    >
                      {day}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── HORÁRIOS ── */}
          {selectedDate && (
            <div style={{ marginTop: 28 }}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#9ab0b0",
                  marginBottom: 12,
                }}
              >
                HORÁRIOS DISPONÍVEIS PARA O DIA {new Date(selectedDate + "T12:00").getDate()}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
                  gap: 10,
                }}
              >
                {slots.map(({ time, booked }) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      disabled={booked}
                      onClick={() => !booked && setSelectedTime(time)}
                      style={{
                        padding: "12px 0",
                        borderRadius: 10,
                        border: isSelected
                          ? "2px solid #2ab5a0"
                          : "1.5px solid rgba(42,181,160,0.15)",
                        background: isSelected
                          ? "rgba(42,181,160,0.12)"
                          : booked
                          ? "#f5f5f5"
                          : "#fff",
                        color: isSelected
                          ? "#1a5c5c"
                          : booked
                          ? "#c0cccc"
                          : "#1a2e2e",
                        fontSize: 15,
                        fontWeight: isSelected ? 700 : 500,
                        cursor: booked ? "not-allowed" : "pointer",
                        textDecoration: booked ? "line-through" : "none",
                        transition: "all 0.15s",
                      }}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── RESUMO E BOTÃO ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid rgba(42,181,160,0.12)",
            padding: "22px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#9ab0b0",
                margin: "0 0 6px",
              }}
            >
              RESUMO DA ESCOLHA
            </p>
            {status === "success" ? (
              <p style={{ fontSize: 14, color: "#0f6e56", fontWeight: 600, margin: 0 }}>
                ✅ Consulta agendada para {selectedDateLabel} às {selectedTime}!
              </p>
            ) : selectedDate && selectedTime ? (
              <p style={{ fontSize: 14, color: "#1a2e2e", fontWeight: 600, margin: 0 }}>
                📋 {selectedDateLabel} às {selectedTime}
              </p>
            ) : selectedDate ? (
              <p style={{ fontSize: 14, color: "#5a7a7a", margin: 0 }}>
                Selecione um horário disponível acima
              </p>
            ) : (
              <p style={{ fontSize: 14, color: "#5a7a7a", margin: 0 }}>
                Por favor, defina um dia e hora no calendário acima
              </p>
            )}
            {status === "error" && (
              <p style={{ fontSize: 13, color: "#dc2626", margin: "6px 0 0" }}>{errorMsg}</p>
            )}
          </div>

          {status === "success" ? (
            <button
              onClick={resetForm}
              style={{
                background: "rgba(42,181,160,0.1)",
                border: "1.5px solid #2ab5a0",
                color: "#1a5c5c",
                padding: "12px 28px",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Novo agendamento
            </button>
          ) : (
            <button
              onClick={handleBook}
              disabled={!selectedDate || !selectedTime || status === "loading"}
              style={{
                background:
                  !selectedDate || !selectedTime || status === "loading"
                    ? "#b0cccc"
                    : "#2ab5a0",
                color: "#fff",
                padding: "12px 28px",
                borderRadius: 10,
                border: "none",
                fontWeight: 700,
                fontSize: 14,
                cursor:
                  !selectedDate || !selectedTime || status === "loading"
                    ? "not-allowed"
                    : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "background 0.2s",
                boxShadow:
                  selectedDate && selectedTime
                    ? "0 4px 16px rgba(42,181,160,0.3)"
                    : "none",
              }}
            >
              {status === "loading" && (
                <span
                  style={{
                    width: 14,
                    height: 14,
                    border: "2px solid rgba(255,255,255,0.4)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
              )}
              {status === "loading" ? "Agendando..." : "SOLICITAR RESERVA"}
            </button>
          )}
        </div>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </main>
    </div>
  );
}