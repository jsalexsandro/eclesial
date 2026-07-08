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

  const dataNascimento = `${Math.floor(Math.random() * 28) + 1} de janeiro de ${anoNascimento}`

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
        birth: dataNascimento,
      },
    },
  }
}

export function advanceYear(player: Player): Player {
  const newAge = player.profile.age + 1

  const dialogo = carregarDialogo("passagem-de-ano")
  const texto = processarTexto(sortearTexto(dialogo.textos), {
    age: newAge,
  })

  const lastSequence = player.history.sequences.find((s) => s.age === newAge)
  const event = { age: newAge, text: texto }

  const sequences = lastSequence
    ? player.history.sequences.map((s) =>
        s.age === newAge ? { ...s, events: [...s.events, event] } : s,
      )
    : [...player.history.sequences, { age: newAge, events: [event] }]

  return {
    ...player,
    profile: {
      ...player.profile,
      age: newAge,
    },
    missaCount: 0,
    history: {
      ...player.history,
      sequences,
    },
  }
}

export interface OpcaoMatricula {
  label: string
  description: string
}

export const OPCOES_MATRICULA: OpcaoMatricula[] = [
  {
    label: "Ficar Feliz",
    description: "a crianca abraca a catequese",
  },
  {
    label: "Tranquilo",
    description: "indiferente, so vai porque mandaram",
  },
  {
    label: "Nao Gostar",
    description: "nao gostou, reclama, etc.",
  },
]

const EFEITOS_MATRICULA = [
  {
    label: "Ficar Feliz",
    description: "a crianca abraca a catequese",
    apply: (p: Player) => ({
      spirituality: {
        ...p.spirituality,
        prayer: p.spirituality.prayer + 1,
        devotion: p.spirituality.devotion + 2,
        zeal: p.spirituality.zeal + 1,
      },
      attributes: {
        ...p.attributes,
        discipline: p.attributes.discipline + 2,
        obedience: p.attributes.obedience + 1,
      },
      relationships: {
        ...p.relationships,
        parents: p.relationships.parents + 2,
      },
    }),
  },
  {
    label: "Tranquilo",
    description: "indiferente, so vai porque mandaram",
    apply: (p: Player) => ({
      spirituality: {
        ...p.spirituality,
        prayer: p.spirituality.prayer + 1,
      },
      attributes: {
        ...p.attributes,
        discipline: p.attributes.discipline + 1,
      },
    }),
  },
  {
    label: "Nao Gostar",
    description: "nao gostou, reclama, etc.",
    apply: (p: Player) => ({
      relationships: {
        ...p.relationships,
        parents: p.relationships.parents - 2,
      },
      attributes: {
        ...p.attributes,
        obedience: p.attributes.obedience - 2,
      },
      spirituality: {
        ...p.spirituality,
        prayer: p.spirituality.prayer - 1,
      },
    }),
  },
]

export function aplicarMatriculaCatequese(player: Player, texto: string, choice: number): Player {
  const effect = EFEITOS_MATRICULA[choice]
  if (!effect) return player

  const changes = effect.apply(player)
  const event = { age: player.profile.age, text: texto }

  const lastSequence = player.history.sequences.find((s) => s.age === player.profile.age)
  const sequences = lastSequence
    ? player.history.sequences.map((s) =>
        s.age === player.profile.age ? { ...s, events: [...s.events, event] } : s,
      )
    : [...player.history.sequences, { age: player.profile.age, events: [event] }]

  return {
    ...player,
    ...changes,
    history: {
      ...player.history,
      sequences,
    },
  }
}

export function adicionarPrimeiroDiaCatequese(player: Player): Player {
  const dialogo = carregarDialogo("primeiro-dia-catequese-livro")
  const texto = processarTexto(sortearTexto(dialogo.textos), {
    name: player.profile.name,
  })

  const event = { age: player.profile.age, text: texto }

  const lastSequence = player.history.sequences.find((s) => s.age === player.profile.age)
  const sequences = lastSequence
    ? player.history.sequences.map((s) =>
        s.age === player.profile.age ? { ...s, events: [...s.events, event] } : s,
      )
    : [...player.history.sequences, { age: player.profile.age, events: [event] }]

  return {
    ...player,
    history: {
      ...player.history,
      sequences,
    },
  }
}

export function assistirMissa(player: Player): Player {
  if (player.missaCount >= 3) {
    console.log("Max_Year: Assistir missa com os pais")
    return player
  }

  const dialogo = carregarDialogo("missa-com-pais")
  const texto = processarTexto(sortearTexto(dialogo.textos), {
    name: player.profile.name,
    parish: player.profile.parish,
  })

  const lastSequence = player.history.sequences.find((s) => s.age === player.profile.age)
  const event = { age: player.profile.age, text: texto }

  const sequences = lastSequence
    ? player.history.sequences.map((s) =>
        s.age === player.profile.age ? { ...s, events: [...s.events, event] } : s,
      )
    : [...player.history.sequences, { age: player.profile.age, events: [event] }]

  return {
    ...player,
    spirituality: {
      ...player.spirituality,
      prayer: player.spirituality.prayer + 0.5,
      devotion: player.spirituality.devotion + 0.5,
      massAttendance: player.spirituality.massAttendance + 1,
    },
    relationships: {
      ...player.relationships,
      parents: player.relationships.parents + 1,
    },
    missaCount: player.missaCount + 1,
    history: {
      ...player.history,
      sequences,
    },
  }
}
