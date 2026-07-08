export interface HistoryEvent {
  age: number
  text: string
}

export interface YearSequence {
  age: number
  events: HistoryEvent[]
}

export interface PlayerProfile {
  name: string
  surname: string
  sex: string
  birthYear: number
  age: number
  diocese: string
  parish: string
  familyName: string
}

export interface PlayerAttributes {
  charisma: number
  intelligence: number
  discipline: number
  humility: number
  obedience: number
  leadership: number
  communication: number
  empathy: number
  organization: number
  courage: number
  prudence: number
  emotionalControl: number
  physicalCondition: number
  liturgicalKnowledge: number
}

export interface PlayerSpirituality {
  prayer: number
  charity: number
  devotion: number
  zeal: number
  perseverance: number
  spiritualDirection: number
  retreatParticipation: number
  confessionFrequency: number
  massAttendance: number
}

export interface PlayerEducation {
  elementaryCompleted: boolean
  highSchoolCompleted: boolean
  philosophyYear: number
  theologyYear: number
  canonLaw: number
  latin: number
  greek: number
}

export interface PlayerSacraments {
  baptism: boolean
  firstCommunion: boolean
  confirmation: boolean
  deaconOrdination: boolean
  priestOrdination: boolean
  bishopOrdination: boolean
}

export interface PlayerVocation {
  feelsCalled: boolean
  vocationalRetreats: number
  acceptedByParish: boolean
  acceptedBySeminary: boolean
  currentStage: string
}

export interface PlayerMinistry {
  currentRole: string
  yearsAsCoroinha: number
  yearsAsCerimoniario: number
  yearsAsPadre: number
  yearsAsBispo: number
  yearsAsDiac: number
  currentOffice: string | null
}

export interface PlayerRelationships {
  parents: number
  parishPriest: number
  bishop: number
  rector: number
  seminarians: number
  clergy: number
  faithful: number
}

export interface PlayerReputation {
  parish: number
  clergy: number
  diocese: number
  national: number
  vatican: number
}

export interface PlayerFinances {
  money: number
  congrua: number
  salary: number
  donationsReceived: number
}

export interface PlayerInventory {
  cassocks: string[]
  books: string[]
  medals: string[]
  liturgicalObjects: string[]
}

export interface Player {
  id: string
  version: number
  profile: PlayerProfile
  attributes: PlayerAttributes
  spirituality: PlayerSpirituality
  education: PlayerEducation
  sacraments: PlayerSacraments
  vocation: PlayerVocation
  ministry: PlayerMinistry
  relationships: PlayerRelationships
  reputation: PlayerReputation
  finances: PlayerFinances
  inventory: PlayerInventory
  missaCount: number
  achievements: string[]
  history: {
    sequences: YearSequence[]
    importantDates: Record<string, string>
  }
  flags: string[]
  quizAnswers: Record<string, number>
}

export interface World {
  currentYear: number
}

export function createDefaultPlayer(
  id: string,
  profile: PlayerProfile,
): Player {
  return {
    id,
    version: 1,
    profile,
    attributes: {
      charisma: 0,
      intelligence: 0,
      discipline: 0,
      humility: 0,
      obedience: 0,
      leadership: 0,
      communication: 0,
      empathy: 0,
      organization: 0,
      courage: 0,
      prudence: 0,
      emotionalControl: 0,
      physicalCondition: 0,
      liturgicalKnowledge: 0,
    },
    spirituality: {
      prayer: 0,
      charity: 0,
      devotion: 0,
      zeal: 0,
      perseverance: 0,
      spiritualDirection: 0,
      retreatParticipation: 0,
      confessionFrequency: 0,
      massAttendance: 0,
    },
    education: {
      elementaryCompleted: false,
      highSchoolCompleted: false,
      philosophyYear: 0,
      theologyYear: 0,
      canonLaw: 0,
      latin: 0,
      greek: 0,
    },
    sacraments: {
      baptism: true,
      firstCommunion: false,
      confirmation: false,
      deaconOrdination: false,
      priestOrdination: false,
      bishopOrdination: false,
    },
    vocation: {
      feelsCalled: false,
      vocationalRetreats: 0,
      acceptedByParish: false,
      acceptedBySeminary: false,
      currentStage: "Leigo",
    },
    ministry: {
      currentRole: "Nenhum",
      yearsAsCoroinha: 0,
      yearsAsCerimoniario: 0,
      yearsAsDiac: 0,
      yearsAsPadre: 0,
      yearsAsBispo: 0,
      currentOffice: null,
    },
    relationships: {
      parents: 85,
      parishPriest: 30,
      bishop: 0,
      rector: 0,
      seminarians: 0,
      clergy: 0,
      faithful: 5,
    },
    reputation: {
      parish: 5,
      clergy: 0,
      diocese: 0,
      national: 0,
      vatican: 0,
    },
    finances: {
      money: 0,
      congrua: 0,
      salary: 0,
      donationsReceived: 0,
    },
    inventory: {
      cassocks: [],
      books: [],
      medals: [],
      liturgicalObjects: [],
    },
    missaCount: 0,
    achievements: [],
    history: {
      sequences: [],
      importantDates: {},
    },
    flags: [],
    quizAnswers: {},
  }
}
