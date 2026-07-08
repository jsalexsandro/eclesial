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

!é importante registrar data de nascimento do player.

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

Nova Funcionalidade liberada com 6 Anos
Na Aba clero
Text: Atividade Paroquial
Um Button: Assistir missa com os pais
Essa recurso deverá fica disponivel com 6 anos, porém somente até 10 anos. 
Efeito do button no atibrutos:
- spirituality.prayer ↑ + 0.5
- spirituality.devotion ↑ + 0.5
- relationships.parents ↑ + 1
- spirituality.massAttendance ↑ + 1

internamente tenha um count para cada clique nesse botão, rezetando a contagem a cada ano
os efeitos acima so poderam ser adicionado se o esse count for <= 3 por ano. Acima disso não deverá produzir efeito interno no atributos, 
dê um console.log('Max_Year: Assistir missa com os pais')

na timeline inserir mensagem com essa abaixo:
Fui na missa com os meus pais, meu pai me deu dinheiro para contribuir no ofertorio.

É bom no minimo 3 variações de 'dialogs' além desse axcima.
- consumir: ./dialog/missa-com-pais/dialogs.json

---


---
# Transição de ano
Na timelime mensagem aleatoria a envelhecer um ano.
"Agora eu tenho X anos...."

Seria bom no minimo 10 dialogos diferentes.
As mensagens devem falar de transição de ano e nada mais.

- consumir: ./dialog/passagem-de-ano/dialogs.json

Isso deve ser disparado sempre que player avançar de ano.
---

---
# 7 Anos
Na timeline: Transição de ano

Primeiro popup (dialog-popup-component).
Deve aparecer na tela.

Dialog: "Seus pais lhe matricularam na catequese, você deverá ir todo ${} para catequese para aprender mais sobre o catecismo da igreja catolica"
Esse dialogo é de 3 opções [1 Boa, 2, Media, 3, Ruim] use o component de popup.

É bom ter no minimo 3 dialogos diferentes
- consumir: ./dialog/inicio-catequese/matricula-feita-pelos-pais.json

1. Ficar Feliz — a criança abraça a catequese
spirituality.prayer +1
spirituality.devotion +2
spirituality.zeal +1
attributes.discipline +2
attributes.obedience +1
relationships.parents +2 (os pais ficam contentes)

2. Tranquilo  — indiferente, só vai porque mandaram
attributes.discipline +1 (só compareceu)
spirituality.prayer +1

3. Não Gostar — não gostou, reclama, etc.
relationships.parents -2 (brigou com os pais)
attributes.obedience -2
spirituality.prayer -1 (ora com má vontade)

Registre tudo acima na timeline!

Segungo dialogo que deve ser registrado (esse sem popup)
Dialog: No primeiro dia de catequese, eu Ganhei o Livro "Catecismo da Igreja Catolica", o professor disse que é um livro muito importante.

É bom ter no minimo 3 dialogos diferentes
- consumir: ./dialog/inicio-catequese/primeiro-dia-catequese-livro.json

###

Nova aba do footer liberada "Estudos":
* Teremos alguns botões

[Primeira botão] (Disponivel para sempre)
Em estudos deverá ter Estudar o "Livro Catecismo a Igreja":
Aqui ser um game de perguntas e resposta. 
Aqui serão as mais simples pois catequese é o mais facil e eles teram apenas 7 anos.
Sera um quiz, com perguntas basicas, 10 perguntas basicas.
Será uma progressão quanto mais acerta melhora 
feedback visual para os acertos e erros.

Essa opção ficara disponivel para sempre e conforme a idade e o estagio ela irá mudando e se tornando mais complexa.
Durante a catequese serão algumas perguntas, no crisma outras e assim mundando, por equanto apenas 10.

Para o player não ficar respondedo varias vezes, confirme no sistema que tal pergunta ja foi respondida e a pontuação ja inserida.
Não espere ele responde todo o quiz. 
Respondeu 1 pergunta, acertou? -> ja insira!

Esse minigame deverá ser chamado de 'Quiz Católico'

Acertou: liturgicalKnowledge +0.5, prayer +1, devotion +1, discipline +1, inteligence +2 
Errou: liturgicalKnowledge +0.25 (aprende mesmo errando)
Sempre adiciona na timeline

Apos concluir o quiz ( não tem mais pergunta ). Caso o player clique novamente no quiz, abra uma tela mostrando o quiz, e seus acertos/erros, opção certa, opção errado. 
As questões, deverão esta em quiz/quiz-catequese-question.json

O as perguntas do quiz muda de acordo com estagio da vida do personagem.
Em localstorage terá quiz:["quiz-catequese-question"] 
no futuro esse array vai aumentando! 

---