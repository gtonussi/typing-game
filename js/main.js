console.log("O arquivo javascript main.js foi carregado");

const tempoInicial = $("#tempo-digitacao").text();
const campo = $(".campo-digitacao");

// atalho para: $(document).ready(function(){})
$(function() {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
  // atalho para: (...).on("click", function(){})
  $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
  const frase = $(".frase").text();
  const numPalavras = frase.split(" ").length;
  const tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
  campo.on("input", function() {
    const conteudo = campo.val();

    const qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdPalavras);

    const qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);
  });
}

function inicializaMarcadores() {
  const frase = $(".frase").text();

  campo.on("input", function() {
    const digitado = campo.val();
    const comparavel = frase.substr(0, digitado.length);

    if (digitado === comparavel) {
      campo.addClass("borda-verde");
      campo.removeClass("borda-vermelha");
    } else {
      campo.addClass("borda-vermelha");
      campo.removeClass("borda-verde");
    }
  });
}

function inicializaCronometro() {
  let tempoRestante = Number($("#tempo-digitacao").text());

  campo.one("keydown", function() {
    const cronometroID = setInterval(function() {
      tempoRestante--;
      $("#tempo-digitacao").text(tempoRestante);
      if (tempoRestante < 1) {
        finalizaJogo();
        clearInterval(cronometroID);
      }
    }, 1000);
  });
}

function finalizaJogo() {
  campo.attr("disabled", true);
  campo.toggleClass("campo-desativado");
  inserePlacar();
}

function reiniciaJogo() {
  campo.attr("disabled", false);
  campo.val("");
  campo.toggleClass("campo-desativado");
  campo.removeClass("borda-vermelha");
  campo.removeClass("borda-verde");

  $("#contador-palavras").text("0");
  $("#contador-caracteres").text("0");
  $("#tempo-digitacao").text(tempoInicial);

  inicializaCronometro();
}
