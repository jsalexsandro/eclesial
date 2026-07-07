import type { Player, YearSequence } from "@/src/types/player"
import { carregarDialogo, processarTexto, sortearTexto } from "@/src/lib/dialog-engine"

const CURRENT_YEAR = 2026
const STARTING_AGE = 6

function gerarDataBatismo(anoNascimento: number): string {
  const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
  ]
  const dia = Math.floor(Math.random() * 28) + 1
  const mes = meses[Math.floor(Math.random() * 12)]
  const anoBatismo = anoNascimento + 1
  return `${dia} de ${mes} de ${anoBatismo}`
}

export function initializePlayer(player: Player): Player {
  if (player.history.sequences.length > 0) return player

  const anoNascimento = CURRENT_YEAR - STARTING_AGE
  const dataBatismo = gerarDataBatismo(anoNascimento)

  const dialogoBatismo = carregarDialogo("batimo-dialogos")
  const textoBatismo = processarTexto(sortearTexto(dialogoBatismo.textos), {
    name: player.profile.name,
    parish: player.profile.parish,
    date: dataBatismo,
  })

  const dialogoIntro = carregarDialogo("menssagem-inicial")
  const textoIntro = processarTexto(sortearTexto(dialogoIntro.textos), {
    name: player.profile.name,
    parish: player.profile.parish,
    age: 6,
  })

  const sequences: YearSequence[] = [
    { age: 0, events: [{ age: 0, text: textoBatismo }] },
    { age: 6, events: [{ age: 6, text: textoIntro }] },
  ]

  return {
    ...player,
    profile: {
      ...player.profile,
      birthYear: anoNascimento,
      age: STARTING_AGE,
    },
    history: {
      ...player.history,
      sequences,
      importantDates: {
        ...player.history.importantDates,
        baptism: dataBatismo,
      },
    },
  }
}

export function advanceYear(player: Player): Player {
  return {
    ...player,
    profile: {
      ...player.profile,
      age: player.profile.age + 1,
    },
  }
}
