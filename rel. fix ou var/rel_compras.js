document.addEventListener("DOMContentLoaded", function() {
    const dataTable = document.querySelector('.data-table');
    const saveButton = document.querySelector('.save-button');
    const modal = document.getElementById('confirmationModal');
    const confirmBtn = modal.querySelector('.confirm-btn');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const obsModal = document.getElementById('obsModal');
    const obsInput = document.getElementById('obsInput');
    const obsSaveBtn = document.getElementById('obsSaveBtn');
    const obsCancelBtn = document.getElementById('obsCancelBtn');
    const searchInput = document.querySelector('.search-box input');
    const sortSelect = document.querySelector('.sort-box select');

    let data = [
        { type: 'Fixa', product: 'Parafuso', supplier: 'Fornecedor A', date: '2025-06-01', value: 150, frequency: 'Mensal', obs: 'Estoque inicial' },
        { type: 'Variável', product: 'Porca', supplier: 'Fornecedor B', date: '2025-06-05', value: 200, frequency: 'Anual', obs: 'Compra programada' },
        { type: 'Fixa', product: 'Arruela', supplier: 'Fornecedor C', date: '2025-05-20', value: 100, frequency: 'Mensal', obs: '' }
    ];

    let deleteIndex = -1;
    let obsIndex = -1;
    let filteredData = [...data];

    function renderTable() {
        // Remove linhas dinâmicas antigas
        document.querySelectorAll('.data-row.dynamic').forEach(r => r.remove());

        filteredData.forEach((item, index) => {
            const row = document.createElement('div');
            row.classList.add('table-row','data-row','dynamic');
            row.dataset.index = index;

            row.innerHTML = `
                <div class="column" contenteditable="true">${item.type}</div>
                <div class="column" contenteditable="true">${item.product}</div>
                <div class="column" contenteditable="true">${item.supplier}</div>
                <div class="column" contenteditable="true">${item.date}</div>
                <div class="column" contenteditable="true">${item.value}</div>
                <div class="column" contenteditable="true">${item.frequency}</div>
                <div class="column obs-cell">${item.obs}</div>
                <div class="column data-action">
                    <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            dataTable.appendChild(row);

            // Clique na linha fora das células editáveis
            row.addEventListener('click', (e) => {
                if (!e.target.isContentEditable && !e.target.classList.contains('delete-btn')) {
                    obsIndex = index;
                    obsInput.value = filteredData[obsIndex].obs;
                    obsModal.style.display = 'flex';
                }
            });
        });

        // Eventos do botão de exclusão
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                deleteIndex = btn.dataset.index;
                modal.style.display = 'flex';
            });
        });
    }

    function addProduct() {
        const newItem = {
            type: document.querySelector('.input-type').value,
            product: document.querySelector('.input-product').value,
            supplier: document.querySelector('.input-supplier').value,
            date: document.querySelector('.input-date').value,
            value: parseFloat(document.querySelector('.input-value').value) || 0,
            frequency: document.querySelector('.input-frequency').value,
            obs: document.querySelector('.input-obs').value
        };
        if(newItem.product && newItem.supplier){
            data.push(newItem);
            filteredData = [...data];
            renderTable();
            clearInputs();
        }
    }

    function clearInputs(){
        document.querySelectorAll('.input-row input').forEach(i => i.value = '');
        document.querySelectorAll('.input-row select').forEach(s => s.selectedIndex = 0);
    }

    // Salvar produto
    saveButton.addEventListener('click', addProduct);
    document.querySelector('.input-row').addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            addProduct();
        }
    });

    // Modal exclusão
    confirmBtn.addEventListener('click', () => {
        if(deleteIndex!==-1){
            const itemToRemove = filteredData[deleteIndex];
            const realIndex = data.findIndex(d => d === itemToRemove);
            data.splice(realIndex,1);
            filteredData = [...data];
            renderTable();
        }
        modal.style.display='none';
    });
    cancelBtn.addEventListener('click', ()=> modal.style.display='none');
    window.addEventListener('click',(e)=>{if(e.target===modal) modal.style.display='none';});

    // Modal observação
    obsSaveBtn.addEventListener('click', ()=>{
        if(obsIndex!==-1){
            const realIndex = data.findIndex(d => d === filteredData[obsIndex]);
            data[realIndex].obs = obsInput.value;
            filteredData = [...data];
            renderTable();
        }
        obsModal.style.display='none';
    });
    obsCancelBtn.addEventListener('click', ()=> obsModal.style.display='none');
    window.addEventListener('click', (e)=>{if(e.target===obsModal) obsModal.style.display='none';});

    // Ordenação
    function sortData(option){
        switch(option){
            case 'Produto (A-Z)': filteredData.sort((a,b)=>a.product.localeCompare(b.product)); break;
            case 'Fornecedor (A-Z)': filteredData.sort((a,b)=>a.supplier.localeCompare(b.supplier)); break;
            case 'Valor Crescente': filteredData.sort((a,b)=>a.value-b.value); break;
            case 'Valor Decrescente': filteredData.sort((a,b)=>b.value-a.value); break;
            case 'Data (Mais Recente)': filteredData.sort((a,b)=> new Date(b.date) - new Date(a.date)); break;
            case 'Tipo de Compra (Fixa Primeiro)': filteredData.sort((a,b)=> a.type==='Fixa'? -1:1); break;
            case 'Tipo de Compra (Variável Primeiro)': filteredData.sort((a,b)=> a.type==='Variável'? -1:1); break;
            case 'Frequência (Mensal Primeiro)': filteredData.sort((a,b)=> a.frequency==='Mensal'? -1:1); break;
            case 'Frequência (Anual Primeiro)': filteredData.sort((a,b)=> a.frequency==='Anual'? -1:1); break;
        }
        renderTable();
    }
    sortSelect.addEventListener('change', ()=>sortData(sortSelect.value));

    // Pesquisa
    searchInput.addEventListener('input', ()=>{
        const query = searchInput.value.toLowerCase();
        filteredData = data.filter(item =>
            item.product.toLowerCase().includes(query) ||
            item.supplier.toLowerCase().includes(query)
        );
        renderTable();
    });

    renderTable();
});
