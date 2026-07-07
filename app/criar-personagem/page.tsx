"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SelecionarParoquia } from "@/components/selecionar-paroquia";
import { createDefaultPlayer, type PlayerProfile } from "@/src/types/player";

interface ParoquiaData {
  provincia: string;
  diocese: string;
  tipo: string;
  paroquia: string;
}

export default function CriarPersonagem() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [paroquia, setParoquia] = useState<ParoquiaData | null>(null);

  const canSave = nome.trim() && sobrenome.trim() && paroquia;

  function handleSalvar() {
    if (!canSave) return;
    const profile: PlayerProfile = {
      name: nome,
      surname: sobrenome,
      sex: "",
      birthYear: 0,
      age: 0,
      diocese: paroquia!.diocese,
      parish: paroquia!.paroquia,
      familyName: "",
    };
    const player = createDefaultPlayer(crypto.randomUUID(), profile);
    localStorage.setItem("eclesial-player", JSON.stringify(player));
    router.push("/game");
  }

  return (
    <div className="flex min-h-dvh">
      <main className="flex flex-1 flex-col justify-center px-8 py-12 md:px-16 lg:px-24">
        <h1 className="text-2xl font-bold tracking-tight">
          CRIAR PERSONAGEM
        </h1>
        <p className="text-xs text-muted-foreground/70">
          Configurações básicas sobre seu personagem
        </p>

        <div className="mt-10 flex max-w-md flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="text-sm font-semibold">
              Nome
            </label>
            <input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none ring-ring transition-shadow focus:border-2 focus:border-ring focus:shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="sobrenome" className="text-sm font-semibold">
              Sobrenome
            </label>
            <input
              id="sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none ring-ring transition-shadow focus:border-2 focus:border-ring focus:shadow-sm"
            />
          </div>

          <SelecionarParoquia onSelect={setParoquia} />

          <button
            onClick={handleSalvar}
            disabled={!canSave}
            className="mt-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            Começar Jogo
          </button>
        </div>
      </main>

      <aside className="hidden flex-1 bg-muted md:block" />
    </div>
  );
}
