"use client"

import type { ReactNode } from "react"

interface PanelProps {
  title: string
  onClose: () => void
  children: ReactNode
}

export default function Panel({ title, onClose, children }: PanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
      <div className="w-full sm:max-w-lg sm:rounded-xl bg-background min-h-dvh sm:min-h-0 flex flex-col sm:mx-4 sm:shadow-xl animate-in fade-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0">
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 min-h-[60vh] sm:min-h-0">
          {children}
        </div>
      </div>
    </div>
  )
}
