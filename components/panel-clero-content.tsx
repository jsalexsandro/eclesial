"use client"

import { Button } from "@/components/ui/button"
import type { Player } from "@/src/types/player"
import { assistirMissa } from "@/src/lib/game-engine"

interface PanelCleroContentProps {
  player: Player
  onUpdate: (player: Player) => void
  onClose: () => void
}

export default function PanelCleroContent({ player, onUpdate, onClose }: PanelCleroContentProps) {
  const age = player.profile.age
  const podeAssistirMissa = age >= 6 && age <= 10

  function handleAssistirMissa() {
    const updated = assistirMissa(player)
    if (updated !== player) {
      localStorage.setItem("eclesial-player", JSON.stringify(updated))
      onUpdate(updated)
    }
    onClose()
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Atividade Paroquial</h3>

      <Button
        className="w-full justify-start text-base h-auto py-3 px-4"
        variant={podeAssistirMissa ? "default" : "outline"}
        disabled={!podeAssistirMissa}
        onClick={handleAssistirMissa}
      >
        Assistir missa com os pais
      </Button>
    </div>
  )
}
