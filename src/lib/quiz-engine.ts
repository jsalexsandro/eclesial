import type { Player } from "@/src/types/player"
import quizData from "@/quiz/quiz-catequese-question.json"

interface Pergunta {
  id: string
  question: string
  alternatives: string[]
  correctIndex: number
}

interface QuizData {
  perguntas: Pergunta[]
}

export interface ResultadoPergunta {
  pergunta: Pergunta
  escolhida: number | null
  acertou: boolean
}

export function carregarQuiz(): Pergunta[] {
  return (quizData as QuizData).perguntas
}

export function responderQuiz(
  player: Player,
  perguntaId: string,
  escolha: number,
): { player: Player; acertou: boolean } {
  const perguntas = carregarQuiz()
  const pergunta = perguntas.find((p) => p.id === perguntaId)
  if (!pergunta) return { player, acertou: false }

  if (player.quizAnswers[perguntaId] !== undefined) {
    return { player, acertou: player.quizAnswers[perguntaId] === pergunta.correctIndex }
  }

  const acertou = escolha === pergunta.correctIndex

  const eventText = acertou
    ? `Acertei no quiz: "${pergunta.question}" → ${pergunta.alternatives[escolha]}`
    : `Errei no quiz: "${pergunta.question}" → escolhi ${pergunta.alternatives[escolha]}, era ${pergunta.alternatives[pergunta.correctIndex]}`

  const event = { age: player.profile.age, text: eventText }
  const lastSequence = player.history.sequences.find((s) => s.age === player.profile.age)
  const sequences = lastSequence
    ? player.history.sequences.map((s) =>
        s.age === player.profile.age ? { ...s, events: [...s.events, event] } : s,
      )
    : [...player.history.sequences, { age: player.profile.age, events: [event] }]

  return {
    player: {
      ...player,
      attributes: {
        ...player.attributes,
        intelligence: player.attributes.intelligence + (acertou ? 2 : 0),
        discipline: player.attributes.discipline + (acertou ? 1 : 0),
        liturgicalKnowledge: player.attributes.liturgicalKnowledge + (acertou ? 0.5 : 0.25),
      },
      spirituality: {
        ...player.spirituality,
        prayer: player.spirituality.prayer + (acertou ? 1 : 0),
        devotion: player.spirituality.devotion + (acertou ? 1 : 0),
      },
      quizAnswers: {
        ...player.quizAnswers,
        [perguntaId]: escolha,
      },
      history: {
        ...player.history,
        sequences,
      },
    },
    acertou,
  }
}

export function getQuizProgress(player: Player, perguntas: Pergunta[]): { answered: number; total: number } {
  const answered = perguntas.filter((p) => player.quizAnswers[p.id] !== undefined).length
  return { answered, total: perguntas.length }
}

export function getResultadosQuiz(player: Player, perguntas: Pergunta[]): ResultadoPergunta[] {
  return perguntas.map((p) => ({
    pergunta: p,
    escolhida: player.quizAnswers[p.id] ?? null,
    acertou: player.quizAnswers[p.id] === p.correctIndex,
  }))
}
