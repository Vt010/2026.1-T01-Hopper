"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Calendar,
  LayoutDashboard,
  ClipboardList,
  Wrench,
  Users,
  LogOut,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Home,
  Building2,
  Clock,
  User,
  AlertCircle,
  Loader2,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// tipos
// ─────────────────────────────────────────────────────────────
interface Servico {
  id: string;
  nome: string;
  descricao: string;
  duracao: number;
  icone: string;
  categoria?: string;
}

interface Profissional {
  id: string;
  nome: string;
  especialidade: string;
  avatar?: string;
}

interface Slot {
  data: string;  
  hora: string;  
}

type TipoAtendimento = "presencial" | "domiciliar";

interface FormData {
  tipo: TipoAtendimento | null;
  endereco: string;
  servicoId: string | null;
  profissionalId: string | null; // null = sem preferência
  slot: Slot | null;
  // primeira consulta
  primeiraConsulta: boolean;
  queixaPrincipal: string;
  medicamentos: string;
}

// ─────────────────────────────────────────────────────────────
// SIDEBAR 
// ─────────────────────────────────────────────────────────────
function Sidebar({ activeHref }: { activeHref: string }) {
  const navLinks = [
    { href: "/dashboard",    icon: <LayoutDashboard size={16} />, label: "Painel Principal" },
    { href: "/schedule",     icon: <Calendar         size={16} />, label: "Novo Agendamento" },
    { href: "/historico",    icon: <ClipboardList    size={16} />, label: "Histórico" },
    { href: "/servicos",     icon: <Wrench           size={16} />, label: "Serviços" },
    { href: "/equipe", icon: <Users            size={16} />, label: "Equipe" },
  ];

  return (
    <aside style={{
      width: "240px", minHeight: "100vh",
      background: "linear-gradient(180deg, #3AAFA9 0%, #2B7A78 100%)",
      padding: "24px 16px", display: "flex", flexDirection: "column",
      position: "sticky", top: 0, height: "100vh",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
        <div style={{ backgroundColor: "white", borderRadius: "10px", padding: "4px", display: "flex", boxShadow: "0 1px 4px rgba(0,0,0,0.10)" }}>
          <Image src="/imagens/UnBemEstarLg1.png" alt="Logo UnBemEstar" width={32} height={32} style={{ borderRadius: "8px", objectFit: "contain" }} />
        </div>
        <div>
          <h1 style={{ fontSize: "18px", fontWeight: "bold", color: "white", margin: 0, lineHeight: 1 }}>
            Un<span style={{ fontWeight: "900" }}>Bem</span>Estar
          </h1>
          <p style={{ fontSize: "10px", color: "#cbd5e1", letterSpacing: "1px", margin: "3px 0 0" }}>ÁREA DO PACIENTE</p>
        </div>
      </div>

      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
        {navLinks.map(({ href, icon, label }) => {
          const active = href === activeHref;
          return (
            <Link key={href} href={href} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 12px", borderRadius: "10px", textDecoration: "none",
              backgroundColor: active ? "rgba(255,255,255,0.18)" : "transparent",
              color: active ? "white" : "rgba(255,255,255,0.70)",
              fontSize: "14px", fontWeight: active ? "600" : "400", transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.10)"; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              {icon} {label}
            </Link>
          );
        })}
      </nav>

      <Link href="/login" style={{
        display: "flex", alignItems: "center", gap: "10px", padding: "12px 12px",
        borderRadius: "10px", textDecoration: "none", color: "rgba(255,255,255,0.45)",
        borderTop: "1px solid rgba(255,255,255,0.12)", fontSize: "14px", transition: "all 0.2s",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "white"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
      >
        <LogOut size={16} /> Sair
      </Link>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────────────────────
const ETAPAS = ["Tipo", "Serviço", "Profissional", "Data e hora", "Confirmação"];

function ProgressBar({ etapaAtual }: { etapaAtual: number }) {
  return (
    <div style={{ marginBottom: "36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
        {ETAPAS.map((label, i) => {
          const done    = i < etapaAtual;
          const current = i === etapaAtual;
          const last    = i === ETAPAS.length - 1;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: last ? "0 0 auto" : 1 }}>
              {/* Círculo */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  backgroundColor: done ? "#2B7A78" : current ? "#3AAFA9" : "white",
                  border: done || current ? "none" : "2px solid #e2e8f0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s",
                  boxShadow: current ? "0 0 0 4px rgba(58,175,169,0.20)" : "none",
                }}>
                  {done
                    ? <Check size={14} color="white" strokeWidth={3} />
                    : <span style={{ fontSize: "12px", fontWeight: "700", color: current ? "white" : "#a0aec0" }}>{i + 1}</span>
                  }
                </div>
                <span style={{
                  fontSize: "10px", fontWeight: current ? "700" : "400",
                  color: done ? "#2B7A78" : current ? "#2B7A78" : "#a0aec0",
                  whiteSpace: "nowrap", transition: "all 0.3s",
                }}>
                  {label}
                </span>
              </div>
              {/* Linha conectora */}
              {!last && (
                <div style={{
                  flex: 1, height: "2px", margin: "0 4px", marginBottom: "20px",
                  backgroundColor: done ? "#2B7A78" : "#e2e8f0",
                  transition: "background-color 0.3s",
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ETAPA 1 — Tipo de atendimento
// ─────────────────────────────────────────────────────────────
function Etapa1({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
  return (
    <div>
      <h2 style={{ fontSize: "20px", color: "#2d3748", margin: "0 0 4px" }}>Tipo de atendimento</h2>
      <p style={{ color: "#64748b", margin: "0 0 24px", fontSize: "14px" }}>Onde você prefere ser atendido?</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        {([
          { value: "presencial", label: "Presencial", desc: "Na clínica, com toda a estrutura disponível", icon: <Building2 size={32} color={form.tipo === "presencial" ? "#2B7A78" : "#a0aec0"} /> },
          { value: "domiciliar", label: "Domiciliar", desc: "O profissional vai até você", icon: <Home size={32} color={form.tipo === "domiciliar" ? "#2B7A78" : "#a0aec0"} /> },
        ] as const).map(({ value, label, desc, icon }) => {
          const selected = form.tipo === value;
          return (
            <button
              key={value}
              onClick={() => setForm((f) => ({ ...f, tipo: value }))}
              style={{
                padding: "28px 20px", borderRadius: "16px", textAlign: "left", cursor: "pointer",
                border: selected ? "2px solid #3AAFA9" : "2px solid #e2e8f0",
                backgroundColor: selected ? "#f0fbfa" : "white",
                boxShadow: selected ? "0 4px 16px rgba(58,175,169,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = "#cbd5e1"; }}
              onMouseLeave={(e) => { if (!selected) e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              <div style={{ marginBottom: "12px" }}>{icon}</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: selected ? "#2B7A78" : "#2d3748", marginBottom: "4px" }}>{label}</div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>{desc}</div>
            </button>
          );
        })}
      </div>

      {form.tipo === "domiciliar" && (
        <div style={{ animation: "fadeIn 0.25s ease" }}>
          <label style={{ fontSize: "13px", fontWeight: "600", color: "#2d3748", display: "block", marginBottom: "6px" }}>
            <MapPin size={13} style={{ verticalAlign: "middle", marginRight: "4px" }} />
            Endereço completo <span style={{ color: "#dc2626" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Rua, número, complemento, bairro, cidade"
            value={form.endereco}
            onChange={(e) => setForm((f) => ({ ...f, endereco: e.target.value }))}
            style={{
              width: "100%", padding: "12px 16px", borderRadius: "10px", fontSize: "14px",
              border: "1.5px solid #e2e8f0", outline: "none", boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#3AAFA9"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; }}
          />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ETAPA 2 — Serviço
// ─────────────────────────────────────────────────────────────
function Etapa2({ form, setForm, servicos, loadingServicos }: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  servicos: Servico[];
  loadingServicos: boolean;
}) {
  if (loadingServicos) {
    return (
      <div>
        <h2 style={{ fontSize: "20px", color: "#2d3748", margin: "0 0 4px" }}>Escolha o serviço</h2>
        <p style={{ color: "#64748b", margin: "0 0 24px", fontSize: "14px" }}>Qual tratamento você precisa?</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {[1,2,3,4].map((i) => (
            <div key={i} style={{ backgroundColor: "white", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0", animation: "pulse 1.5s ease-in-out infinite" }}>
              <div style={{ width: "44px", height: "44px", backgroundColor: "#e2e8f0", borderRadius: "10px", marginBottom: "12px" }} />
              <div style={{ height: "16px", backgroundColor: "#e2e8f0", borderRadius: "4px", width: "70%", marginBottom: "6px" }} />
              <div style={{ height: "12px", backgroundColor: "#e2e8f0", borderRadius: "4px", width: "50%" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: "20px", color: "#2d3748", margin: "0 0 4px" }}>Escolha o serviço</h2>
      <p style={{ color: "#64748b", margin: "0 0 24px", fontSize: "14px" }}>Qual tratamento você precisa?</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
        {servicos.map((s) => {
          const selected = form.servicoId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setForm((f) => ({ ...f, servicoId: s.id }))}
              style={{
                padding: "20px", borderRadius: "14px", textAlign: "left", cursor: "pointer",
                border: selected ? "2px solid #3AAFA9" : "2px solid #e2e8f0",
                backgroundColor: selected ? "#f0fbfa" : "white",
                boxShadow: selected ? "0 4px 16px rgba(58,175,169,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { if (!selected) { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.07)"; } }}
              onMouseLeave={(e) => { if (!selected) { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; } }}
            >
              <div style={{
                width: "44px", height: "44px", borderRadius: "10px",
                backgroundColor: selected ? "#e6f7f5" : "#f8fafc",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px", marginBottom: "12px", transition: "all 0.2s",
              }}>{s.icone}</div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: selected ? "#2B7A78" : "#2d3748", marginBottom: "4px" }}>{s.nome}</div>
              <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px", lineHeight: "1.4" }}>{s.descricao}</div>
              <span style={{
                fontSize: "11px", color: selected ? "#2B7A78" : "#3AAFA9",
                backgroundColor: selected ? "#e6f7f5" : "#f0f7f9",
                padding: "2px 10px", borderRadius: "20px",
              }}>
                <Clock size={10} style={{ verticalAlign: "middle", marginRight: "3px" }} />
                {s.duracao} min
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ETAPA 3 — Profissional
// ─────────────────────────────────────────────────────────────
function Etapa3({ form, setForm, profissionais, loadingProf }: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  profissionais: Profissional[];
  loadingProf: boolean;
}) {
  const SEM_PREF = "__sem_preferencia__";

  if (loadingProf) {
    return (
      <div>
        <h2 style={{ fontSize: "20px", color: "#2d3748", margin: "0 0 4px" }}>Escolha o profissional</h2>
        <p style={{ color: "#64748b", margin: "0 0 24px", fontSize: "14px" }}>Carregando profissionais disponíveis…</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[1,2,3].map((i) => (
            <div key={i} style={{ backgroundColor: "white", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0", display: "flex", gap: "16px", animation: "pulse 1.5s ease-in-out infinite" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#e2e8f0", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: "16px", backgroundColor: "#e2e8f0", borderRadius: "4px", width: "50%", marginBottom: "8px" }} />
                <div style={{ height: "12px", backgroundColor: "#e2e8f0", borderRadius: "4px", width: "35%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: "20px", color: "#2d3748", margin: "0 0 4px" }}>Escolha o profissional</h2>
      <p style={{ color: "#64748b", margin: "0 0 24px", fontSize: "14px" }}>Ou deixe que atribuamos o melhor disponível para você.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Opção sem preferência */}
        {(() => {
          const selected = form.profissionalId === null;
          return (
            <button
              onClick={() => setForm((f) => ({ ...f, profissionalId: null }))}
              style={{
                padding: "18px 20px", borderRadius: "14px", textAlign: "left", cursor: "pointer",
                border: selected ? "2px solid #3AAFA9" : "2px solid #e2e8f0",
                backgroundColor: selected ? "#f0fbfa" : "white",
                boxShadow: selected ? "0 4px 16px rgba(58,175,169,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 0.2s", display: "flex", alignItems: "center", gap: "16px",
              }}
              onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = "#cbd5e1"; }}
              onMouseLeave={(e) => { if (!selected) e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                backgroundColor: selected ? "#e6f7f5" : "#f8fafc",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Users size={22} color={selected ? "#2B7A78" : "#a0aec0"} />
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: selected ? "#2B7A78" : "#2d3748", marginBottom: "3px" }}>
                  Sem preferência
                </div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>
                  O profissional disponível será atribuído automaticamente
                </div>
              </div>
              {selected && (
                <div style={{ marginLeft: "auto", width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#2B7A78", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={13} color="white" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })()}

        {/* Cards de profissionais */}
        {profissionais.map((p) => {
          const selected = form.profissionalId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setForm((f) => ({ ...f, profissionalId: p.id }))}
              style={{
                padding: "18px 20px", borderRadius: "14px", textAlign: "left", cursor: "pointer",
                border: selected ? "2px solid #3AAFA9" : "2px solid #e2e8f0",
                backgroundColor: selected ? "#f0fbfa" : "white",
                boxShadow: selected ? "0 4px 16px rgba(58,175,169,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 0.2s", display: "flex", alignItems: "center", gap: "16px",
              }}
              onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = "#cbd5e1"; }}
              onMouseLeave={(e) => { if (!selected) e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%", flexShrink: 0,
                backgroundColor: selected ? "#e6f7f5" : "#f8fafc",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "20px", fontWeight: "700", color: selected ? "#2B7A78" : "#a0aec0",
                border: selected ? "2px solid #3AAFA9" : "2px solid #e2e8f0",
              }}>
                {p.nome.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: "700", color: selected ? "#2B7A78" : "#2d3748", marginBottom: "3px" }}>{p.nome}</div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>{p.especialidade}</div>
              </div>
              {selected && (
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#2B7A78", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={13} color="white" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ETAPA 4 — Data / Hora  (Calendar mock — substituir por Calendar.tsx)
// ─────────────────────────────────────────────────────────────
function Etapa4({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
  const hoje = new Date();
  const [mesAtual, setMesAtual] = useState(new Date(hoje.getFullYear(), hoje.getMonth(), 1));
  const [slotsDodia, setSlotsDodia] = useState<string[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(form.slot?.data ?? null);

  // Slots mock — substituir por GET /api/appointments/slots?fisioterapeuta_id=...&data=...
  function fetchSlotsMock(data: string) {
    const horarios = ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"];
    // Simula indisponibilidade aleatória por seed de data
    const seed = data.split("-").reduce((a, b) => a + parseInt(b), 0);
    return horarios.filter((_, i) => (seed + i) % 3 !== 0);
  }

  function diasDoMes() {
    const ano = mesAtual.getFullYear();
    const mes = mesAtual.getMonth();
    const primeiro = new Date(ano, mes, 1).getDay();
    const total = new Date(ano, mes + 1, 0).getDate();
    return { primeiro, total, ano, mes };
  }

  const { primeiro, total, ano, mes } = diasDoMes();
  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

  function selecionarData(dia: number) {
    const d = `${ano}-${String(mes + 1).padStart(2,"0")}-${String(dia).padStart(2,"0")}`;
    setDataSelecionada(d);
    setSlotsDodia(fetchSlotsMock(d));
    setForm((f) => ({ ...f, slot: null }));
  }

  function isPast(dia: number) {
    const d = new Date(ano, mes, dia);
    d.setHours(23, 59, 59);
    return d < hoje;
  }

  return (
    <div>
      <h2 style={{ fontSize: "20px", color: "#2d3748", margin: "0 0 4px" }}>Data e horário</h2>
      <p style={{ color: "#64748b", margin: "0 0 24px", fontSize: "14px" }}>Escolha o melhor momento para você.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Calendário */}
        <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          {/* Navegação do mês */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <button
              onClick={() => setMesAtual(new Date(ano, mes - 1, 1))}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "8px", color: "#2B7A78", display: "flex" }}
            >
              <ChevronLeft size={20} />
            </button>
            <span style={{ fontSize: "15px", fontWeight: "700", color: "#2d3748" }}>{meses[mes]} {ano}</span>
            <button
              onClick={() => setMesAtual(new Date(ano, mes + 1, 1))}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "8px", color: "#2B7A78", display: "flex" }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dias da semana */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "8px" }}>
            {diasSemana.map((d) => (
              <div key={d} style={{ textAlign: "center", fontSize: "11px", fontWeight: "600", color: "#a0aec0", padding: "4px 0" }}>{d}</div>
            ))}
          </div>

          {/* Dias */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
            {Array.from({ length: primeiro }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: total }).map((_, i) => {
              const dia = i + 1;
              const dStr = `${ano}-${String(mes+1).padStart(2,"0")}-${String(dia).padStart(2,"0")}`;
              const past = isPast(dia);
              const selected = dataSelecionada === dStr;
              return (
                <button
                  key={dia}
                  disabled={past}
                  onClick={() => !past && selecionarData(dia)}
                  style={{
                    padding: "8px 0", borderRadius: "8px", border: "none", cursor: past ? "not-allowed" : "pointer",
                    backgroundColor: selected ? "#2B7A78" : "transparent",
                    color: past ? "#d1d5db" : selected ? "white" : "#2d3748",
                    fontSize: "13px", fontWeight: selected ? "700" : "400",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { if (!past && !selected) e.currentTarget.style.backgroundColor = "#e6f7f5"; }}
                  onMouseLeave={(e) => { if (!past && !selected) e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  {dia}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horários */}
        <div>
          {!dataSelecionada ? (
            <div style={{
              backgroundColor: "white", borderRadius: "16px", padding: "32px 20px",
              border: "1px solid #e2e8f0", textAlign: "center", color: "#a0aec0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}>
              <Calendar size={40} color="#e2e8f0" style={{ marginBottom: "12px" }} />
              <p style={{ fontSize: "14px", margin: 0 }}>Selecione uma data para ver os horários disponíveis</p>
            </div>
          ) : slotsDodia.length === 0 ? (
            <div style={{
              backgroundColor: "white", borderRadius: "16px", padding: "32px 20px",
              border: "1px solid #e2e8f0", textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}>
              <AlertCircle size={40} color="#f59e0b" style={{ marginBottom: "12px" }} />
              <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>Nenhum horário disponível nesta data. Tente outro dia.</p>
            </div>
          ) : (
            <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "#2B7A78", margin: "0 0 12px" }}>
                <Clock size={13} style={{ verticalAlign: "middle", marginRight: "4px" }} />
                Horários disponíveis
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {slotsDodia.map((hora) => {
                  const sel = form.slot?.data === dataSelecionada && form.slot?.hora === hora;
                  return (
                    <button
                      key={hora}
                      onClick={() => setForm((f) => ({ ...f, slot: { data: dataSelecionada, hora } }))}
                      style={{
                        padding: "10px", borderRadius: "10px", fontSize: "14px", fontWeight: "600",
                        border: sel ? "2px solid #3AAFA9" : "2px solid #e2e8f0",
                        backgroundColor: sel ? "#2B7A78" : "white",
                        color: sel ? "white" : "#2d3748",
                        cursor: "pointer", transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => { if (!sel) { e.currentTarget.style.borderColor = "#3AAFA9"; e.currentTarget.style.backgroundColor = "#f0fbfa"; } }}
                      onMouseLeave={(e) => { if (!sel) { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.backgroundColor = "white"; } }}
                    >
                      {hora}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ETAPA 5 — Confirmação
// ─────────────────────────────────────────────────────────────
function Etapa5({
  form, setForm, servicos, profissionais, submitting, submitError, onConfirmar,
}: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  servicos: Servico[];
  profissionais: Profissional[];
  submitting: boolean;
  submitError: string | null;
  onConfirmar: () => void;
}) {
  const servico     = servicos.find((s) => s.id === form.servicoId);
  const profissional = profissionais.find((p) => p.id === form.profissionalId);

  const formatarData = (d: string) =>
    new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });

  const linhas = [
    { label: "Tipo",         value: form.tipo === "presencial" ? "Presencial (na clínica)" : `Domiciliar — ${form.endereco}` },
    { label: "Serviço",      value: servico ? `${servico.icone} ${servico.nome}` : "—" },
    { label: "Profissional", value: profissional ? profissional.nome : "Sem preferência (atribuição automática)" },
    { label: "Data",         value: form.slot ? formatarData(form.slot.data) : "—" },
    { label: "Horário",      value: form.slot ? form.slot.hora : "—" },
    { label: "Duração",      value: servico ? `${servico.duracao} min` : "—" },
  ];

  return (
    <div>
      <h2 style={{ fontSize: "20px", color: "#2d3748", margin: "0 0 4px" }}>Confirmar agendamento</h2>
      <p style={{ color: "#64748b", margin: "0 0 24px", fontSize: "14px" }}>Revise os detalhes antes de confirmar.</p>

      {/* Resumo */}
      <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        {linhas.map((l, i) => (
          <div key={l.label} style={{
            display: "flex", gap: "16px", padding: "14px 20px",
            borderBottom: i < linhas.length - 1 ? "1px solid #f1f5f9" : "none",
          }}>
            <span style={{ fontSize: "13px", color: "#64748b", width: "110px", flexShrink: 0, fontWeight: "500" }}>{l.label}</span>
            <span style={{ fontSize: "13px", color: "#2d3748", fontWeight: "600" }}>{l.value}</span>
          </div>
        ))}
      </div>

      {/* Campos extras — primeira consulta */}
      <div style={{
        backgroundColor: "white", borderRadius: "16px", padding: "20px",
        border: "1px solid #e2e8f0", marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}>
        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", marginBottom: form.primeiraConsulta ? "16px" : "0" }}>
          <div
            onClick={() => setForm((f) => ({ ...f, primeiraConsulta: !f.primeiraConsulta }))}
            style={{
              width: "20px", height: "20px", borderRadius: "6px", flexShrink: 0,
              border: form.primeiraConsulta ? "none" : "2px solid #e2e8f0",
              backgroundColor: form.primeiraConsulta ? "#2B7A78" : "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {form.primeiraConsulta && <Check size={12} color="white" strokeWidth={3} />}
          </div>
          <span style={{ fontSize: "14px", color: "#2d3748", fontWeight: "500" }}>Esta é minha primeira consulta</span>
        </label>

        {form.primeiraConsulta && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", animation: "fadeIn 0.25s ease" }}>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#2d3748", display: "block", marginBottom: "6px" }}>
                Queixa principal <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Descreva brevemente o motivo da consulta"
                value={form.queixaPrincipal}
                onChange={(e) => setForm((f) => ({ ...f, queixaPrincipal: e.target.value }))}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: "10px", fontSize: "14px",
                  border: "1.5px solid #e2e8f0", outline: "none", resize: "vertical", fontFamily: "inherit",
                  boxSizing: "border-box", transition: "border-color 0.2s",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#3AAFA9"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; }}
              />
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#2d3748", display: "block", marginBottom: "6px" }}>
                Medicamentos em uso <span style={{ color: "#64748b", fontWeight: "400" }}>(opcional)</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Dipirona 500mg, Losartana 50mg"
                value={form.medicamentos}
                onChange={(e) => setForm((f) => ({ ...f, medicamentos: e.target.value }))}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: "10px", fontSize: "14px",
                  border: "1.5px solid #e2e8f0", outline: "none", boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#3AAFA9"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Erro de conflito */}
      {submitError && (
        <div style={{
          display: "flex", alignItems: "flex-start", gap: "10px",
          backgroundColor: "#fef2f2", border: "1px solid #fecaca",
          borderRadius: "12px", padding: "14px 16px", marginBottom: "16px",
        }}>
          <AlertCircle size={18} color="#dc2626" style={{ flexShrink: 0, marginTop: "1px" }} />
          <p style={{ fontSize: "14px", color: "#dc2626", margin: 0 }}>{submitError}</p>
        </div>
      )}

      {/* Botão confirmar */}
      <button
        onClick={onConfirmar}
        disabled={submitting}
        style={{
          width: "100%", padding: "14px", backgroundColor: submitting ? "#a0aec0" : "#2B7A78",
          color: "white", border: "none", borderRadius: "30px", fontSize: "16px",
          fontWeight: "700", cursor: submitting ? "not-allowed" : "pointer",
          transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
        }}
        onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = "#3AAFA9"; }}
        onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = "#2B7A78"; }}
      >
        {submitting
          ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Confirmando…</>
          : <><Check size={18} /> Confirmar agendamento</>
        }
      </button>
    </div>
  );
}


    function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f7f9", display: "flex", fontFamily: "Arial, sans-serif" }}>
      <style>{`
        @keyframes pulse  { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin   { to { transform: rotate(360deg); } }
      `}</style>
      <Sidebar activeHref="/schedule" />
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PÁGINA PRINCIPAL
// ─────────────────────────────────────────────────────────────
function ScheduleContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const servicoParam = searchParams.get("servico");
  const remarcarId   = searchParams.get("remarcar");

  const [etapa, setEtapa]           = useState(0);
  const [servicos, setServicos]     = useState<Servico[]>([]);
  const [profissionais, setProfis]  = useState<Profissional[]>([]);
  const [loadingServ, setLoadServ]  = useState(true);
  const [loadingProf, setLoadProf]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitErr] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    tipo: null,
    endereco: "",
    servicoId: servicoParam ?? null,
    profissionalId: null,
    slot: null,
    primeiraConsulta: false,
    queixaPrincipal: "",
    medicamentos: "",
  });

  // Buscar serviços
  useEffect(() => {
    async function load() {
      setLoadServ(true);
      try {
        // 🔁 const res = await fetch("/api/services"); const data = await res.json();
        await new Promise((r) => setTimeout(r, 600));
        setServicos([
          { id: "1", nome: "Fisioterapia Ortopédica",  descricao: "Reabilitação musculoesquelética", duracao: 50, icone: "🦴", categoria: "Ortopedia" },
          { id: "2", nome: "Fisioterapia Neurológica", descricao: "Condições neurológicas",          duracao: 60, icone: "🧠", categoria: "Neurologia" },
          { id: "3", nome: "Fisioterapia Respiratória",descricao: "Reabilitação pulmonar",           duracao: 45, icone: "🫁", categoria: "Respiratória" },
          { id: "4", nome: "RPG",                      descricao: "Reeducação postural global",      duracao: 60, icone: "🧘", categoria: "Postura" },
          { id: "5", nome: "Pilates Terapêutico",      descricao: "Fortalecimento e flexibilidade",  duracao: 50, icone: "💪", categoria: "Condicionamento" },
          { id: "6", nome: "Acupuntura",               descricao: "Estimulação de pontos",           duracao: 40, icone: "🎯", categoria: "Complementar" },
        ]);
      } finally {
        setLoadServ(false);
      }
    }
    load();
  }, []);

  // Buscar profissionais quando chegar na etapa 3
  useEffect(() => {
    if (etapa !== 2) return;
    async function load() {
      setLoadProf(true);
      try {
        // 🔁 const res = await fetch(`/api/professionals?servico=${form.servicoId}`); ...
        await new Promise((r) => setTimeout(r, 500));
        setProfis([
          { id: "p1", nome: "Dra. Fernanda Lima",  especialidade: "Fisioterapia Ortopédica e Esportiva" },
          { id: "p2", nome: "Dr. Carlos Mendes",   especialidade: "Fisioterapia Neurológica" },
          { id: "p3", nome: "Dra. Marina Costa",   especialidade: "Fisioterapia Respiratória e Pilates" },
        ]);
      } finally {
        setLoadProf(false);
      }
    }
    load();
  }, [etapa]);

  // Validação por etapa
  function etapaValida(): boolean {
    switch (etapa) {
      case 0: return form.tipo !== null && (form.tipo === "presencial" || form.endereco.trim().length > 5);
      case 1: return form.servicoId !== null;
      case 2: return true; // profissionalId null = sem preferência, válido
      case 3: return form.slot !== null;
      case 4: return !form.primeiraConsulta || form.queixaPrincipal.trim().length > 0;
      default: return false;
    }
  }

  async function handleConfirmar() {
    setSubmitErr(null);
    setSubmitting(true);
    try {
      // 🔁 Real:
      // const res = await fetch("/api/appointments", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ...form, pacienteId: "user-teste-123" }),
      // });
      // if (res.status === 409) { setSubmitErr("Este horário não está mais disponível. Escolha outra data."); setEtapa(3); return; }
      // if (!res.ok) throw new Error();
      await new Promise((r) => setTimeout(r, 1200));
      router.push("/dashboard?agendado=1");
    } catch {
      setSubmitErr("Erro ao confirmar agendamento. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  



  return (
    <Shell>
      <main style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>
        {/* Cabeçalho */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", color: "#2B7A78", margin: 0, fontWeight: "bold" }}>Novo Agendamento</h1>
          <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: "15px" }}>Siga as etapas para agendar sua consulta.</p>
        </div>

        {/* Barra de progresso */}
        <ProgressBar etapaAtual={etapa} />

        {/* Card da etapa */}
        <div style={{
          backgroundColor: "white", borderRadius: "20px", padding: "32px",
          border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          marginBottom: "24px",
        }}>
          {etapa === 0 && <Etapa1 form={form} setForm={setForm} />}
          {etapa === 1 && <Etapa2 form={form} setForm={setForm} servicos={servicos} loadingServicos={loadingServ} />}
          {etapa === 2 && <Etapa3 form={form} setForm={setForm} profissionais={profissionais} loadingProf={loadingProf} />}
          {etapa === 3 && <Etapa4 form={form} setForm={setForm} />}
          {etapa === 4 && (
            <Etapa5
              form={form} setForm={setForm}
              servicos={servicos} profissionais={profissionais}
              submitting={submitting} submitError={submitError}
              onConfirmar={handleConfirmar}
            />
          )}
        </div>

        {/* Navegação Voltar / Próximo */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
          <button
            onClick={() => setEtapa((e) => e - 1)}
            disabled={etapa === 0}
            style={{
              padding: "12px 24px", borderRadius: "30px", fontSize: "14px", fontWeight: "600",
              border: "1.5px solid #e2e8f0", backgroundColor: "white",
              color: etapa === 0 ? "#d1d5db" : "#4a5568",
              cursor: etapa === 0 ? "not-allowed" : "pointer", transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: "6px",
            }}
            onMouseEnter={(e) => { if (etapa > 0) { e.currentTarget.style.borderColor = "#3AAFA9"; e.currentTarget.style.color = "#2B7A78"; } }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = etapa === 0 ? "#d1d5db" : "#4a5568"; }}
          >
            <ChevronLeft size={16} /> Voltar
          </button>

          {etapa < 4 && (
            <button
              onClick={() => { if (etapaValida()) setEtapa((e) => e + 1); }}
              disabled={!etapaValida()}
              style={{
                padding: "12px 28px", borderRadius: "30px", fontSize: "14px", fontWeight: "700",
                border: "none",
                backgroundColor: etapaValida() ? "#2B7A78" : "#e2e8f0",
                color: etapaValida() ? "white" : "#a0aec0",
                cursor: etapaValida() ? "pointer" : "not-allowed", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "6px",
              }}
              onMouseEnter={(e) => { if (etapaValida()) e.currentTarget.style.backgroundColor = "#3AAFA9"; }}
              onMouseLeave={(e) => { if (etapaValida()) e.currentTarget.style.backgroundColor = "#2B7A78"; }}
            >
              Próximo <ChevronRight size={16} />
            </button>
          )}
        </div>

        <div style={{ marginTop: "40px", textAlign: "center", fontSize: "12px", color: "#a0aec0", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
          © 2026 UnBemEstar — Todos os direitos reservados &nbsp;·&nbsp; Desenvolvido por alunos da UnB — MDS 2026.1
        </div>
      </main>
    </Shell>
  );
}

export default function SchedulePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f0f7f9", fontFamily: "Arial, sans-serif" }}>
        <div style={{ fontSize: "18px", color: "#2B7A78" }}>Carregando…</div>
      </div>
    }>
      <ScheduleContent />
    </Suspense>
  );
}