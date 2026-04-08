/*Criando a Lista(Array) de Perguntas(Objetos) para Quiz */
var perguntas = [
  {
    id: 1,
    categoria: "Mamíferos",
    pergunta: "Qual animal é conhecido por ser o rei da floresta ?",
    opcoes: ["Leão", "Hipopótamo", "Zebra", "Girafa"],
    resposta: "Leão"
  },

  {
    id: 2,
    categoria: "Réptil",
    pergunta: "Qual animal tem casco duro nas costas e anda bem devagar?",
    opcoes: ["Avestruz", "Lesma", "Papagaio", "Tartaruga"],
    resposta: "Tartaruga"
  },
  {
    id: 3,
    categoria: "Marinhos",
    pergunta: "Qual animal marinho tem oito braços?",
    opcoes: ["Tubarão", "Polvo", "Baleia", "Golfinho"],
    resposta: "Polvo"
  },
  {
    id: 4,
    categoria: "Insetos",
    pergunta: "Qual inseto se transforma em uma lagarta ?",
    opcoes: ["Formiga", "Borboleta", "Mosca", "Abelha"],
    resposta: "Borboleta"
  },
  {
    id: 5,
    categoria: "Répteis",
    pergunta: "Qual destes animais é um réptil?",
    opcoes: ["Tartaruga", "Morcego", "Pinguim", "Sapo"],
    resposta: "Tartaruga"
  },
  {
    id: 6,
    categoria: "Aves",
    pergunta: "Qual ave que tem a maior invergadura em sua asa?",
    opcoes: ["Gaivota", "Águia", "Albatroz-errante", "Coruja"],
    resposta: "Albatroz-errante"
  },
  {
    id: 7,
    categoria: "Répteis",
    pergunta: "Qual destes animais é um réptil?",
    opcoes: ["Tartaruga", "Morcego", "Pinguim", "Sapo"],
    resposta: "Tartaruga"
  },
   {
    id: 8,
    categoria: "Mamíferos",
    pergunta: "Quais são os maiores roedores que vivem às margens de rios e lagoas",
    opcoes: ["Castores", "Capivaras", "Ratos", "Girafas"],
    resposta: "Capivaras"
  },

   {
    id: 9,
    categoria: "Marinhos",
    pergunta: "Qual é a maior espécie de tubarão?",
    opcoes: ["Tubarão martelo", "Tubarão branco", "Tubarão Baleia", "Tubarão tigreS"],
    resposta: "Tubarão Baleia"
  },





];

var loading = document.getElementById("loading");
var barFill = document.getElementById("bar-fill");
var loadingText = document.getElementById("loading-text");
var app = document.getElementById("app");
var nomeInput = document.getElementById("nome");
var buscaInput = document.getElementById("busca");
var mensagemNome = document.getElementById("mensagem-nome");
var mensagemFiltro = document.getElementById("mensagem-filtro");
var quiz = document.getElementById("quiz");
var botaoReiniciar = document.getElementById("reiniciar");

var indiceAtual = 0;
var respostasUsuario = [];
var perguntasFiltradas = perguntas;
var somCerto = new Audio("sounds/certo.mp3");
var somErrado = new Audio("sounds/errado.mp3");

function tocarSom(acertou) {
  var som = acertou ? somCerto : somErrado;
  som.currentTime = 0;
  som.play();
}

function iniciarLoading() {
  var progresso = 0;

  var intervalo = setInterval(function () {
    progresso = progresso + 5;
    barFill.style.width = progresso + "%";
    loadingText.textContent = progresso + "%";

    if (progresso === 100) {
      clearInterval(intervalo);
      loading.classList.add("hidden");
      loading.style.display = "none";
      loading.style.visibility = "hidden";
      app.classList.remove("hidden");
      app.style.display = "block";
      app.style.visibility = "visible";
      aplicarFiltro();
    }
  }, 200);
}

function atualizarNome() {
  var nomeJogador = nomeInput.value.trim();

  if (nomeJogador !== "") {
    mensagemNome.textContent = "Jogador: " + nomeJogador + ". Boa sorte no quiz de animais!";
  } else {
    mensagemNome.textContent = "Digite seu nome para começar.";
  }
}

function aplicarFiltro() {
  var textoBusca = buscaInput.value.toLowerCase();

  perguntasFiltradas = perguntas.filter(function (item) {
    return (
      item.categoria.toLowerCase().includes(textoBusca) ||
      item.pergunta.toLowerCase().includes(textoBusca)
    );
  });

  if (perguntasFiltradas.length > 0) {
    mensagemFiltro.textContent = "Foram encontradas " + perguntasFiltradas.length + " pergunta(s).";
    indiceAtual = 0;
    respostasUsuario = [];
    mostrarPergunta();
  } else {
    mensagemFiltro.textContent = "Nenhuma pergunta encontrada nesse filtro.";
    quiz.innerHTML = "<h2>Nenhuma pergunta para mostrar.</h2><p>Tente digitar outra busca.</p>";
  }
}

function mostrarPergunta() {
  var perguntaAtual = perguntasFiltradas[indiceAtual];

  if (!perguntaAtual) {
    mostrarResultadoFinal();
    return;
  }

  var listaOpcoes = perguntaAtual.opcoes.map(function (opcao) {
    return '<button class="opcao" data-resposta="' + opcao + '">' + opcao + "</button>";
  });

  quiz.innerHTML =
    "<h2>" + perguntaAtual.pergunta + "</h2>" +
    "<p>Categoria: " + perguntaAtual.categoria + "</p>" +
    listaOpcoes.join("") +
    '<p id="feedback"></p>';

  var botoes = document.querySelectorAll(".opcao");

  botoes.forEach(function (botao) {
    botao.addEventListener("click", clicarResposta);
  });
}

function clicarResposta(evento) {
  var respostaEscolhida = evento.target.getAttribute("data-resposta");
  var perguntaAtual = perguntasFiltradas[indiceAtual];
  var feedback = document.getElementById("feedback");
  var acertou = validarResposta(respostaEscolhida, perguntaAtual.resposta);

  respostasUsuario.push({
    id: perguntaAtual.id,
    pergunta: perguntaAtual.pergunta,
    respostaEscolhida: respostaEscolhida,
    respostaCerta: perguntaAtual.resposta,
    acertou: acertou
  });

  if (acertou) {
    feedback.textContent = "Resposta correta!";
    feedback.className = "certa";
    tocarSom(true);
  } else {
    feedback.textContent = "Resposta errada! A correta é: " + perguntaAtual.resposta;
    feedback.className = "errada";
    tocarSom(false);
  }

  setTimeout(function () {
    indiceAtual = indiceAtual + 1;

    if (indiceAtual < perguntasFiltradas.length) {
      mostrarPergunta();
    } else {
      mostrarResultadoFinal();
    }
  }, 1000);
}

function validarResposta(escolhida, correta) {
  if (escolhida === correta) {
    return true;
  } else {
    return false;
  }
}

function mostrarResultadoFinal() {
  var totalAcertos = respostasUsuario.reduce(function (total, item) {
    if (item.acertou) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);

  var apenasAcertos = respostasUsuario.filter(function (item) {
    return item.acertou === true;
  });

  var listaResultado = respostasUsuario.map(function (item) {
    return (
      '<div class="resultado-item">' +
      "<strong>" + item.pergunta + "</strong>" +
      "<p>Sua resposta: " + item.respostaEscolhida + "</p>" +
      "<p>Resposta certa: " + item.respostaCerta + "</p>" +
      "</div>"
    );
  });

  quiz.innerHTML =
    "<h2>Resultado Final</h2>" +
    "<p>Total de acertos: " + totalAcertos + "</p>" +
    "<p>Total de erros: " + (respostasUsuario.length - totalAcertos) + "</p>" +
    listaResultado.join("");
}

function reiniciarQuiz() {
  indiceAtual = 0;
  respostasUsuario = [];
  buscaInput.value = "";
  mensagemFiltro.textContent = "Todas as perguntas estão aparecendo.";
  perguntasFiltradas = perguntas;
  mostrarPergunta();
}

nomeInput.addEventListener("keyup", atualizarNome);
buscaInput.addEventListener("input", aplicarFiltro);
botaoReiniciar.addEventListener("click", reiniciarQuiz);

iniciarLoading();
