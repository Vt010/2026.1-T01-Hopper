"use client";

import { useState } from "react";
import Link from "next/link";

const teamData = [
  {
    id: 1,
    name: "Vitor Eduardo Araújo",
    role: "Líder / Scrum Master",
    github: "vitoraraujoooo",
    contributions: [
      "Coordenação da equipe e gestão do projeto",
      "Configuração do repositório e branches",
      "Documentação principal do sistema",
      "Configuração do GitHub Pages"
    ]
  },
  {
    id: 2,
    name: "Brenda Maria Cavalcante Chaves",
    role: "Desenvolvedor Front-End",
    github: "brendamcc",
    contributions: [
      "Páginas de cadastro e login (frontend)",
      "Calendário interativo",
      "Dashboard do paciente",
      "Página inicial institucional",
      "Design e identidade visual"
    ]
  },
  {
    id: 3,
    name: "Breno Elias de Carvalho Correia",
    role: "Arquitetura e DevOps",
    github: "brenoelias",
    contributions: [
      "Definição da arquitetura do sistema",
      "Configuração do Supabase",
      "Deploy na Vercel",
      "Configuração de CI/CD"
    ]
  },
  {
    id: 4,
    name: "Flávia de Melo Rebelato",
    role: "Product Owner",
    github: "flaviamelo",
    contributions: [
      "Definição de requisitos funcionais",
      "Priorização de funcionalidades",
      "Validação com o cliente",
      "Criação do backlog do produto"
    ]
  },
  {
    id: 5,
    name: "Thiago da Silva Borges",
    role: "Desenvolvedor Back-End",
    github: "thiagosil",
    contributions: [
      "APIs de agendamento (RF03)",
      "Integração com Supabase Auth",
      "Lógica de reserva de horários (RF16)",
      "Validação de dados com Zod"
    ]
  },
  {
    id: 6,
    name: "João Paulo da Silva Pereira",
    role: "Documentação e Requisitos",
    github: "joaopaulo",
    contributions: [
      "Documentação do sistema",
      "Atas de reunião",
      "Especificação de requisitos",
      "Diagramas e modelagem"
    ]
  },
  {
    id: 7,
    name: "Pablo Antonio Martins de Sousa",
    role: "Arquitetura e DevOps",
    github: "pablosousa",
    contributions: [
      "Estrutura de pastas do projeto",
      "Configuração do ambiente de desenvolvimento",
      "Automação de deploys"
    ]
  },
  {
    id: 8,
    name: "Pedro Victor Teixeira Silva",
    role: "Desenvolvedor Back-End",
    github: "pedrovictor",
    contributions: [
      "APIs de autenticação (RF01 e RF02)",
      "Lógica de usuários e perfis",
      "Integração com Resend (e-mails)"
    ]
  },
  {
    id: 9,
    name: "Alexandre Vilar Valadares Fonsêca",
    role: "Desenvolvedor Front-End",
    github: "alexandrevilar",
    contributions: [
      "Página de agendamento (schedule)",
      "Calendário interativo",
      "Componentes reutilizáveis",
      "Responsividade e acessibilidade"
    ]
  },
  {
    id: 10,
    name: "João Vitor Tavares de Sá Lima",
    role: "Arquitetura e DevOps",
    github: "joaovitor",
    contributions: [
      "Diagrama de implantação",
      "Configuração da Vercel",
      "Pipeline de CI/CD",
      "Monitoramento e logs"
    ]
  }
];

export default function ContributorsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeam = teamData.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMember = (id: number) => {
    setSelectedId(selectedId === id ? null : id);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f0f7f9",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <div>
            <h1 style={{
              fontSize: "32px",
              color: "#2B7A78",
              margin: 0,
              fontWeight: "bold"
            }}>
              🌟 Quem Fez o Quê?
            </h1>
            <p style={{
              color: "#718096",
              margin: "4px 0 0",
              fontSize: "14px"
            }}>
              Clique em um membro para ver suas contribuições
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="/">
              <button style={{
                padding: "10px 24px",
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "30px",
                cursor: "pointer",
                color: "#4a4a4a",
                transition: "all 0.2s"
              }}>
                ← Voltar
              </button>
            </Link>
            <Link href="/dashboard">
              <button style={{
                padding: "10px 24px",
                backgroundColor: "#3AAFA9",
                border: "none",
                borderRadius: "30px",
                cursor: "pointer",
                color: "white",
                fontWeight: "bold"
              }}>
                Dashboard
              </button>
            </Link>
          </div>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <input
            type="text"
            placeholder="🔍 Buscar por nome ou função..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "12px 20px",
              borderRadius: "30px",
              border: "1px solid #e2e8f0",
              fontSize: "14px",
              outline: "none",
              transition: "all 0.2s"
            }}
          />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px"
        }}>
          {filteredTeam.map((member) => {
            const isOpen = selectedId === member.id;
            return (
              <div
                key={member.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  padding: "20px",
                  border: isOpen ? "2px solid #3AAFA9" : "1px solid #e2e8f0",
                  boxShadow: isOpen ? "0 8px 25px rgba(58,175,169,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onClick={() => toggleMember(member.id)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "#2B7A78",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "20px",
                    flexShrink: 0
                  }}>
                    {member.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#2d3748",
                      margin: 0
                    }}>
                      {member.name}
                    </h3>
                    <p style={{
                      fontSize: "13px",
                      color: "#2B7A78",
                      margin: "2px 0 0",
                      fontWeight: "500"
                    }}>
                      {member.role}
                    </p>
                    <p style={{
                      fontSize: "11px",
                      color: "#a0aec0",
                      margin: "2px 0 0"
                    }}>
                      GitHub: {member.github}
                    </p>
                  </div>
                  <div style={{
                    fontSize: "20px",
                    color: isOpen ? "#3AAFA9" : "#a0aec0",
                    transition: "transform 0.3s",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0)"
                  }}>
                    {isOpen ? "▲" : "▼"}
                  </div>
                </div>

                {isOpen && (
                  <div style={{
                    marginTop: "16px",
                    paddingTop: "16px",
                    borderTop: "2px solid #f0f4f8",
                    animation: "fadeIn 0.3s ease"
                  }}>
                    <p style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#2B7A78",
                      marginBottom: "12px"
                    }}>
                      📌 Contribuições:
                    </p>
                    <ul style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0
                    }}>
                      {member.contributions.map((item, index) => (
                        <li key={index} style={{
                          padding: "8px 0",
                          fontSize: "14px",
                          color: "#4a4a4a",
                          borderBottom: index < member.contributions.length - 1 ? "1px solid #f0f4f8" : "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}>
                          <span style={{ color: "#3AAFA9" }}>✅</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: "40px",
          padding: "16px",
          textAlign: "center",
          color: "#a0aec0",
          fontSize: "13px",
          borderTop: "1px solid #e2e8f0"
        }}>
          {filteredTeam.length} membros da equipe UnBemEstar
        </div>
      </div>
    </div>
  );
}