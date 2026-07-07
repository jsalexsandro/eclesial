'use client'

import type { YearSequence } from '@/src/types/player'

interface TimelineProps {
  sequences: YearSequence[]
}

export default function Timeline({ sequences }: TimelineProps) {
  if (sequences.length === 0) {
    return (
      <main className="flex-1 max-w-lg mx-auto w-full p-6 pt-20 pb-24">
        <p className="text-sm text-muted-foreground">Nenhum evento registrado ainda.</p>
      </main>
    )
  }

  return (
    <main className="flex-1 max-w-lg mx-auto w-full p-6 space-y-4 pt-20 pb-24 overflow-y-auto">
      {sequences.map((seq) => (
        <div key={seq.age}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
              {seq.age} anos
            </span>
            <div className="flex-1 border-t border-border" />
          </div>
          {seq.events.map((event, i) => (
            <p key={i} className="text-xs leading-relaxed text-foreground mb-1 last:mb-0">
              {event.text}
            </p>
          ))}
        </div>
      ))}
    </main>
  )
}
