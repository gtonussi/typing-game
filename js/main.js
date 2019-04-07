console.log("O arquivo javascript main.js foi carregado");

var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//atalho para: $(document).ready(function(){})
$(function(){
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
  //atalho para: (...).on("click", function(){})
  $("#botao-reiniciar").click(reiniciaJogo);
})

function atualizaTamanhoFrase(){
  var frase = $(".frase").text();
  var numPalavras = frase.split(" ").length;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
  campo.on("input", function(){
    var conteudo = campo.val();

    var qtdPalavras = conteudo.split(/\S+/).length -1;
    $("#contador-palavras").text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);
  });
}

function inicializaMarcadores(){

  var frase = $(".frase").text();

  campo.on("input", function(){
    var digitado = campo.val();
    var comparavel = frase.substr(0, digitado.length);

    if(digitado == comparavel){
      campo.addClass("borda-verde");
      campo.removeClass("borda-vermelha")
    } else{
      campo.addClass("borda-vermelha");
      campo.removeClass("borda-verde");
    }
  });
}

function inicializaCronometro(){

  var tempoRestante = $("#tempo-digitacao").text();

  campo.one("focus", function() {
    var cronometroID = setInterval(function(){
      tempoRestante--;
      $("#tempo-digitacao").text(tempoRestante);
      if (tempoRestante < 1){
        finalizaJogo();
        clearInterval(cronometroID)};
    }, 1000);
  });
}

function finalizaJogo(){
  campo.attr("disabled", true);
  campo.toggleClass("campo-desativado");
  inserePlacar();
}

function reiniciaJogo(){

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
