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

5. Telas e Funcionalidades

🔍 Dashboard/Consultas ERP

Botões para executar SQLs prontas como:

Produtos por Empresa

Clientes por Empresa

Estoque Crítico

Vendas por Forma de Pagamento

📝 Inserir Venda

Seleciona cliente e produto

Informa quantidade

Calcula automaticamente subtotal

Insere dados em vendas e itens_venda

Mensagens de sucesso/erro informativas

6. Endpoints do Backend

Consultas gerais

GET /consultar?query=produtos
GET /consultar?query=dashboard

Recursos básicos

GET /clientes
GET /produtos

Inserir venda

POST /vendas
Body: {
  id_cliente: number,
  id_produto: number,
  quantidade: number
}

7. Banco de Dados

Estrutura de tabelas essenciais

clientes

Campo

Tipo

id_cliente

INT PK

nome

VARCHAR

id_empresa

INT FK

produtos

Campo

Tipo

id_produto

INT PK

nome

VARCHAR

preco_venda

DECIMAL(10,2)

id_empresa

INT FK

vendas

Campo

Tipo

id_venda

INT PK

id_cliente

INT FK

id_empresa

INT FK

valor_total

DECIMAL(10,2)

id_forma_pagamento

INT FK

data_venda

DATETIME

itens_venda

Campo

Tipo

id_item

INT PK

id_venda

INT FK

id_produto

INT FK

quantidade

INT

preco_unitario

DECIMAL(10,2)

subtotal

DECIMAL(10,2)

Sugestão de Diagrama

Você pode gerar um diagrama ER com o dbdiagram.io ou MySQL Workbench para visualização.

✅ Projeto finalizado com arquitetura clara, integração completa entre frontend, backend e banco, e pronto para evoluir com novos módulos como relatórios, autenticação e multiempresa.

📌 Desenvolvido por Italo Nunes - Para fins educacionais e prototipagem rápida de ERPs.
