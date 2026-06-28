"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  FileText,
  Mail,
  Users,
  ArrowRight,
  Star,
} from "lucide-react";

function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const aboutFade = useFadeInOnScroll();
  const featuresFade = useFadeInOnScroll();
  const statsFade = useFadeInOnScroll();

  function fadeStyle(visible: boolean): React.CSSProperties {
    return {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    };
  }

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: scrolled ? "white" : "transparent",
          boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.3s ease",
          zIndex: 1000,
          padding: "16px 32px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "2px",
                display: "flex",
                boxShadow: scrolled ? "none" : "0 1px 4px rgba(0,0,0,0.08)",
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
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#2B7A78",
              }}
            >
              Un<span style={{ fontWeight: "900" }}>Bem</span>Estar
            </span>
          </div>

          <nav
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {!isMobile && (
              <>
                <a
                  href="#home"
                  style={{
                    textDecoration: "none",
                    color: "#4a4a4a",
                    fontSize: "14px",
                  }}
                >
                  Início
                </a>
                <a
                  href="#about"
                  style={{
                    textDecoration: "none",
                    color: "#4a4a4a",
                    fontSize: "14px",
                  }}
                >
                  Sobre
                </a>
                <a
                  href="#features"
                  style={{
                    textDecoration: "none",
                    color: "#4a4a4a",
                    fontSize: "14px",
                  }}
                >
                  Funcionalidades
                </a>
              </>
            )}

            <Link href="/contributors">
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  color: "#2B7A78",
                  border: "2px solid #2B7A78",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "500",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2B7A78";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#2B7A78";
                }}
              >
                <Users size={14} /> Time
              </button>
            </Link>

            {!isMobile && (
              <Link
                href="/login"
                style={{
                  textDecoration: "none",
                  color: "#4a4a4a",
                  fontSize: "14px",
                }}
              >
                Entrar
              </Link>
            )}

            <Link href="/register">
              <button
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#2B7A78",
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#3AAFA9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#2B7A78";
                }}
              >
                Cadastrar
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <section
        id="home"
        style={{
          padding: isMobile ? "120px 20px 60px" : "140px 32px 80px",
          background: "linear-gradient(135deg, #f0f7f9 0%, #ffffff 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "32px" : "48px",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: isMobile ? "32px" : "48px",
                color: "#2B7A78",
                marginBottom: "20px",
                lineHeight: "1.2",
              }}
            >
              Gestão inteligente para clínicas de fisioterapia
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "#64748b",
                marginBottom: "32px",
                lineHeight: "1.6",
              }}
            >
              Agende consultas, gerencie prontuários e automatize lembretes —
              tudo em um só lugar.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/register">
                <button
                  style={{
                    padding: "14px 32px",
                    backgroundColor: "#2B7A78",
                    color: "white",
                    border: "none",
                    borderRadius: "40px",
                    fontSize: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#3AAFA9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#2B7A78";
                  }}
                >
                  Começar agora <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/schedule">
                <button
                  style={{
                    padding: "14px 32px",
                    backgroundColor: "transparent",
                    color: "#2B7A78",
                    border: "2px solid #2B7A78",
                    borderRadius: "40px",
                    fontSize: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#2B7A78";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#2B7A78";
                  }}
                >
                  Ver calendário
                </button>
              </Link>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f0f7f9",
              borderRadius: "24px",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <Calendar size={72} color="#2B7A78" strokeWidth={1.5} />
            <p style={{ marginTop: "16px", color: "#2B7A78", fontSize: "18px" }}>
              Agendamento simplificado
            </p>
          </div>
        </div>
      </section>

      <section
        ref={statsFade.ref}
        style={{
          padding: "48px 32px",
          backgroundColor: "#2B7A78",
          ...fadeStyle(statsFade.visible),
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "24px",
            textAlign: "center",
          }}
        >
          {[
            { numero: "500+", label: "Pacientes atendidos" },
            { numero: "98%", label: "Satisfação" },
            { numero: "24/7", label: "Agendamento online" },
            { numero: "12", label: "Clínicas parceiras" },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ fontSize: "30px", fontWeight: "800", color: "white", margin: 0 }}>
                {item.numero}
              </p>
              <p style={{ fontSize: "13px", color: "#cbd5e1", margin: "4px 0 0" }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="about"
        ref={aboutFade.ref}
        style={{ padding: "80px 32px", ...fadeStyle(aboutFade.visible) }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", color: "#2B7A78", marginBottom: "16px" }}>
            Sobre o UnBemEstar
          </h2>
          <p
            style={{
              color: "#64748b",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.7",
              fontSize: "17px",
            }}
          >
            O UnBemEstar é uma plataforma web desenvolvida para automatizar e
            centralizar a gestão de clínicas de fisioterapia. Nosso objetivo é
            eliminar processos manuais e reduzir a dependência de aplicativos de
            mensagem, oferecendo uma experiência profissional e eficiente para
            pacientes e gestores.
          </p>
        </div>
      </section>

      <section
        id="features"
        ref={featuresFade.ref}
        style={{
          padding: "80px 32px",
          backgroundColor: "#f0f7f9",
          ...fadeStyle(featuresFade.visible),
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", color: "#2B7A78", marginBottom: "16px" }}>
            Funcionalidades
          </h2>
          <p style={{ color: "#64748b", marginBottom: "48px" }}>
            Tudo que sua clínica precisa em um só lugar
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "32px",
            }}
          >
            {[
              { Icon: Calendar, title: "Agendamento Online", desc: "Pacientes agendam consultas 24/7" },
              { Icon: FileText, title: "Prontuário Digital", desc: "Histórico clínico completo e seguro" },
              { Icon: Mail, title: "Lembretes Automáticos", desc: "Notificações por e-mail 24h antes" },
              { Icon: Users, title: "Multi-perfis", desc: "Pacientes, fisioterapeutas e secretárias" },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  padding: "24px",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    backgroundColor: "#e6f7f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <Icon size={26} color="#2B7A78" strokeWidth={1.8} />
                </div>
                <h3 style={{ marginTop: "16px", color: "#2B7A78", fontSize: "18px" }}>
                  {title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "14px" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", color: "#2B7A78", marginBottom: "48px" }}>
            O que dizem nossos pacientes
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {[
              { nome: "Maria S.", texto: "Agendar minhas sessões ficou muito mais fácil, sem precisar mandar mensagem pra clínica." },
              { nome: "João P.", texto: "O acompanhamento do histórico me ajudou a entender minha evolução no tratamento." },
              { nome: "Ana C.", texto: "Os lembretes por e-mail evitaram que eu esquecesse consultas importantes." },
            ].map((dep) => (
              <div
                key={dep.nome}
                style={{
                  padding: "28px",
                  backgroundColor: "#f8fafc",
                  borderRadius: "16px",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} color="#3AAFA9" fill="#3AAFA9" />
                  ))}
                </div>
                <p style={{ color: "#475569", fontSize: "14px", lineHeight: "1.6", marginBottom: "16px" }}>
                  “{dep.texto}”
                </p>
                <p style={{ color: "#2B7A78", fontWeight: "600", fontSize: "14px", margin: 0 }}>
                  {dep.nome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "64px 32px",
          background: "linear-gradient(135deg, #2B7A78 0%, #3AAFA9 100%)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "white", fontSize: "28px", marginBottom: "12px" }}>
          Pronto para modernizar sua clínica?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "28px", fontSize: "16px" }}>
          Cadastre-se gratuitamente e comece a usar em poucos minutos.
        </p>
        <Link href="/register">
          <button
            style={{
              padding: "14px 36px",
              backgroundColor: "white",
              color: "#2B7A78",
              border: "none",
              borderRadius: "40px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Cadastrar minha clínica
          </button>
        </Link>
      </section>

      <footer
        style={{
          backgroundColor: "#2B7A78",
          color: "white",
          padding: "48px 32px",
          textAlign: "center",
        }}
      >
        <p>&copy; 2026 UnBemEstar — Todos os direitos reservados</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            marginTop: "16px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/contributors"
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#cbd5e1";
            }}
          >
            🌟 Conheça o time
          </Link>
          <Link
            href="/login"
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#cbd5e1";
            }}
          >
            Entrar
          </Link>
          <Link
            href="/register"
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#cbd5e1";
            }}
          >
            Cadastrar
          </Link>
        </div>

        <p
          style={{
            marginTop: "16px",
            fontSize: "14px",
            color: "#cbd5e1",
          }}
        >
          Desenvolvido por alunos da UnB — MDS 2026.1
        </p>
      </footer>
    </div>
  );
}