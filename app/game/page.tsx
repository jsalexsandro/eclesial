"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Player } from "@/src/types/player";
import Footer from "@/components/footer-game";
import Header from "@/components/header-game";
import Timeline from "@/components/timeline";
import { advanceYear, initializePlayer } from "@/src/lib/game-engine";

export default function Game() {
  const router = useRouter();
  const [player, setPlayer] = useState<Player | null>(null);
  const [ready, setReady] = useState(false);

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
    setPlayer((prev) => {
      if (!prev) return prev;
      const updated = advanceYear(prev);
      localStorage.setItem("eclesial-player", JSON.stringify(updated));
      return updated;
    });
  }

  function handleOpenPanel(panel: string) {
    console.log("Abrir painel:", panel);
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
    </div>
  );
}
