document.addEventListener('DOMContentLoaded', () => {
  const lista = document.getElementById('listaTarefas');
  const form = document.getElementById('formNovaTarefa');
  const input = document.getElementById('descricao');

  function carregarTarefas() {
    fetch('/tarefas')
      .then(res => res.json())
      .then(tarefas => {
        lista.innerHTML = '';
        tarefas.forEach(t => adicionarTarefaDOM(t));
      });
  }

  function adicionarTarefaDOM(tarefa) {
    const li = document.createElement('li');
    li.textContent = tarefa.descricao;
    if (tarefa.concluida) li.classList.add('concluida');

    const btnConcluir = document.createElement('button');
    btnConcluir.textContent = '✓';
    btnConcluir.onclick = () => {
      fetch(`/tarefas/${tarefa.id}`, {
        method: 'PUT'
      })
        .then(res => res.json())
        .then(tarefaAtualizada => {
          li.classList.add('concluida');
        });
    };

    li.appendChild(btnConcluir);
    lista.appendChild(li);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const descricao = input.value.trim();
    if (!descricao) return;

    fetch('/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao })
    })
      .then(res => res.json())
      .then(novaTarefa => {
        adicionarTarefaDOM(novaTarefa);
        input.value = '';
      });
  });

  carregarTarefas();
});
