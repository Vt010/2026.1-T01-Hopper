"use client";

import { useState, useEffect } from "react";

interface Slot {
  data: string;
  hora: string;
}

interface CalendarProps {
  fisioterapeutaId: string;
  onSlotSelect: (slot: Slot) => void;
}

const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function dataParaString(date: Date) {
  return date.toISOString().split("T")[0];
}

function dataDeHoje() {
  return dataParaString(new Date());
}

function calcularDiasDoMes(ano: number, mes: number) {
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  return { primeiroDia, totalDias };
}

async function buscarSlots(
  fisioterapeutaId: string,
  data: string
): Promise<{ hora: string; disponivel: boolean }[]> {
  // trocar por: GET /api/appointments/slots?fisioterapeutaId=X&data=YYYY-MM-DD
  await new Promise((r) => setTimeout(r, 600));

  const diaSemana = new Date(data + "T12:00:00").getDay();
  if (diaSemana === 0 || diaSemana === 6) return [];

  const horarios = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30",
  ];

  const seed = parseInt(data.replace(/-/g, "")) % 7;
  return horarios.map((hora, i) => ({
    hora,
    disponivel: (i + seed) % 3 !== 0,
  }));
}

async function buscarDisponibilidadeDoMes(
  fisioterapeutaId: string,
  ano: number,
  mes: number
): Promise<Set<string>> {
  // trocar por: GET /api/appointments/availability?fisioterapeutaId=X&ano=X&mes=X
  await new Promise((r) => setTimeout(r, 300));

  const disponiveis = new Set<string>();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  for (let d = 1; d <= totalDias; d++) {
    const data = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const diaSemana = new Date(data + "T12:00:00").getDay();
    if (diaSemana !== 0 && diaSemana !== 6) {
      disponiveis.add(data);
    }
  }
  return disponiveis;
}

export default function Calendar({ fisioterapeutaId, onSlotSelect }: CalendarProps) {
  const agora = new Date();
  const [ano, setAno] = useState(agora.getFullYear());
  const [mes, setMes] = useState(agora.getMonth());

  const [diasDisponiveis, setDiasDisponiveis] = useState<Set<string>>(new Set());
  const [carregandoMes, setCarregandoMes] = useState(false);

  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
  const [slots, setSlots] = useState<{ hora: string; disponivel: boolean }[]>([]);
  const [carregandoSlots, setCarregandoSlots] = useState(false);

  const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;
    setCarregandoMes(true);
    setDiasDisponiveis(new Set());
    setDataSelecionada(null);
    setSlots([]);
    setHoraSelecionada(null);

    buscarDisponibilidadeDoMes(fisioterapeutaId, ano, mes)
      .then((resultado) => { if (!cancelado) setDiasDisponiveis(resultado); })
      .catch(() => { if (!cancelado) setErro("Não foi possível carregar a disponibilidade."); })
      .finally(() => { if (!cancelado) setCarregandoMes(false); });

    return () => { cancelado = true; };
  }, [fisioterapeutaId, ano, mes]);

  async function selecionarDia(data: string) {
    if (!diasDisponiveis.has(data)) return;
    setDataSelecionada(data);
    setHoraSelecionada(null);
    setSlots([]);
    setCarregandoSlots(true);
    setErro(null);

    try {
      const resultado = await buscarSlots(fisioterapeutaId, data);
      setSlots(resultado);
    } catch {
      setErro("Erro ao buscar horários. Tente novamente.");
    } finally {
      setCarregandoSlots(false);
    }
  }

  function selecionarHora(hora: string) {
    setHoraSelecionada(hora);
    if (dataSelecionada) {
      onSlotSelect({ data: dataSelecionada, hora });
    }
  }

  function mudarMes(direcao: number) {
    let novoMes = mes + direcao;
    let novoAno = ano;
    if (novoMes < 0) { novoMes = 11; novoAno--; }
    if (novoMes > 11) { novoMes = 0; novoAno++; }
    setMes(novoMes);
    setAno(novoAno);
  }

  const { primeiroDia, totalDias } = calcularDiasDoMes(ano, mes);
  const hoje = dataDeHoje();

  const celulasVazias = Array.from({ length: primeiroDia });
  const dias = Array.from({ length: totalDias }, (_, i) => {
    const d = i + 1;
    const data = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    return {
      d,
      data,
      passado: data < hoje,
      disponivel: !( data < hoje) && diasDisponiveis.has(data),
      selecionado: data === dataSelecionada,
      ehHoje: data === hoje,
    };
  });

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "20px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
    }}>

      <div style={{
        background: "linear-gradient(135deg, #2B7A78 0%, #3AAFA9 100%)",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <BotaoNavegacao onClick={() => mudarMes(-1)} aria="Mês anterior" rotulo="‹" />

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "white", fontWeight: "bold", fontSize: "16px", margin: 0 }}>
            {meses[mes]} {ano}
          </p>
          {carregandoMes && (
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", margin: "2px 0 0" }}>
              Verificando disponibilidade…
            </p>
          )}
        </div>

        <BotaoNavegacao onClick={() => mudarMes(1)} aria="Próximo mês" rotulo="›" />
      </div>

      <div style={{ padding: "20px 24px 24px" }}>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: "8px",
        }}>
          {diasDaSemana.map((dia) => (
            <div key={dia} style={{
              textAlign: "center",
              fontSize: "11px",
              fontWeight: "600",
              color: "#a0aec0",
              padding: "4px 0",
              letterSpacing: "0.5px",
            }}>
              {dia}
            </div>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
          opacity: carregandoMes ? 0.5 : 1,
          transition: "opacity 0.3s",
        }}>
          {celulasVazias.map((_, i) => <div key={`vazio-${i}`} />)}

          {dias.map(({ d, data, passado, disponivel, selecionado, ehHoje }) => {
            const desabilitado = passado || (!carregandoMes && !disponivel);

            let bg = "transparent";
            let cor = "#2d3748";
            let border = "1px solid transparent";
            let fontWeight: string | number = "400";

            if (selecionado) {
              bg = "#3AAFA9";
              cor = "white";
              fontWeight = "700";
              border = "1px solid #3AAFA9";
            } else if (ehHoje && !desabilitado) {
              border = "1px solid #3AAFA9";
              cor = "#2B7A78";
              fontWeight = "600";
            } else if (desabilitado) {
              cor = "#cbd5e0";
            }

            return (
              <button
                key={data}
                onClick={() => !desabilitado && selecionarDia(data)}
                disabled={desabilitado}
                aria-label={`${d} de ${meses[mes]}`}
                aria-pressed={selecionado}
                style={{
                  background: bg,
                  color: cor,
                  border,
                  borderRadius: "10px",
                  padding: "8px 4px",
                  fontSize: "13px",
                  fontWeight,
                  cursor: desabilitado ? "not-allowed" : "pointer",
                  textAlign: "center",
                  transition: "all 0.15s",
                  lineHeight: 1,
                }}
                onMouseOver={e => {
                  if (!desabilitado && !selecionado) {
                    e.currentTarget.style.background = "#e6f7f5";
                    e.currentTarget.style.color = "#2B7A78";
                  }
                }}
                onMouseOut={e => {
                  if (!desabilitado && !selecionado) {
                    e.currentTarget.style.background = bg;
                    e.currentTarget.style.color = cor;
                  }
                }}
              >
                {d}
                {disponivel && !selecionado && (
                  <span style={{
                    display: "block",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#3AAFA9",
                    margin: "3px auto 0",
                  }} />
                )}
              </button>
            );
          })}
        </div>

        <div style={{
          display: "flex",
          gap: "16px",
          marginTop: "16px",
          paddingTop: "12px",
          borderTop: "1px solid #f0f4f7",
          flexWrap: "wrap",
        }}>
          <ItemLegenda cor="#3AAFA9" label="Disponível" tipo="dot" />
          <ItemLegenda cor="#3AAFA9" label="Selecionado" tipo="fill" />
          <ItemLegenda cor="#cbd5e0" label="Indisponível" tipo="dot" />
        </div>

        {dataSelecionada && (
          <div style={{ marginTop: "24px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "14px",
            }}>
              <span style={{ fontSize: "13px", color: "#718096" }}>Horários para</span>
              <span style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#2B7A78",
                background: "#e6f7f5",
                padding: "2px 10px",
                borderRadius: "20px",
              }}>
                {new Date(dataSelecionada + "T12:00:00").toLocaleDateString("pt-BR", {
                  day: "2-digit", month: "long"
                })}
              </span>
            </div>

            {carregandoSlots && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} style={{
                    width: "72px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "#f0f4f7",
                    animation: "pulse 1.2s ease-in-out infinite",
                  }} />
                ))}
                <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
              </div>
            )}

            {!carregandoSlots && slots.length === 0 && (
              <p style={{ color: "#a0aec0", fontSize: "13px", margin: 0 }}>
                Nenhum horário disponível para esta data.
              </p>
            )}

            {!carregandoSlots && slots.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {slots.map(({ hora, disponivel }) => {
                  const chipSelecionado = hora === horaSelecionada;
                  return (
                    <button
                      key={hora}
                      onClick={() => disponivel && selecionarHora(hora)}
                      disabled={!disponivel}
                      aria-label={`${hora} — ${disponivel ? "disponível" : "reservado"}`}
                      aria-pressed={chipSelecionado}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: chipSelecionado ? "700" : "400",
                        cursor: disponivel ? "pointer" : "not-allowed",
                        transition: "all 0.15s",
                        border: chipSelecionado
                          ? "2px solid #2B7A78"
                          : disponivel ? "1px solid #e2e8f0" : "1px solid #edf2f7",
                        background: chipSelecionado
                          ? "#3AAFA9"
                          : disponivel ? "white" : "#f7fafc",
                        color: chipSelecionado
                          ? "white"
                          : disponivel ? "#2d3748" : "#cbd5e0",
                        minWidth: "64px",
                        textAlign: "center",
                      }}
                      onMouseOver={e => {
                        if (disponivel && !chipSelecionado) {
                          e.currentTarget.style.background = "#e6f7f5";
                          e.currentTarget.style.borderColor = "#3AAFA9";
                          e.currentTarget.style.color = "#2B7A78";
                        }
                      }}
                      onMouseOut={e => {
                        if (disponivel && !chipSelecionado) {
                          e.currentTarget.style.background = "white";
                          e.currentTarget.style.borderColor = "#e2e8f0";
                          e.currentTarget.style.color = "#2d3748";
                        }
                      }}
                    >
                      {hora}
                    </button>
                  );
                })}
              </div>
            )}

            {horaSelecionada && (
              <div style={{
                marginTop: "16px",
                padding: "12px 16px",
                borderRadius: "12px",
                background: "#e6f7f5",
                border: "1px solid #b2e4e0",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <span style={{ fontSize: "18px" }}>✅</span>
                <div>
                  <p style={{ margin: 0, fontSize: "13px", color: "#2B7A78", fontWeight: "600" }}>
                    Horário selecionado
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#4a9e99" }}>
                    {new Date(dataSelecionada + "T12:00:00").toLocaleDateString("pt-BR", {
                      weekday: "long", day: "2-digit", month: "long"
                    })} às {horaSelecionada}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {erro && (
          <div style={{
            marginTop: "16px",
            padding: "10px 14px",
            borderRadius: "10px",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#dc2626",
            fontSize: "13px",
          }}>
            {erro}
          </div>
        )}
      </div>
    </div>
  );
}

function BotaoNavegacao({ onClick, aria, rotulo }: { onClick: () => void; aria: string; rotulo: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={aria}
      style={{
        background: "rgba(255,255,255,0.15)",
        border: "none",
        borderRadius: "50%",
        width: "36px",
        height: "36px",
        cursor: "pointer",
        color: "white",
        fontSize: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s",
      }}
      onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
      onMouseOut={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
    >
      {rotulo}
    </button>
  );
}

function ItemLegenda({ cor, label, tipo }: { cor: string; label: string; tipo: "dot" | "fill" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        background: tipo === "fill" ? cor : "transparent",
        border: tipo === "dot" ? `2px solid ${cor}` : "none",
      }} />
      <span style={{ fontSize: "11px", color: "#a0aec0" }}>{label}</span>
    </div>
  );
}