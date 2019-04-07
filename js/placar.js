console.log("O arquivo javascript placar.js foi carregado");

function inserePlacar() {
  const corpoTabela = $(".placar").find("tbody");
  const usuario = "Jogador";
  const numPalavras = $("#contador-palavras").text();

  const linha = novaLinha(usuario, numPalavras);
  linha.find(".botao-remover").click(removeLinha);

  corpoTabela.prepend(linha);

  console.log("rodou inserePlacar");
}

function novaLinha(usuario, numPalavras) {
  const linha = $("<tr>");
  const colunaUsuario = $("<td>").text(usuario);
  const colunaPalavras = $("<td>").text(numPalavras);
  const colunaRemover = $("<td>");

  const link = $("<a>")
    .addClass("botao-remover")
    .attr("href", "#");
  const icone = $("<i>")
    .addClass("small")
    .addClass("material-icons")
    .text("delete");

  link.append(icone);
  colunaRemover.append(link);
  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}

function removeLinha() {
  event.preventDefault();
  $(this)
    .parent()
    .parent()
    .remove();
}
