import batimoDialogos from "@/dialog/bastimo/batimo-dialogos.json"
import menssagemInicial from "@/dialog/dialogo-inicial/menssagem-inicial.json"
import missaComPais from "@/dialog/missa-com-pais/dialogs.json"
import passagemDeAno from "@/dialog/passagem-de-ano/dialogs.json"
import matriculaFeitaPais from "@/dialog/inicio-catequese/matricula-feita-pelos-pais.json"
import primeiroDiaCatequese from "@/dialog/inicio-catequese/primeiro-dia-catequese-livro.json"

interface Dialogo {
  textos: string[]
}

type DialogoId = "batimo-dialogos" | "menssagem-inicial" | "missa-com-pais" | "passagem-de-ano" | "matricula-feita-pelos-pais" | "primeiro-dia-catequese-livro"

const DIALOGOS: Record<DialogoId, Dialogo> = {
  "batimo-dialogos": batimoDialogos as Dialogo,
  "menssagem-inicial": menssagemInicial as Dialogo,
  "missa-com-pais": missaComPais as Dialogo,
  "passagem-de-ano": passagemDeAno as Dialogo,
  "matricula-feita-pelos-pais": matriculaFeitaPais as Dialogo,
  "primeiro-dia-catequese-livro": primeiroDiaCatequese as Dialogo,
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
