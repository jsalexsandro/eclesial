"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Player } from "@/src/types/player";
import Footer from "@/components/footer-game";
import Header from "@/components/header-game";
import Timeline from "@/components/timeline";
import Panel from "@/components/panel";
import PanelCleroContent from "@/components/panel-clero-content";
import PanelEstudosContent from "@/components/panel-estudos-content";
import DialogPopup from "@/components/dialog-popup";
import { advanceYear, initializePlayer, aplicarMatriculaCatequese, adicionarPrimeiroDiaCatequese, OPCOES_MATRICULA } from "@/src/lib/game-engine";
import { carregarDialogo, processarTexto, sortearTexto } from "@/src/lib/dialog-engine";

const DIAS = ["domingo", "sabado", "quarta-feira", "terca-feira", "segunda-feira"]

export default function Game() {
  const router = useRouter();
  const [player, setPlayer] = useState<Player | null>(null);
  const [ready, setReady] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [catequeseText, setCatequeseText] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("eclesial-player");
    if (!raw) {
      router.replace("/");
      return;
    }
    const parsed: Player = JSON.parse(raw);
    const initialized = initializePlayer(parsed);
    if (initialized !== parsed) {
      localStorage.setItem("eclesial-player", JSON.stringify(initialized));
    }
    setPlayer(initialized);
    setReady(true);
  }, [router]);

  if (!player || !ready) return null;

  function isLocked(title: string): boolean {
    const age = player!.profile.age;
    if (age < 7 && (title === "Estudos" || title === "Pessoas")) return true;
    return false;
  }

  function handleAdvanceAge() {
    const updated = advanceYear(player!);
    localStorage.setItem("eclesial-player", JSON.stringify(updated));
    setPlayer(updated);
    if (updated.profile.age === 7) {
      const dialogo = carregarDialogo("matricula-feita-pelos-pais")
      const day = DIAS[Math.floor(Math.random() * DIAS.length)]
      const text = processarTexto(sortearTexto(dialogo.textos), {
        name: updated.profile.name,
        parish: updated.profile.parish,
        day,
      })
      setCatequeseText(text)
    }
  }

  function handleCatequeseChoice(choice: number) {
    if (!catequeseText) return
    const updated = aplicarMatriculaCatequese(player!, catequeseText, choice)
    const withPrimeiro = adicionarPrimeiroDiaCatequese(updated)
    localStorage.setItem("eclesial-player", JSON.stringify(withPrimeiro))
    setPlayer(withPrimeiro)
    setCatequeseText(null)
  }

  function handleOpenPanel(panel: string) {
    setActivePanel(panel);
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Header
        name={player.profile.name}
        surname={player.profile.surname}
        role={player.ministry.currentRole}
        honorific=""
        money={player.finances.money}
      />

      <Timeline sequences={player.history.sequences} />

      <Footer
        age={player.profile.age}
        isLocked={isLocked}
        onAdvanceAge={handleAdvanceAge}
        onOpenPanel={handleOpenPanel}
      />

      {activePanel && (
        <Panel title={activePanel} onClose={() => setActivePanel(null)}>
          {activePanel === "Clero" && <PanelCleroContent player={player} onUpdate={setPlayer} onClose={() => setActivePanel(null)} />}
          {activePanel === "Estudos" && <PanelEstudosContent player={player} onUpdate={setPlayer} onClose={() => setActivePanel(null)} />}
        </Panel>
      )}

      {catequeseText && (
        <DialogPopup
          text={catequeseText}
          options={OPCOES_MATRICULA}
          onChoice={handleCatequeseChoice}
        />
      )}
    </div>
  );
}
