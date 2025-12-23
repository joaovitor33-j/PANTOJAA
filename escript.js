<script>
  let linhaEditando = null;

  /* ===============================
     FILTRO DE PESQUISA
  =============================== */
  function filtrar() {
    const termo = busca.value.toLowerCase();
    document.querySelectorAll('#tabela tbody tr').forEach(linha => {
      linha.style.display = linha.innerText.toLowerCase().includes(termo)
        ? ''
        : 'none';
    });
  }

  /* ===============================
     SALVAR NO LOCALSTORAGE
  =============================== */
  function salvarTabela() {
    const dados = [];

    document.querySelectorAll('#tabela tbody tr').forEach(linha => {
      const c = linha.cells;
      dados.push({
        codigo: c[0].innerText,
        material: c[1].innerText,
        categoria: c[2].innerText,
        quantidade: c[3].innerText,
        unidade: c[4].innerText,
        localizacao: c[5].innerText
      });
    });

    localStorage.setItem('materiais', JSON.stringify(dados));
  }

  /* ===============================
     CARREGAR DO LOCALSTORAGE
  =============================== */
  function carregarTabela() {
    const dados = JSON.parse(localStorage.getItem('materiais')) || [];
    const tbody = document.querySelector('#tabela tbody');
    tbody.innerHTML = '';

    dados.forEach(item => {
      const linha = tbody.insertRow();
      linha.insertCell().innerText = item.codigo;
      linha.insertCell().innerText = item.material;
      linha.insertCell().innerText = item.categoria;
      linha.insertCell().innerText = item.quantidade;
      linha.insertCell().innerText = item.unidade;
      linha.insertCell().innerText = item.localizacao;

      const acoes = linha.insertCell();
      acoes.innerHTML = `
        <button onclick="editarMaterial(this)">Editar</button>
        <button onclick="excluirMaterial(this)">Excluir</button>
      `;
    });
  }

  /* ===============================
     SALVAR / EDITAR MATERIAL
  =============================== */
  function salvarMaterial(event) {
    event.preventDefault();

    const dados = [
      codigo.value,
      material.value,
      categoria.value,
      quantidade.value,
      unidade.value,
      localizacao.value
    ];

    if (linhaEditando) {
      dados.forEach((valor, i) => {
        linhaEditando.cells[i].innerText = valor;
      });
      linhaEditando = null;
    } else {
      const linha = document.querySelector('#tabela tbody').insertRow();
      dados.forEach(valor => linha.insertCell().innerText = valor);

      linha.insertCell().innerHTML = `
        <button onclick="editarMaterial(this)">Editar</button>
        <button onclick="excluirMaterial(this)">Excluir</button>
      `;
    }

    salvarTabela();
    event.target.reset();
  }

  /* ===============================
     EDITAR MATERIAL
  =============================== */
  function editarMaterial(botao) {
    linhaEditando = botao.closest('tr');
    const c = linhaEditando.cells;

    codigo.value = c[0].innerText;
    material.value = c[1].innerText;
    categoria.value = c[2].innerText;
    quantidade.value = c[3].innerText;
    unidade.value = c[4].innerText;
    localizacao.value = c[5].innerText;
  }

  /* ===============================
     EXCLUIR MATERIAL
  =============================== */
  function excluirMaterial(botao) {
    if (confirm('Deseja realmente excluir este material?')) {
      botao.closest('tr').remove();
      salvarTabela();
    }
  }

  /* ===============================
     CARREGAR AO ABRIR O SITE
  =============================== */
  window.onload = carregarTabela;
</script>
