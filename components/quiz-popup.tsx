"use client"

import { useState } from "react"
import { X } from "lucide-react"
import type { QuizQuestion } from "@/src/data/quiz"

interface QuizPopupProps {
  questions: QuizQuestion[]
  answeredIds: string[]
  answers: Record<string, number>
  onSave: (questionId: string, selectedIndex: number, acertou: boolean) => void
  onClose: () => void
}

export default function QuizPopup({ questions, answeredIds, answers, onSave, onClose }: QuizPopupProps) {
  const allDone = answeredIds.length === questions.length

  if (allDone) {
    return (
      <div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-background rounded-md border border-border p-6 space-y-4">
          <h3 className="text-sm font-semibold">Quiz Católico — Revisão</h3>
          <p className="text-xs text-muted-foreground">Todas as perguntas respondidas. Veja seu desempenho:</p>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {questions.map(q => {
              const selected = answers[q.id]
              const acertou = selected === q.correctIndex
              return (
                <div key={q.id} className="text-xs border border-border rounded-md p-3 space-y-1">
                  <p className="font-medium text-foreground">{q.question}</p>
                  <p className={acertou ? 'text-green-600' : 'text-red-600'}>
                    {acertou ? '✓ Acertou' : '✗ Errou'}
                  </p>
                  <p className="text-muted-foreground">
                    Sua resposta: {selected !== undefined ? q.alternatives[selected] : '—'}
                  </p>
                  {!acertou && (
                    <p className="text-muted-foreground">
                      Resposta certa: {q.alternatives[q.correctIndex]}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
          <button
            onClick={onClose}
            className="w-full text-sm py-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    )
  }

  return <PlayMode key={answeredIds.length} questions={questions} answeredIds={answeredIds} onSave={onSave} onClose={onClose} />
}

function PlayMode({
  questions,
  answeredIds,
  onSave,
  onClose,
}: {
  questions: QuizQuestion[]
  answeredIds: string[]
  onSave: (questionId: string, selectedIndex: number, acertou: boolean) => void
  onClose: () => void
}) {
  const [queue] = useState(
    () => questions.filter(q => !answeredIds.includes(q.id)),
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  const current = queue[currentIndex]

  function handleSelect(index: number) {
    if (answered) return
    setSelected(index)
    setAnswered(true)
  }

  function handleAvancar() {
    if (selected === null || !current) return
    const acertou = selected === current.correctIndex
    onSave(current.id, selected, acertou)

    if (currentIndex + 1 < queue.length) {
      setCurrentIndex(prev => prev + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  if (!current) return null

  return (
    <div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-background rounded-md border border-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Quiz Católico</h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {answeredIds.length + currentIndex + 1}/{questions.length}
            </span>
            <button onClick={onClose} className="size-6 rounded-md hover:bg-muted flex items-center justify-center">
              <X className="size-3.5" />
            </button>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-foreground">{current.question}</p>
        <div className="space-y-2">
          {current.alternatives.map((alt, i) => {
            let className = "w-full text-left text-sm py-2.5 px-3.5 rounded-md border transition-colors "
            if (answered) {
              if (i === current.correctIndex) {
                className += "border-green-500 bg-green-50 text-green-800"
              } else if (i === selected && i !== current.correctIndex) {
                className += "border-red-500 bg-red-50 text-red-800"
              } else {
                className += "border-border bg-card text-muted-foreground"
              }
            } else {
              className += "border-border bg-card hover:bg-muted"
            }
            return (
              <button key={i} onClick={() => handleSelect(i)} className={className}>
                {alt}
              </button>
            )
          })}
        </div>
        {answered && (
          <p className="text-xs text-center text-muted-foreground">
            {selected === current.correctIndex
              ? 'Correto!'
              : `Errado! A resposta certa é: ${current.alternatives[current.correctIndex]}`}
          </p>
        )}
        {answered && (
          <button
            onClick={handleAvancar}
            className="w-full text-sm py-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Avançar
          </button>
        )}
      </div>
    </div>
  )
}
