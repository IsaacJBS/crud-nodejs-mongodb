const express = require('express');
const { listarPessoas, cadastrarPessoas, mostrarPessoas, mostrarUmaPessoa, deletarPessoa, atualizarPessoa } = require('./controllers/controladores');

const rotas = express();

rotas.get('/person', mostrarPessoas);
rotas.get('/:id', mostrarUmaPessoa);
rotas.post('/person', cadastrarPessoas);
rotas.patch('/:id', atualizarPessoa);
rotas.delete('/:id', deletarPessoa);

module.exports = rotas;