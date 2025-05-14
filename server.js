const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let tarefas = [
  { id: 1, descricao: "Estudar python", concluida: false },
  { id: 2, descricao: "Enviar trabalho de POO", concluida: true },
  { id: 3, descricao: "Fazer task do projeto do MVP", concluida: false },
  { id: 4, descricao: "Estudar AWS", concluida: false }
];

// GET /tarefas
app.get('/tarefas', (req, res) => {
  res.status(200).json(tarefas);
});

// GET /tarefas/:id
app.get('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  res.json(tarefa);
});

// PUT /tarefas/:id (mark as completed)
app.put('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  tarefa.concluida = true;
  res.status(200).json(tarefa);
});

// POST /tarefas (add new task)
app.post('/tarefas', (req, res) => {
  const novaDescricao = req.body.descricao;
  if (!novaDescricao) {
    return res.status(400).json({ mensagem: "Descrição é obrigatória" });
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    descricao: novaDescricao,
    concluida: false
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
