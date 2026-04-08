# AnimaQuiz
Projeto feito em uma única pagina, o tema do quiz é Animais. O objetivo é responder perguntas e calcular a pontuação final do usuário.

## Funcionalidades principais
- Loading com imagem e barra de progresso simulada
- Quiz com perguntas sobre animais e escolha por clique
- Resultado final com total de acertos e resumo das respostas
- Filtro por categoria via digitação
- Reinício do quiz

## Requisitos atendidos
- Variáveis: armazenam perguntas, respostas e pontuação
- Funções: organizam a lógica do quiz
- if/else: validação de respostas e mensagens
- DOM: getElementById, querySelector, innerHTML, textContent
- Eventos: click e input/keyup
- map: renderiza opções e resumo de respostas
- filter: filtra perguntas e seleciona acertos
- reduce: calcula pontuação total

## Estrutura de arquivos
- `index.html`: estrutura da página e containers do quiz
- `style.css`: estilos da página
- `script.js`: dados, lógica do quiz e interações

## Como executar
1. Abra `index.html` no navegador.
2. Aguarde o loading terminar (gauge chega a 100%).
3. Digite seu nome e responda as perguntas.
4. Veja o resultado final e, se quiser, clique em Reiniciar.

## Fluxo do usuário
1. Loading mostra imagem e barra de progresso.
2. App aparece com campo de nome e busca por categoria.
3. Usuário responde cada pergunta clicando em uma opção.
4. Resultado final mostra pontuação e resumo.

## Tecnologias usadas
- HTML5
- CSS3
- JavaScript