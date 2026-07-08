"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Player } from "@/src/types/player"
import { carregarQuiz, getQuizProgress, responderQuiz } from "@/src/lib/quiz-engine"
import QuizPopup from "@/components/quiz-popup"

interface PanelEstudosContentProps {
  player: Player
  onUpdate: (player: Player) => void
  onClose: () => void
}

export default function PanelEstudosContent({ player, onUpdate, onClose }: PanelEstudosContentProps) {
  const [quizAberto, setQuizAberto] = useState(false)

  const perguntas = carregarQuiz()
  const progress = getQuizProgress(player, perguntas)
  const completou = progress.answered >= progress.total

  const answeredIds = perguntas
    .filter((q) => player.quizAnswers[q.id] !== undefined)
    .map((q) => q.id)

  function handleSave(questionId: string, selectedIndex: number, _acertou: boolean) {
    const result = responderQuiz(player, questionId, selectedIndex)
    if (result.player !== player) {
      localStorage.setItem("eclesial-player", JSON.stringify(result.player))
      onUpdate(result.player)
    }
  }

  if (quizAberto) {
    return (
      <QuizPopup
        questions={perguntas}
        answeredIds={answeredIds}
        answers={player.quizAnswers}
        onSave={handleSave}
        onClose={() => setQuizAberto(false)}
      />
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Estudos</h3>

      {completou ? (
        <div className="bg-accent rounded-lg p-4 text-sm">
          <p className="font-medium mb-1">Quiz Católico - Concluído</p>
          <p className="text-muted-foreground">
            Acertos: {progress.answered}/{progress.total}
          </p>
          <Button
            className="w-full mt-3"
            variant="outline"
            size="sm"
            onClick={() => setQuizAberto(true)}
          >
            Revisar respostas
          </Button>
        </div>
      ) : (
        <Button
          className="w-full justify-start text-base h-auto py-3 px-4"
          variant="default"
          onClick={() => setQuizAberto(true)}
        >
          Estudar o Livro Catecismo a Igreja
        </Button>
      )}
    </div>
  )
}
