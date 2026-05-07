import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { MISSOES, gerarMissoesPersonalizadas } from "../data/missoes";
import { AtualizarPerfilDados, CategoriaMissao, Conquista, Missao, NovaMissaoDados, OnboardingPerfil, PreferenciasUsuario, StatusMissao, TipoMissao, Usuario } from "../types";
import { buscar, remover, salvar } from "../services/storage";

interface ContextData {
  carregandoInicial: boolean;
  usuario: Usuario | null;
  missoes: Missao[];
  conquistas: Conquista[];
  login: (email: string, senha: string) => Promise<void>;
  atualizarPerfil: (dados: AtualizarPerfilDados) => Promise<void>;
  completarMissao: (id: string) => void;
  adicionarMissao: (missao: NovaMissaoDados) => Promise<void>;
  concluirOnboarding: (perfil: OnboardingPerfil) => Promise<void>;
  logout: () => Promise<void>;
  resetarPlano: () => Promise<void>;
}

const Context = createContext<ContextData | undefined>(undefined);
const XP_POR_NIVEL = [0, 100, 250, 500, 900, 1400];
const PREFERENCIAS_PADRAO: PreferenciasUsuario = {
  notificacoes: true,
  lembreteHorario: "08:00",
  metaDiaria: 3,
  tema: "sistema",
};

function calcularNivel(xp: number) {
  return XP_POR_NIVEL.reduce((nivel, xpNecessario, index) => {
    return xp >= xpNecessario ? index + 1 : nivel;
  }, 1);
}

function nomePorEmail(email: string) {
  const nome = email.split("@")[0].replace(/[._-]/g, " ");
  return nome
    .split(" ")
    .filter(Boolean)
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(" ");
}

function montarConquistas(usuario: Usuario | null, missoes: Missao[]): Conquista[] {
  const concluidas = missoes.filter((m) => m.status === StatusMissao.Concluida);
  const categorias = new Set(concluidas.map((m) => m.categoria));

  return [
    {
      id: "primeira-missao",
      titulo: "Primeira missão",
      descricao: "Complete sua primeira missão.",
      desbloqueada: concluidas.length >= 1 || !!usuario?.conquistas.includes("primeira-missao"),
    },
    {
      id: "streak-7",
      titulo: "7 dias seguidos",
      descricao: "Mantenha uma sequência de 7 dias.",
      desbloqueada: (usuario?.streak ?? 0) >= 7 || !!usuario?.conquistas.includes("streak-7"),
    },
    {
      id: "equilibrio",
      titulo: "Equilíbrio entre áreas",
      descricao: "Complete missões em saúde mental, física, lazer e sono.",
      desbloqueada: categorias.size >= 4 || !!usuario?.conquistas.includes("equilibrio"),
    },
    {
      id: "dia-perfeito",
      titulo: "Dia perfeito",
      descricao: "Complete todas as missões do dia.",
      desbloqueada: missoes.length > 0 && missoes.every((m) => m.status === StatusMissao.Concluida),
    },
  ];
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [carregandoInicial, setCarregandoInicial] = useState(true);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [missoes, setMissoes] = useState<Missao[]>(MISSOES);
  const conquistas = montarConquistas(usuario, missoes);

  useEffect(() => {
    async function load() {
      try {
        const user = await buscar<Usuario>("user");
        if (user) {
          setUsuario({
            ...user,
            conquistas: user.conquistas ?? [],
            diasPerfeitos: user.diasPerfeitos ?? 0,
            onboardingCompleto: user.onboardingCompleto ?? false,
            preferencias: {
              ...PREFERENCIAS_PADRAO,
              ...user.preferencias,
            },
          });
        }

        const storedMissoes = await buscar<Missao[]>("missoes");
        if (storedMissoes) setMissoes(storedMissoes);
      } finally {
        setCarregandoInicial(false);
      }
    }
    load();
  }, []);

  async function login(email: string, senha: string) {
    const emailNormalizado = email.trim().toLowerCase();

    if (!emailNormalizado.includes("@")) throw new Error("Email inválido");
    if (senha.length < 6) throw new Error("Senha curta");

    const user: Usuario = {
      id: emailNormalizado,
      nome: nomePorEmail(emailNormalizado) || "Usuário",
      email: emailNormalizado,
      nivel: 1,
      xp: 0,
      moedas: 0,
      streak: 0,
      areaDominante: CategoriaMissao.Mental,
      onboardingCompleto: false,
      preferencias: { ...PREFERENCIAS_PADRAO },
      conquistas: [],
      diasPerfeitos: 0,
    };

    setUsuario(user);
    await salvar("user", user);
  }

  async function atualizarPerfil(dados: AtualizarPerfilDados) {
    if (!usuario) return;

    const usuarioAtualizado: Usuario = {
      ...usuario,
      nome: dados.nome,
      areaDominante: dados.areaDominante,
      preferencias: dados.preferencias,
      perfil: usuario.perfil
        ? {
            ...usuario.perfil,
            foco: dados.areaDominante,
          }
        : usuario.perfil,
    };

    setUsuario(usuarioAtualizado);
    await salvar("user", usuarioAtualizado);
  }

  async function concluirOnboarding(perfil: OnboardingPerfil) {
    if (!usuario) return;

    const plano = gerarMissoesPersonalizadas(perfil.foco, perfil.tempoDiario);
    const atualizado: Usuario = {
      ...usuario,
      areaDominante: perfil.foco,
      onboardingCompleto: true,
      perfil,
    };

    setUsuario(atualizado);
    setMissoes(plano);
    await salvar("user", atualizado);
    await salvar("missoes", plano);
  }

  function completarMissao(id: string) {
    const missao = missoes.find((m) => m.id === id);
    if (!usuario || !missao || missao.status === StatusMissao.Concluida) return;

    const novasMissoes = missoes.map((m) =>
      m.id === id
        ? { ...m, status: StatusMissao.Concluida, progressoAtual: m.objetivo }
        : m
    );
    const completouTudo = novasMissoes.every((m) => m.status === StatusMissao.Concluida);
    const bonusDiaPerfeito = completouTudo ? 50 : 0;
    const novoXp = usuario.xp + missao.recompensaXp + bonusDiaPerfeito;
    const conquistasDesbloqueadas = montarConquistas(usuario, novasMissoes)
      .filter((c) => c.desbloqueada)
      .map((c) => c.id);

    const usuarioAtualizado: Usuario = {
      ...usuario,
      xp: novoXp,
      nivel: calcularNivel(novoXp),
      moedas: usuario.moedas + missao.recompensaMoedas + (completouTudo ? 10 : 0),
      streak: completouTudo ? usuario.streak + 1 : usuario.streak,
      diasPerfeitos: completouTudo ? usuario.diasPerfeitos + 1 : usuario.diasPerfeitos,
      conquistas: Array.from(new Set([...usuario.conquistas, ...conquistasDesbloqueadas])),
    };

    setMissoes(novasMissoes);
    setUsuario(usuarioAtualizado);
    salvar("missoes", novasMissoes);
    salvar("user", usuarioAtualizado);
  }

  async function adicionarMissao(missao: NovaMissaoDados) {
    const novaMissao: Missao = {
      ...missao,
      id: `extra-${Date.now()}`,
      tipo: missao.tipo ?? TipoMissao.Simples,
      status: StatusMissao.Pendente,
      progressoAtual: 0,
      objetivo: 1,
    };

    const novasMissoes = [...missoes, novaMissao];
    setMissoes(novasMissoes);
    await salvar("missoes", novasMissoes);
  }
  async function resetarPlano() {
    if (!usuario?.perfil) return;
    const novoPlano = gerarMissoesPersonalizadas(usuario.perfil.foco, usuario.perfil.tempoDiario);
    setMissoes(novoPlano);
    await salvar("missoes", novoPlano);
  }

  async function logout() {
    setUsuario(null);
    setMissoes(MISSOES);
    await remover("user");
    await remover("missoes");
  }

  return (
    <Context.Provider
      value={{
        carregandoInicial,
        usuario,
        missoes,
        conquistas,
        login,
        atualizarPerfil,
        completarMissao,
        adicionarMissao,
        concluirOnboarding,
        logout,
        resetarPlano,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useApp = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useApp deve ser usado dentro de um AppProvider");
  }
  return context;
};
