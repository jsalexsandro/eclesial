"use client"

interface Option {
  label: string
  description: string
}

interface DialogPopupProps {
  text: string
  options: Option[]
  onChoice: (index: number) => void
}

export default function DialogPopup({ text, options, onChoice }: DialogPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
      <div className="w-full sm:max-w-lg sm:rounded-xl bg-background p-6 sm:mx-4 sm:shadow-xl animate-in fade-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0">
        <p className="text-base leading-relaxed mb-6">{text}</p>

        <div className="space-y-3">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onChoice(i)}
              className="w-full text-left bg-accent hover:bg-accent/80 transition-colors rounded-lg p-4"
            >
              <span className="block font-medium text-sm">{opt.label}</span>
              <span className="block text-xs text-muted-foreground mt-1">{opt.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
