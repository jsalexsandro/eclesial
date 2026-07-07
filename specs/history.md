---
O jogo não tem uma historia fixa, tudo pode acontecer.
De acordo com as decissões tudo pode muda, as dessições impactam nos atributos que por suposto impacta na vida o personagem.
veja dialogs, la tem os dialogos em fomato json
---

---
A historia é marcada por anos. 
Cada ano libera algo e impacta algo.
---


Historia (Marcada por anos):
---
# Antes de um Ano (9 meses)
O primeiro dialogo será esse marcado com 9 meses.
Você foi batizado, no dia-x (salvar dia do bastimo nos dados, data importante)

- consumir: ./dialog/bastimo/batimo-dialogos.json
---

---
# 6 Anos
Apos criar o player ele deverá ter 6 anos!
o segundo dialogo ja na tela. Ja escrita (não deve ter popup ja está na timeline)

"
Você se chama ${} tem (6) anos, o seus pais te levam a igreja ${nome da paroquia}. 
Você adora escutar o som do coro.!
"

É bom no minimo 2 alternativas de mensagem como essa, essa e mais duas.
- consumir: ./dialog/dialogo-inicial/menssagem-inicial.json

Aqui é o estagio inicial do jogo. 
A maioria das coisas estão bloqueadas pois o player não tem idade para os recursos.
No footer: Estudos, Clero, Pessoas e Configurações 

Estudos e pessoas estão bloqueadas com 6 anos. Apenas Clero e Configurações livres.
---
