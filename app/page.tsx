"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const raw = localStorage.getItem("eclesial-player");
    if (raw) {
      router.replace("/game");
    }
  }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Bem-vindo ao Eclesial</h1>
      <p className="text-muted-foreground">
        Crie seu personagem para começar.
      </p>
      <button
        onClick={() => router.push("/criar-personagem")}
        className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        Criar Personagem
      </button>
    </div>
  );
}
