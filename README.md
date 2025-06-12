📘 Mini ERP - Sistema de Gestão Simplificada

1. Introdução

Este projeto consiste em um sistema ERP (Enterprise Resource Planning) simplificado, voltado para gestão de vendas, produtos e clientes. Desenvolvido com foco educacional e MVPs rápidos, o sistema permite realizar consultas gerenciais, inserir vendas e acompanhar dados de estoque e movimentações financeiras.

Tecnologias utilizadas:

Frontend: React.js + Bootstrap

Backend: Node.js com Express

Banco de Dados: MySQL

2. Arquitetura

Estrutura de pastas

Mini_ERP/
├── backend/               # Servidor Node.js com Express e MySQL
│   └── index.js           # Lógica de rotas, conexão e inserções no banco
│   └── package.json
├── frontend/              # Aplicação React
│   └── src/
│       └── components/
│           ├── ERPConsultas.tsx
│           └── InserirVenda.tsx
│       └── App.tsx
│   └── package.json

Fluxo de Dados

O frontend realiza requisições fetch para as rotas do backend:

GET /clientes

GET /produtos

POST /vendas

GET /consultar?query=produtos|clientes|vendas|dashboard...

O backend trata os dados e responde com os resultados da consulta no banco MySQL banco_teste.

Banco de Dados

Nome: banco_teste

Tabelas principais:

clientes, produtos, empresas, vendas, itens_venda, formas_pagamento, estoque_movimentacoes

3. Pré-requisitos

Antes de iniciar o projeto, você precisará ter instalado:

Node.js

npm

MySQL

Passos iniciais

# Clone o repositório
https://github.com/italo2403/Mini_ERP.git

# Acesse a pasta do projeto
cd Mini_ERP

Banco de Dados

Crie o banco:

CREATE DATABASE banco_teste;

Importe as tabelas e rode possíveis ALTER TABLE de acordo com as chaves e tipos necessários para:

valor_total com DECIMAL(10,2)

Subtotais e vínculos com FOREIGN KEY

4. Como rodar

Backend

cd backend
npm install
npm start

Frontend

cd frontend
npm install
npm run dev

📌 Desenvolvido por Italo Nunes - Para fins educacionais e prototipagem rápida de ERPs.
