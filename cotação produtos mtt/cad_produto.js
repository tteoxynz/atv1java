document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.querySelector("#tabela-produtos tbody");
  const linhaCadastro = document.getElementById("linha-cadastro");
  const filtro = document.getElementById("filtro");
  const btnOrdenar = document.getElementById("btnOrdenar");
  const menuOrdenar = document.getElementById("menuOrdenar");
  const modal = document.getElementById("modalConfirm");
  const btnSim = document.getElementById("confirmSim");
  const btnNao = document.getElementById("confirmNao");
  let linhaParaExcluir = null;

  function criarTd(valor, editavel = true){
    const td = document.createElement("td");
    td.innerText = valor;
    if(editavel) td.addEventListener("dblclick", editarCelula);
    return td;
  }

  function editarCelula(){
    const celula = this;
    if(celula.querySelector("input")) return;
    const valorAtual = celula.innerText;
    const input = document.createElement("input");
    input.type = "text";
    input.value = valorAtual;
    celula.innerText = "";
    celula.appendChild(input);
    input.focus();

    input.addEventListener("blur", () => {
      celula.innerText = input.value;
      atualizarTotal(celula.closest("tr"));
      ordenarTabela(criterioAtual);
    });

    input.addEventListener("keydown", e => {
      if(e.key === "Enter") input.blur();
    });
  }

  function atualizarTotal(linha){
    const preco = parseFloat(linha.cells[1].innerText.replace(/[^\d,]/g,"").replace(",", ".")) || 0;
    const qtd = parseInt(linha.cells[2].innerText) || 0;
    linha.cells[3].innerText = (preco*qtd).toFixed(2).replace(".", ",") + "R$";
  }

  function adicionarLinha(){
    const inputs = linhaCadastro.querySelectorAll("input");
    const produto = inputs[0].value.trim();
    const preco = inputs[1].value.trim();
    const qtd = inputs[2].value.trim();
    const prazo = inputs[3].value.trim();
    if(!produto || !preco || !qtd || !prazo) return;

    const novaLinha = document.createElement("tr");
    novaLinha.classList.add("fade-in");

    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString("pt-BR");

    novaLinha.appendChild(criarTd(produto));
    novaLinha.appendChild(criarTd(preco));
    novaLinha.appendChild(criarTd(qtd));
    novaLinha.appendChild(criarTd("0,00R$", false));
    novaLinha.appendChild(criarTd(prazo));
    novaLinha.appendChild(criarTd(dataFormatada, false));

    const tdExcluir = document.createElement("td");
    const btnExcluir = document.createElement("button");
    btnExcluir.className = "btn-excluir";
    btnExcluir.innerText = "🗑️";
    btnExcluir.addEventListener("click", () => abrirModal(novaLinha));
    tdExcluir.appendChild(btnExcluir);
    novaLinha.appendChild(tdExcluir);

    tabela.appendChild(novaLinha);
    atualizarTotal(novaLinha);

    inputs.forEach(i => i.value = "");
    inputs[0].focus();

    ordenarTabela(criterioAtual);
  }

  function abrirModal(linha){
    linhaParaExcluir = linha;
    modal.style.display = "flex";
  }
  function fecharModal(){ modal.style.display = "none"; }

  btnSim.addEventListener("click", () => {
    if(linhaParaExcluir){
      linhaParaExcluir.classList.add("fade-out");
      setTimeout(() => {
        linhaParaExcluir.remove();
        linhaParaExcluir = null;
      }, 400);
    }
    fecharModal();
  });
  btnNao.addEventListener("click", fecharModal);

  // Novo filtro que permite diferentes critérios de busca
  filtro.addEventListener("keyup", () => {
    const termo = filtro.value.toLowerCase();
    tabela.querySelectorAll("tr").forEach(linha => {
      if(linha.id === "linha-cadastro") return;

      // Obtendo os dados da linha
      const produto = linha.cells[0].innerText.toLowerCase();
      const preco = linha.cells[1].innerText.toLowerCase();
      const quantidade = linha.cells[2].innerText.toLowerCase();
      const prazo = linha.cells[4].innerText.toLowerCase();

      // Verificando se o termo está em qualquer uma das células
      const matchProduto = produto.includes(termo);
      const matchPreco = preco.includes(termo);
      const matchQuantidade = quantidade.includes(termo);
      const matchPrazo = prazo.includes(termo);

      // Exibe a linha se o filtro combinar com qualquer uma das colunas
      if(matchProduto || matchPreco || matchQuantidade || matchPrazo) {
        linha.style.display = "";
      } else {
        linha.style.display = "none";
      }
    });
  });

  let criterioAtual = "az";
  function ordenarTabela(criterio){
    criterioAtual = criterio;
    const linhas = Array.from(tabela.querySelectorAll("tr")).filter(l => l.id !== "linha-cadastro");

    linhas.sort((a,b) => {
      if(criterio === "az"){
        const valA = a.cells[0].innerText.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
        const valB = b.cells[0].innerText.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
        return valA.localeCompare(valB);
      }
      if(criterio === "preco"){
        const precoA = parseFloat(a.cells[1].innerText.replace(/[^\d,]/g,"").replace(",", ".")) || 0;
        const precoB = parseFloat(b.cells[1].innerText.replace(/[^\d,]/g,"").replace(",", ".")) || 0;
        return precoA - precoB;
      }
      if(criterio === "prazo"){
        const prazoA = parseInt(a.cells[4].innerText.replace(/\D/g,"")) || 0;
        const prazoB = parseInt(b.cells[4].innerText.replace(/\D/g,"")) || 0;
        return prazoA - prazoB;
      }
      if(criterio === "quantidade"){
        const qtdA = parseInt(a.cells[2].innerText) || 0;
        const qtdB = parseInt(b.cells[2].innerText) || 0;
        return qtdA - qtdB;
      }
      if(criterio === "data"){
        const partesA = a.cells[5].innerText.split("/");
        const partesB = b.cells[5].innerText.split("/");
        const dataA = new Date(+partesA[2], +partesA[1]-1, +partesA[0]);
        const dataB = new Date(+partesB[2], +partesB[1]-1, +partesB[0]);
        return dataB - dataA;
      }
      return 0;
    });

    linhas.forEach(linha => tabela.appendChild(linha));
  }

  btnOrdenar.addEventListener("click", () => {
    menuOrdenar.style.display = menuOrdenar.style.display === "block" ? "none" : "block";
  });
  menuOrdenar.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => {
      menuOrdenar.querySelectorAll("li").forEach(x => x.classList.remove("active"));
      li.classList.add("active");
      ordenarTabela(li.dataset.valor);
      menuOrdenar.style.display = "none";
    });
  });

  linhaCadastro.querySelectorAll("input").forEach(input => {
    input.addEventListener("keydown", e => {
      if(e.key === "Enter") adicionarLinha();
    });
  });

  tabela.querySelectorAll("tr").forEach(linha => {
    if(linha.id !== "linha-cadastro"){
      for(let i = 0; i < linha.cells.length - 2; i++) {
        linha.cells[i].addEventListener("dblclick", editarCelula);
      }
      const btn = linha.querySelector(".btn-excluir");
      if(btn) btn.addEventListener("click", () => abrirModal(linha));
    }
  });
});
