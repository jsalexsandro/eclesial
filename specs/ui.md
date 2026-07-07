1. Usar font roboto 
2. Usa Guide System ./desing.md
3. Desing system proprio mas por baixo shadcn. 

---
radius: 8px
margin: 8px
---

rotas:
/criar-personagem -> salva localstorage "eclesial-player"
/

OBS: na rota index se não existir o item no localstorage não permitir

---
/criar-personagem 
main | section
tela dividida ao meio

main:
title: CRIAR  PERSONAGEM 
subtile: Configurações básicas sobre seu persoangem
input: nome
input: sobrenome

label: Seleciona sua paroquia de origem
button: Selecionar Sua Paroquia
component-selecionar-paroquia
-> popup
-> title: Seleciona abaixo | button: close (x)
-> Não quero um select input quero um componet mais informativo
-> Tal component deve permitir selecionar provincia -> diocese/arqdiocese -> paroquia (nessa ordem um apos a outra)
-> No desktop um popup, mobile, deve ser um drawer-card 
-> as selecões devem todas possui um mesmo tamanho

button: Começa jogo (desabilitar caso não esteja os requisitos acima preenchidos)

section: Vazio por enquanto

no mobile section hidden
---

---
/ ou /game

header
- avatar | titulo + name + sobrenome
- Cargo 
- p: Icon ${} Dinheiro (isso ficara ao lado)
main
- timeline[div]
footer
---