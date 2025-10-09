let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
const tabela = document.querySelector("#tabelaProdutos tbody");
const btnCadastrar = document.getElementById("btnCadastrar");
const filtro = document.getElementById("filtro");
const modal = document.getElementById("modal-confirmacao");
const btnSim = document.getElementById("btn-sim");
const btnNao = document.getElementById("btn-nao");
let idParaRemover = null;

const sortMenu = document.querySelector(".sort-menu");
const sortOptions = document.querySelector(".sort-options");

sortMenu.addEventListener("click", () => {
  sortOptions.style.display = sortOptions.style.display === "block" ? "none" : "block";
});
document.addEventListener("click", e => {
  if (!sortMenu.contains(e.target)) sortOptions.style.display = "none";
});

function salvarLocal() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function renderizar(filtrados = null) {
  const lista = filtrados || produtos;
  tabela.innerHTML = "";

  if (lista.length === 0) {
    tabela.innerHTML = `<tr><td colspan="6">Nenhum produto cadastrado.</td></tr>`;
    return;
  }

  lista.forEach(prod => {
    const tr = document.createElement("tr");
    tr.dataset.id = prod.id;
    tr.innerHTML = `
      <td>${prod.nome}</td>
      <td>${prod.fornecedor}</td>
      <td>${prod.descricao}</td>
      <td>${prod.preco}</td>
      <td>${prod.quantidade}</td>
      <td><button class="delete-btn" data-id="${prod.id}">🗑</button></td>
    `;

    tr.querySelectorAll("td").forEach((td, i) => {
      if (i < 4) {
        td.addEventListener("dblclick", () => {
          const campo = ["nome", "fornecedor", "descricao", "preco", "quantidade"][i];
          const input = document.createElement("input");
          input.type = campo === "quantidade" || campo === "preco" ? "number" : "text";
          input.step = campo === "preco" ? "0.01" : "1";
          input.value = td.textContent;
          td.textContent = "";
          td.appendChild(input);
          input.focus();

          input.addEventListener("blur", () => {
            if (campo === "quantidade") {
              prod[campo] = parseInt(input.value) || 0;
            } else if (campo === "preco") {
              prod[campo] = parseFloat(input.value) || 0;
            } else {
              prod[campo] = input.value.trim();
            }
            salvarLocal();
            renderizar();
          });
        });
      }
    });

    tabela.appendChild(tr);
  });
}

btnCadastrar.addEventListener("click", () => {
  const nome = document.getElementById("produto").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const preco = parseFloat(document.getElementById("preco").value);
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const fornecedor = document.getElementById("fornecedor").value.trim();

  if (!nome || !fornecedor || !descricao || isNaN(preco) || isNaN(quantidade)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  produtos.push({ id: Date.now(), nome, descricao, preco, quantidade, fornecedor });
  salvarLocal();
  renderizar();

  document.getElementById("produto").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("preco").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("fornecedor").value = "";
});

filtro.addEventListener("input", () => {
  const termo = filtro.value.toLowerCase().trim();
  renderizar(produtos.filter(p => p.nome.toLowerCase().includes(termo) || p.descricao.toLowerCase().includes(termo)));
});

tabela.addEventListener("click", e => {
  if (e.target.classList.contains("delete-btn")) {
    idParaRemover = parseInt(e.target.dataset.id);
    modal.classList.add("mostrar");
  }
});

btnSim.addEventListener("click", () => {
  if (idParaRemover !== null) {
    produtos = produtos.filter(p => p.id !== idParaRemover);
    salvarLocal();
    renderizar();
    idParaRemover = null;
  }
  modal.classList.remove("mostrar");
});

btnNao.addEventListener("click", () => {
  modal.classList.remove("mostrar");
  idParaRemover = null;
});

document.querySelectorAll(".sort-options div").forEach(op => {
  op.addEventListener("click", () => {
    const campo = op.dataset.campo;

    if (campo === "nome") {
      produtos.sort((a, b) => a.nome.trim().toLowerCase().localeCompare(b.nome.trim().toLowerCase()));
    } else if (campo === "preco") {
      produtos.sort((a, b) => parseFloat(a.preco) - parseFloat(b.preco));
    } else if (campo === "quantidade") {
      produtos.sort((a, b) => a.quantidade - b.quantidade);
    } else if (campo === "fornecedor") {
      produtos.sort((a, b) => a.fornecedor.trim().toLowerCase().localeCompare(b.fornecedor.trim().toLowerCase()));
    }

    renderizar();
    sortOptions.style.display = "none";
  });
});

renderizar();
