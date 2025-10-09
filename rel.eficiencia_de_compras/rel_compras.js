// ===== Dados iniciais =====
let produtos = [
    { produto: "Parafuso", fornecedor: "A", quantidade: 500, status: "Alta", observacao: "" },
    { produto: "Porca", fornecedor: "B", quantidade: 300, status: "Média", observacao: "" },
    { produto: "Arruela", fornecedor: "C", quantidade: 200, status: "Baixa", observacao: "" }
  ];
  
  const tabelaBody = document.getElementById("tabelaBody");
  const btnAddLinha = document.getElementById("btnAddLinha");
  const selectOrdenacao = document.getElementById("ordenacao");
  
  // Campos da linha de cadastro
  const novoProduto = document.getElementById("novoProduto");
  const novoFornecedor = document.getElementById("novoFornecedor");
  const novaQuantidade = document.getElementById("novaQuantidade");
  const novoStatus = document.getElementById("novoStatus");
  
  // Modais
  const modalObs = document.getElementById("modalObservacao");
  const modalText = document.getElementById("modalText");
  const modalSalvar = document.getElementById("modalSalvar");
  const modalExcluir = document.getElementById("modalExcluir");
  const confirmExcluir = document.getElementById("confirmExcluir");
  const cancelExcluir = document.getElementById("cancelExcluir");
  
  let linhaAtualModal = null;
  let linhaExcluir = null;
  
  // Gráficos
  let chartPizza = null;
  let chartLinha = null;
  
  // ===== Renderização da tabela =====
  function renderTabela() {
    tabelaBody.innerHTML = "";
    produtos.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="editable">${item.produto}</td>
        <td class="editable">${item.fornecedor}</td>
        <td class="editable">${item.quantidade}</td>
        <td class="editable">${item.status}</td>
        <td><button class="btnExcluir">Excluir</button></td>
      `;
      tabelaBody.appendChild(tr);
  
      let clickTimeout = null;
  
      // Clique simples abre modal de observação
      tr.addEventListener("click", e => {
        if (e.target.tagName === "TD" && !e.target.classList.contains("editing")) {
          if (clickTimeout !== null) return;
          clickTimeout = setTimeout(() => {
            linhaAtualModal = index;
            modalText.value = produtos[index].observacao;
            modalObs.classList.add("show");
            modalText.focus();
            clickTimeout = null;
          }, 250);
        }
      });
  
      // Duplo clique editável
      tr.querySelectorAll(".editable").forEach(td => {
        td.addEventListener("dblclick", e => {
          e.stopPropagation();
          clearTimeout(clickTimeout);
          clickTimeout = null;
  
          td.contentEditable = true;
          td.classList.add("editing");
          td.focus();
        });
  
        td.addEventListener("keypress", e => {
          if (e.key === "Enter") {
            e.preventDefault();
            td.contentEditable = false;
            td.classList.remove("editing");
            atualizarDados();
          }
        });
  
        td.addEventListener("blur", () => {
          td.contentEditable = false;
          td.classList.remove("editing");
          atualizarDados();
        });
      });
  
      // Botão excluir
      tr.querySelector(".btnExcluir").addEventListener("click", e => {
        e.stopPropagation();
        linhaExcluir = index;
        modalExcluir.classList.add("show");
      });
    });
  
    atualizarCards();
    atualizarGraficos();
  }
  
  // ===== Atualizar dados da tabela =====
  function atualizarDados() {
    produtos = Array.from(tabelaBody.querySelectorAll("tr")).map((tr, i) => {
      const tds = tr.querySelectorAll("td.editable");
      return {
        produto: tds[0].textContent,
        fornecedor: tds[1].textContent,
        quantidade: parseInt(tds[2].textContent) || 0,
        status: tds[3].textContent,
        observacao: produtos[i].observacao
      };
    });
    atualizarCards();
    atualizarGraficos();
  }
  
  // ===== Atualizar cards =====
  function atualizarCards() {
    const total = produtos.reduce((a, b) => a + b.quantidade * 10, 0);
    document.getElementById("totalCompras").textContent = `R$ ${total}`;
    document.getElementById("pedidosAbertos").textContent = produtos.length;
    document.getElementById("fornecedoresAtivos").textContent = [...new Set(produtos.map(p => p.fornecedor))].length;
  }
  
  // ===== Modal Observação =====
  modalSalvar.addEventListener("click", () => {
    if (linhaAtualModal !== null) {
      produtos[linhaAtualModal].observacao = modalText.value;
      modalObs.classList.remove("show");
      linhaAtualModal = null;
      renderTabela();
    }
  });
  modalText.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      modalSalvar.click();
    }
  });
  
  // ===== Modal Excluir =====
  confirmExcluir.addEventListener("click", () => {
    if (linhaExcluir !== null) {
      produtos.splice(linhaExcluir, 1);
      linhaExcluir = null;
      modalExcluir.classList.remove("show");
      renderTabela();
    }
  });
  cancelExcluir.addEventListener("click", () => {
    modalExcluir.classList.remove("show");
    linhaExcluir = null;
  });
  
  // ===== Adicionar nova linha =====
  btnAddLinha.addEventListener("click", () => {
    const produto = novoProduto.value.trim();
    const fornecedor = novoFornecedor.value.trim();
    const quantidade = parseInt(novaQuantidade.value) || 0;
    const status = novoStatus.value;
  
    if (!produto || !fornecedor || !status) {
      alert("Preencha todos os campos!");
      return;
    }
  
    produtos.unshift({ produto, fornecedor, quantidade, status, observacao: "" });
    novoProduto.value = "";
    novoFornecedor.value = "";
    novaQuantidade.value = "";
    novoStatus.value = "";
    renderTabela();
  });
  
  // ===== Ordenação =====
  selectOrdenacao.addEventListener("change", () => {
    const valor = selectOrdenacao.value;
  
    if (valor === "produto") produtos.sort((a, b) => a.produto.localeCompare(b.produto));
    if (valor === "fornecedor") produtos.sort((a, b) => a.fornecedor.localeCompare(b.fornecedor));
    if (valor === "Alta") produtos = produtos.filter(p => p.status === "Alta");
    if (valor === "Média") produtos = produtos.filter(p => p.status === "Média");
    if (valor === "Baixa") produtos = produtos.filter(p => p.status === "Baixa");
  
    renderTabela();
  });
  
  // ===== Gráficos =====
  function atualizarGraficos() {
    const fornecedores = ["A", "B", "C"];
    const valoresPizza = fornecedores.map(f =>
      produtos.filter(p => p.fornecedor === f).reduce((a, b) => a + b.quantidade, 0)
    );
  
    if (chartPizza) chartPizza.destroy();
    const ctxPizza = document.getElementById("graficoPizza");
    chartPizza = new Chart(ctxPizza, {
      type: "doughnut",
      data: {
        labels: fornecedores.map(f => "Fornecedor " + f),
        datasets: [{
          data: valoresPizza,
          backgroundColor: ['#4e73df', '#1c63e8', '#6c9cff'],
          borderColor: "#fff",
          borderWidth: 2,
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Distribuição de Compras', color: '#333' } }
      }
    });
  
    // Linha mensal com valores reais
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
    // Distribuindo a quantidade real proporcionalmente por mês
    const valoresLinha = meses.map((_, i) =>
      produtos.reduce((total, produto) => total + Math.ceil(produto.quantidade / meses.length), 0)
    );
  
    if (chartLinha) chartLinha.destroy();
    const ctxLinha = document.getElementById("graficoLinha");
    chartLinha = new Chart(ctxLinha, {
      type: "line",
      data: {
        labels: meses,
        datasets: [{
          label: "Compras Mensais",
          data: valoresLinha,
          backgroundColor: "rgba(28,99,232,0.2)",
          borderColor: "#1c63e8",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#1c63e8",
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false }, title: { display: true, text: 'Compras Mensais Reais', color: '#333' } },
        scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } }, x: { grid: { display: false } } }
      }
    });
  }
  
  // ===== Inicialização =====
  renderTabela();
  