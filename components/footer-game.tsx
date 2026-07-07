'use client'

import { BookOpen, Users, Church, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FooterProps {
  age: number
  isLocked: (title: string) => boolean
  onAdvanceAge: () => void
  onOpenPanel: (panel: string) => void
}

export default function Footer({ age, isLocked, onAdvanceAge, onOpenPanel }: FooterProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 px-4 py-3 border-t border-border bg-muted z-40">
      <button
        onClick={onAdvanceAge}
        className="absolute left-1/2 -translate-x-1/2 -top-7 size-14 rounded-full bg-primary text-primary-foreground flex flex-col items-center justify-center leading-none shadow-lg hover:bg-primary/90 transition-colors z-10"
        title="Avançar um ano"
      >
        <span className="text-lg font-bold">{age}</span>
        <span className="text-[8px] uppercase tracking-wider mt-0.5">anos</span>
      </button>
      <div className="max-w-lg mx-auto flex items-center justify-center gap-5">
        <Button
          variant="ghost"
          size="icon"
          className={`size-10 rounded-md shrink-0 ${isLocked('Estudos') ? 'opacity-30 cursor-not-allowed' : ''}`}
          title="Estudos"
          disabled={isLocked('Estudos')}
          onClick={() => onOpenPanel('Estudos')}
        >
          <BookOpen className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`size-10 rounded-md shrink-0 ${isLocked('Clero') ? 'opacity-30 cursor-not-allowed' : ''}`}
          title="Clero"
          disabled={isLocked('Clero')}
          onClick={() => onOpenPanel('Clero')}
        >
          <Church className="size-5" />
        </Button>
        <div className="size-10 shrink-0" />
        <Button
          variant="ghost"
          size="icon"
          className={`size-10 rounded-md shrink-0 ${isLocked('Pessoas') ? 'opacity-30 cursor-not-allowed' : ''}`}
          title="Pessoas"
          disabled={isLocked('Pessoas')}
          onClick={() => onOpenPanel('Pessoas')}
        >
          <Users className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`size-10 rounded-md shrink-0 ${isLocked('Configurações') ? 'opacity-30 cursor-not-allowed' : ''}`}
          title="Configurações"
          disabled={isLocked('Configurações')}
          onClick={() => onOpenPanel('Configurações')}
        >
          <Settings className="size-5" />
        </Button>
      </div>
    </footer>
  )
}
