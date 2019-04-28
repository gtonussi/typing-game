console.log("O arquivo javascript placar.js foi carregado");

function inserePlacar(){
  var corpoTabela = $(".placar").find("tbody");
  var usuario = "Jogador";
  var numPalavras = $("#contador-palavras").text();

  var linha = novaLinha(usuario, numPalavras);
  linha.find(".botao-remover").click(removeLinha);

  corpoTabela.prepend(linha);

  $(".placar").slideDown(500);

  console.log("rodou inserePlacar")
}

function scrollPlacar(){
  var posicaoPlacar = $(".placar").offset().top;
  $("body").animate({
    scrollTop: posicaoPlacar+"px"
  }, 1000);
}

function novaLinha(usuario, numPalavras){
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(numPalavras);
  var colunaRemover = $("<td>");

  var link = $("<a>").addClass("botao-remover").attr("href", "#");
  var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

  link.append(icone);
  colunaRemover.append(link);
  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}

function removeLinha(){
  event.preventDefault();
  $(this).parent().parent().fadeOut(500);
  setTimeout(function(){
    $(this).parent().parent().remove();
  }, 500);  
}

$("#botao-placar").click(mostraPlacar);

function mostraPlacar(){
  $(".placar").stop().toggle();
}

$("#botao-sync").click(sincronizaPlacar);

function sincronizaPlacar(){
  var placar = [];
  var linhas = $("tbody > tr");
  
  linhas.each(function(){
    var usuario = $(this).find("td:nth-child(1)").text();
    var palavras = $(this).find("td:nth-child(2)").text();
    
    var score = {
      usuario: usuario,
      pontos: palavras
    };

    placar.push(score);
  });  

  var dados = {
    placar: placar
  };

  $.post("http://localhost:3000/placar", dados, function(){
      console.log("Placar salvo no servidor");
  });
}

function atualizaPlacar(){
  $.get("http://localhost:3000/placar", function(data){
    $(data).each(function(){
      var linha = novaLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removeLinha);
      $("tbody").append(linha);
    });
  });
}
