'use client'

import { User, Coins } from 'lucide-react'

interface HeaderProps {
  name: string
  surname: string
  role: string
  honorific: string
  money: number
}

export default function Header({ name, surname, role, honorific, money }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border px-6 py-4 bg-background">
      <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
            <User className="size-5 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight truncate">
              {honorific && <span className="text-muted-foreground">{honorific} </span>}
              {name} {surname}
            </p>
            <p className="text-xs text-muted-foreground leading-tight">{role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Coins className="size-4 text-yellow-600" />
          <span className="text-sm font-semibold tabular-nums">
            {money.toLocaleString('pt-BR')}
          </span>
        </div>
      </div>
    </header>
  )
}
