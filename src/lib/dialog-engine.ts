import batimoDialogos from "@/dialog/bastimo/batimo-dialogos.json"
import menssagemInicial from "@/dialog/dialogo-inicial/menssagem-inicial.json"

interface Dialogo {
  textos: string[]
}

type DialogoId = "batimo-dialogos" | "menssagem-inicial"

const DIALOGOS: Record<DialogoId, Dialogo> = {
  "batimo-dialogos": batimoDialogos as Dialogo,
  "menssagem-inicial": menssagemInicial as Dialogo,
}

export function carregarDialogo(id: DialogoId): Dialogo {
  return DIALOGOS[id]
}

export function processarTexto(
  texto: string,
  vars: Record<string, string | number>,
): string {
  return texto.replace(/\{(\w+)\}/g, (_, chave) => {
    const valor = vars[chave]
    return valor !== undefined ? String(valor) : `{${chave}}`
  })
}

export function sortearTexto(textos: string[]): string {
  return textos[Math.floor(Math.random() * textos.length)]
}
