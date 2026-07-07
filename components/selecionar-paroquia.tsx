"use client";

import { useState, useEffect } from "react";
import igreja from "@/src/data/igreja.json";

type Regional = (typeof igreja)["regionais"][number];
type Provincia = Regional["provincias"][number];
type Diocese = Provincia["dioceses"][number];
type Paroquia = Diocese["paroquias"][number];

interface ParoquiaSelecionada {
  provincia: string;
  diocese: string;
  tipo: string;
  paroquia: string;
}

export function SelecionarParoquia({
  onSelect,
}: {
  onSelect: (p: ParoquiaSelecionada) => void;
}) {
  const [selected, setSelected] = useState<ParoquiaSelecionada | null>(null);
  const [open, setOpen] = useState(false);

  const [step, setStep] = useState<
    "regional" | "provincia" | "diocese" | "paroquia"
  >("regional");
  const [selectedRegional, setSelectedRegional] =
    useState<Regional | null>(null);
  const [selectedProvincia, setSelectedProvincia] =
    useState<Provincia | null>(null);
  const [selectedDiocese, setSelectedDiocese] = useState<Diocese | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function openDrawer() {
    setOpen(true);
    setStep("regional");
    setSelectedRegional(null);
    setSelectedProvincia(null);
    setSelectedDiocese(null);
  }

  function closeDrawer() {
    setOpen(false);
  }

  function handleRegionalClick(r: Regional) {
    setSelectedRegional(r);
    setSelectedProvincia(null);
    setSelectedDiocese(null);
    setStep("provincia");
  }

  function handleProvinciaClick(p: Provincia) {
    setSelectedProvincia(p);
    setSelectedDiocese(null);
    setStep("diocese");
  }

  function handleDioceseClick(d: Diocese) {
    setSelectedDiocese(d);
    setStep("paroquia");
  }

  function handleParoquiaClick(p: Paroquia) {
    const value = {
      provincia: selectedProvincia!.nome,
      diocese: selectedDiocese!.nome,
      tipo: selectedDiocese!.tipo,
      paroquia: p.nome,
    };
    setSelected(value);
    onSelect(value);
    closeDrawer();
  }

  function handleBack() {
    if (step === "provincia") {
      setSelectedRegional(null);
      setStep("regional");
    } else if (step === "diocese") {
      setSelectedProvincia(null);
      setStep("provincia");
    } else if (step === "paroquia") {
      setSelectedDiocese(null);
      setStep("diocese");
    }
  }

  const stepLabel: Record<string, string> = {
    regional: "Selecione a Região Eclesiástica",
    provincia: "Selecione a Província Eclesiástica",
    diocese: "Selecione a Diocese / Arquidiocese",
    paroquia: "Selecione a Paróquia",
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold">
        Seleciona sua paróquia de origem
      </label>

<button
        type="button"
        onClick={openDrawer}
        className="self-start rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        {selected ? selected.paroquia : "Selecionar Sua Paróquia"}
      </button>

      {/* overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-end justify-center md:items-center transition-colors duration-200 ${
          open ? "bg-black/40" : "pointer-events-none bg-black/0"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDrawer();
        }}
      >
        {/* drawer / popup */}
        <div
          className={`flex w-full flex-col rounded-t-xl bg-card shadow-lg md:max-w-lg md:rounded-lg transition-transform duration-300 h-[85dvh] ${
            open
              ? "translate-y-0 md:scale-100 md:opacity-100"
              : "translate-y-full md:translate-y-0 md:scale-95 md:opacity-0"
          }`}
        >
          {/* header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Seleciona abaixo</h2>
            <button
              type="button"
              onClick={closeDrawer}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Fechar"
            >
              ✕
            </button>
          </div>

          {/* main */}
          <div className="flex-1 overflow-y-auto p-6 min-h-0">
            {step !== "regional" && (
              <button
                type="button"
                onClick={handleBack}
                className="mb-3 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                &larr; Voltar
              </button>
            )}

            <span className="mb-3 block text-xs font-medium text-muted-foreground">
              {stepLabel[step]}
            </span>

            {step === "regional" && (
              <div className="flex flex-col gap-2">
                {igreja.regionais.map((r) => (
                  <button
                    key={r.nome}
                    type="button"
                    onClick={() => handleRegionalClick(r)}
                    className="w-full rounded-lg border bg-card px-4 py-3 text-left text-sm transition-colors hover:bg-muted"
                  >
                    <span className="font-medium">{r.nome}</span>
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {r.estados.join(", ")}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {step === "provincia" && selectedRegional && (
              <div className="flex flex-col gap-2">
                {selectedRegional.provincias.map((p) => (
                  <button
                    key={p.nome}
                    type="button"
                    onClick={() => handleProvinciaClick(p)}
                    className="w-full rounded-lg border bg-card px-4 py-3 text-left text-sm transition-colors hover:bg-muted"
                  >
                    <span className="font-medium">{p.nome}</span>
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {p.metropole}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {step === "diocese" && selectedProvincia && (
              <div className="flex flex-col gap-2">
                {selectedProvincia.dioceses.map((d) => (
                  <button
                    key={d.nome}
                    type="button"
                    onClick={() => handleDioceseClick(d)}
                    className="w-full rounded-lg border bg-card px-4 py-3 text-left text-sm transition-colors hover:bg-muted"
                  >
                    <span className="font-medium">{d.nome}</span>
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {d.tipo}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {step === "paroquia" && selectedDiocese && (
              <div className="flex flex-col gap-2">
                {selectedDiocese.paroquias.map((p) => (
                  <button
                    key={p.nome}
                    type="button"
                    onClick={() => handleParoquiaClick(p)}
                    className="w-full rounded-lg border bg-card px-4 py-3 text-left text-sm transition-colors hover:bg-muted"
                  >
                    {p.nome}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
