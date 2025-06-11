-- Módulo de Usuários e Acesso
create database banco_teste;
use banco_teste;

create table usuarios (
  id_usuario int primary key auto_increment,
  nome varchar(255),
  email varchar(255) unique,
  senha_hash char(60),
  tipo_usuario enum('adm', 'comum'),
  data_criacao date
);
INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario, data_criacao) VALUES ('Castro Nascimento', 'castro@gmail.com', '1234','adm', '2025-06-11'), 
('Castra Nascimenta', 'castra@gmail.com', '1234','adm', '2025-06-11'),
('Castri Nascimenti', 'castri@gmail.com', '1234','adm', '2025-06-11');
INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario, data_criacao) VALUES ('Ítalo Nunes', 'italo@gmail.com', '1234','adm', '2025-06-11');


alter table empresas add id_usuario_responsavel int;
alter table empresas add  constraint id_usuario_responsavel foreign key(id_usuario_responsavel) references usuarios(id_usuario);
create table empresas (
  id_empresa int primary key auto_increment,
  nome_fantasia varchar(255),
  razao_social varchar(255),
  cnpj char(18)
    );
describe empresas;
INSERT INTO empresas (nome_fantasia, razao_social, cnpj, id_usuario_responsavel) VALUES ('Castro Nascimento Ltda.', '- ME', '52.981.604/0001-60', 2);
INSERT INTO empresas (nome_fantasia, razao_social, cnpj, id_usuario_responsavel) VALUES ('Teixeira Farias S.A.', '- ME', '64.352.018/0001-35', 1);
INSERT INTO empresas (nome_fantasia, razao_social, cnpj, id_usuario_responsavel) VALUES ('Nunes', 'Ltda.', '13.597.842/0001-14', 3);
select * from empresas;

-- Módulo de Clientes
create table clientes (
  id_cliente int primary key auto_increment,
  id_empresa int,
  nome varchar(255),
  cpf_cnpj varchar(20),
  telefone varchar(20),
  email varchar(255),
  endereco text,
  foreign key (id_empresa) references empresas(id_empresa)
);
INSERT INTO clientes (id_cliente, id_empresa, nome, cpf_cnpj, telefone, email, endereco) VALUES (2, 1, 'Sr. Marcelo Souza', '057.962.483-83', '+55 41 9117-1822', 'luiz-miguelsouza@bol.com.br', 'Vila de da Paz, 66
Ouro Minas
13315-098 das Neves / AC');
INSERT INTO clientes (id_cliente, id_empresa, nome, cpf_cnpj, telefone, email, endereco) VALUES (3, 1, 'Thales Caldeira', '310.627.895-12', '+55 11 8299-7376', 'castromarcela@moraes.br', 'Avenida de Castro, 7
Vila Oeste
13338-726 Freitas / PB');
INSERT INTO clientes (id_cliente, id_empresa, nome, cpf_cnpj, telefone, email, endereco) VALUES (4, 1, 'Breno Pires', '810.547.632-08', '81 7736 0260', 'stephany74@uol.com.br', 'Lago da Rosa, 9
Beira Linha
00978-820 da Mata / AP');
INSERT INTO clientes (id_cliente, id_empresa, nome, cpf_cnpj, telefone, email, endereco) VALUES (5, 1, 'Ana Clara Duarte', '613.490.582-89', '+55 71 3534-6247', 'alvesana@bol.com.br', 'Favela de Santos
Heliopolis
51354278 Souza do Sul / RO');
INSERT INTO clientes (id_cliente, id_empresa, nome, cpf_cnpj, telefone, email, endereco) VALUES (6, 1, 'Fernanda Cavalcanti', '241.058.739-97', '0500-353-4874', 'pereiramarcos-vinicius@almeida.com', 'Praia de Vieira, 18
Camponesa 2ª Seção
28059826 Barbosa / MA');
INSERT INTO clientes (id_cliente, id_empresa, nome, cpf_cnpj, telefone, email, endereco) VALUES (7, 1, 'Sr. João Gabriel da Rocha', '315.649.802-51', '+55 (051) 6025-6342', 'eazevedo@da.org', 'Viaduto da Mota, 55
Santa Lúcia
45868501 da Luz Verde / GO');
INSERT INTO clientes (id_cliente, id_empresa, nome, cpf_cnpj, telefone, email, endereco) VALUES (8, 1, 'Calebe Pinto', '596.470.328-38', '+55 61 0608-8356', 'lais51@santos.org', 'Vila Nicolas Vieira, 73
Vila Esplanada
29946-804 da Rocha das Pedras / SE');
INSERT INTO clientes (id_cliente, id_empresa, nome, cpf_cnpj, telefone, email, endereco) VALUES (9, 1, 'Maria Martins', '798.514.320-32', '+55 21 4895 1343', 'benjaminbarbosa@ribeiro.br', 'Parque de Sales, 33
Vila Das Oliveiras
16328708 Costa / PB');
INSERT INTO clientes (id_cliente, id_empresa, nome, cpf_cnpj, telefone, email, endereco) VALUES (10, 1, 'Lucas Gabriel Souza', '857.496.321-64', '+55 (031) 7743-4873', 'tcardoso@yahoo.com.br', 'Largo Evelyn Cardoso, 42
Miramar
31665876 da Rocha / TO');
select * from clientes;




-- Módulo de Produtos e Estoque
create table categorias_produto (
  id_categoria int primary key auto_increment,
  nome varchar(100)
);
INSERT INTO categorias_produto (nome) VALUES ('teste');

create table produtos (
  id_produto int primary key auto_increment,
  id_empresa int,
  nome varchar(255),
  descricao text,
  preco_venda decimal(10,2),
  preco_custo decimal(10,2),
  id_categoria int,
  quantidade_estoque int,
  foreign key (id_empresa) references empresas(id_empresa),
  foreign key (id_categoria) references categorias_produto(id_categoria)
);
select * from produtos;
create table estoque_movimentacoes (
  id_movimentacao int primary key auto_increment,
  id_produto int,
  tipo enum('entrada', 'saida'),
  quantidade int,
  data_prod datetime,
  descricao text,
  foreign key (id_produto) references produtos(id_produto)
);

-- Módulo de Vendas
create table formas_pagamento (
  id_forma_pagamento int primary key auto_increment,
  descricao varchar(100)
);
INSERT INTO formas_pagamento (descricao) VALUES ('pix'),
('dinheiro'),
('cartão');


create table vendas (
  id_venda int primary key auto_increment,
  id_cliente int,
  id_empresa int,
  data_venda datetime,
  valor_total decimal(10,2),
  id_forma_pagamento int,
  foreign key (id_cliente) references clientes(id_cliente),
  foreign key (id_empresa) references empresas(id_empresa),
  foreign key (id_forma_pagamento) references formas_pagamento(id_forma_pagamento)
);

create table itens_venda (
  id_item int primary key auto_increment,
  id_venda int,
  id_produto int,
  quantidade int,
  preco_unitario decimal(10,2),
  subtotal decimal(10,2),
  foreign key (id_venda) references vendas(id_venda),
  foreign key (id_produto) references produtos(id_produto)
);

-- Módulo Financeiro
create table recebimentos (
  id_recebimento int primary key auto_increment,
  id_venda int,
  data_recebimento datetime,
  valor_recebido decimal(10,2),
  observacao text,
  foreign key (id_venda) references vendas(id_venda)
);

create table despesas (
  id_despesa int primary key auto_increment,
  id_empresa int,
  descricao varchar(255),
  valor decimal(10,2),
  data_despesa datetime,
  categoria varchar(100),
  foreign key (id_empresa) references empresas(id_empresa)
);

-- Módulo de Relatórios e Monitoramento
create table relatorios_gerados (
  id_relatorio int primary key auto_increment,
  id_usuario int,
  tipo_relatorio varchar(100),
  data_geracao datetime,
  foreign key (id_usuario) references usuarios(id_usuario)
);

create table notificacoes (
  id_notificacao int primary key auto_increment,
  id_usuario int,
  mensagem text,
  lida boolean,
  data_envio datetime,
  foreign key (id_usuario) references usuarios(id_usuario)
);

create table logs_acesso (
  id_log int primary key auto_increment,
  id_usuario int,
  acao text,
  data_hora datetime,
  ip_origem varchar(50),
  foreign key (id_usuario) references usuarios(id_usuario)
);

-- Módulo de Assinatura e Plano
create table planos_assinatura (
  id_plano int primary key auto_increment,
  nome_plano varchar(100),
  valor_mensal decimal(10,2),
  limite_clientes int,
  limite_produtos int
);

create table assinaturas (
  id_assinatura int primary key auto_increment,
  id_empresa int,
  id_plano int,
  data_inicio date,
  data_fim date,
  status enum('ativo', 'cancelado', 'expirado'),
  foreign key (id_empresa) references empresas(id_empresa),
  foreign key (id_plano) references planos_assinatura(id_plano)
);
SELECT DISTINCT id_empresa FROM produtos;
SELECT * FROM empresas;
INSERT INTO empresas (id_empresa, nome_fantasia, razao_social, cnpj, id_usuario_responsavel) VALUES (1, 'Castro Nascimento Ltda.', '- ME', '52.981.604/0001-60', 2);
INSERT INTO empresas (id_empresa, nome_fantasia, razao_social, cnpj, id_usuario_responsavel) VALUES (2, 'Teixeira Farias S.A.', '- ME', '64.352.018/0001-35', 1);
INSERT INTO empresas (id_empresa, nome_fantasia, razao_social, cnpj, id_usuario_responsavel) VALUES (3, 'Nunes', 'Ltda.', '13.597.842/0001-14', 5);

INSERT INTO clientes (id_cliente, id_empresa, nome, cpf_cnpj, telefone, email, endereco) VALUES (1, 1, 'Bianca Ferreira', '234.578.610-80', '+55 84 8710 1226', 'mnascimento@souza.org', 'Condomínio de Teixeira, 25
Jardim Guanabara
27048-281 Santos do Oeste / BA');

INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (1, 1, 'adipisci', 'Fugit ab explicabo quidem sequi veritatis in.', 60.51, 37.22, 1, 38);
INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (2, 1, 'quisquam', 'Tempore laborum earum laborum harum pariatur reiciendis quam.', 63.03, 41.42, 1, 30);
INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (3, 1, 'omnis', 'Voluptatem modi tenetur nihil.', 48.04, 17.5, 1, 53);
INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (4, 1, 'ut', 'Assumenda inventore sint.', 18.35, 9.35, 1, 87);
INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (5, 1, 'ducimus', 'Ea eveniet iste.', 82.64, 37.84, 1, 58);
INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (6, 1, 'labore', 'Eius veritatis in rerum iusto quibusdam.', 59.68, 42.32, 1, 83);
INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (7, 1, 'asperiores', 'Dolore architecto vero aliquam adipisci dolorum.', 73.41, 7.06, 1, 47);
INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (8, 1, 'adipisci', 'Corrupti commodi pariatur natus dolor praesentium quisquam cumque.', 86.98, 43.99, 1, 45);
INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (9, 1, 'sequi', 'Quod cum est neque.', 67.21, 21.42, 1, 55);
INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (10, 1, 'ipsa', 'Perspiciatis vero id quaerat asperiores porro occaecati.', 70.32, 36.58, 1, 87);
INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (11, 1, 'corporis', 'Sed nobis commodi voluptates quos.', 25.4, 37.81, 1, 69);
INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (12, 1, 'laborum', 'Incidunt fuga magni exercitationem sed reprehenderit autem.', 34.3, 46.64, 1, 97);
INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (13, 1, 'magni', 'Provident ipsa quasi vitae earum repellat modi.', 85.86, 39.92, 1, 14);
INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (14, 1, 'perspiciatis', 'Ipsa quasi eaque sequi rerum assumenda sunt.', 46.1, 7.98, 1, 37);
INSERT INTO produtos (id_produto, id_empresa, nome, descricao, preco_venda, preco_custo, id_categoria, quantidade_estoque) VALUES (15, 1, 'exercitationem', 'Necessitatibus pariatur excepturi laudantium eveniet laborum explicabo.', 54.93, 44.81, 1, 28);

INSERT INTO vendas (id_venda, id_cliente, id_empresa, data_venda, valor_total, id_forma_pagamento) VALUES (1, 3, 1, '2025-02-20 04:00:34', 770.49, 3);
INSERT INTO vendas (id_venda, id_cliente, id_empresa, data_venda, valor_total, id_forma_pagamento) VALUES (2, 5, 1, '2025-03-08 02:05:38', 626.13, 3);
INSERT INTO vendas (id_venda, id_cliente, id_empresa, data_venda, valor_total, id_forma_pagamento) VALUES (3, 7, 2, '2025-02-24 07:18:10', 297.39, 1);
INSERT INTO vendas (id_venda, id_cliente, id_empresa, data_venda, valor_total, id_forma_pagamento) VALUES (4, 9, 2, '2025-04-26 18:17:01', 181.82, 1);
INSERT INTO vendas (id_venda, id_cliente, id_empresa, data_venda, valor_total, id_forma_pagamento) VALUES (5, 2, 1, '2025-05-17 03:45:11', 664.7, 3);
INSERT INTO vendas (id_venda, id_cliente, id_empresa, data_venda, valor_total, id_forma_pagamento) VALUES (6, 7, 1, '2025-02-23 15:30:17', 157.17, 2);
INSERT INTO vendas (id_venda, id_cliente, id_empresa, data_venda, valor_total, id_forma_pagamento) VALUES (7, 10, 2, '2025-04-18 22:10:26', 576.2, 3);
INSERT INTO vendas (id_venda, id_cliente, id_empresa, data_venda, valor_total, id_forma_pagamento) VALUES (8, 1, 1, '2025-01-02 23:18:27', 748.65, 3);

INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (1, 5, 13, 6, 20.04, 49.13);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (2, 8, 1, 5, 97.47, 78.58);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (3, 3, 14, 5, 85.75, 55.69);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (4, 4, 3, 6, 78.63, 58.54);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (5, 1, 10, 6, 53.97, 20.07);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (6, 6, 15, 5, 31.55, 31.68);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (7, 4, 2, 8, 83.44, 98.02);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (8, 3, 3, 8, 95.22, 24.86);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (9, 7, 4, 9, 77.97, 72.09);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (10, 5, 7, 6, 49.43, 56.58);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (11, 3, 4, 4, 15.76, 11.89);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (12, 4, 10, 4, 10.65, 73.71);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (13, 1, 4, 2, 91.49, 87.37);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (14, 3, 9, 4, 35.06, 53.69);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (15, 3, 12, 10, 61.86, 31.87);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (16, 8, 13, 7, 27.14, 18.72);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (17, 7, 6, 7, 47.0, 87.75);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (18, 1, 11, 2, 15.46, 75.54);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (19, 1, 4, 4, 27.12, 50.38);
INSERT INTO itens_venda (id_item, id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (20, 7, 3, 5, 51.64, 88.7);


-- Listagem de Produtos com Estoque e Empresa
SELECT 
  p.id_produto,
  p.nome AS nome_produto,
  p.descricao,
  p.preco_venda,
  p.quantidade_estoque,
  e.nome_fantasia AS empresa,
  c.nome AS categoria
FROM 
  produtos p
JOIN 
  empresas e ON p.id_empresa = e.id_empresa
JOIN 
  categorias_produto c ON p.id_categoria = c.id_categoria; -- OK

-- Lista de Vendas com Nome do Cliente e Forma de Pagamento
SELECT 
  v.id_venda,
  v.data_venda,
  v.valor_total,
  c.nome AS cliente,
  f.descricao AS forma_pagamento
FROM 
  vendas v
JOIN 
  clientes c ON v.id_cliente = c.id_cliente
JOIN 
  formas_pagamento f ON v.id_forma_pagamento = f.id_forma_pagamento;-- OK


-- Itens de Venda com Detalhes do Produto
SELECT 
  i.id_item,
  i.id_venda,
  p.nome AS produto,
  i.quantidade,
  i.preco_unitario,
  i.subtotal
FROM 
  itens_venda i
JOIN 
  produtos p ON i.id_produto = p.id_produto; -- OK

-- Clientes por Empresa
SELECT 
  cl.id_cliente,
  cl.nome,
  cl.email,
  cl.telefone,
  e.nome_fantasia AS empresa
FROM 
  clientes cl
JOIN 
  empresas e ON cl.id_empresa = e.id_empresa;-- OK

-- Dashboard Resumido por Empresa (total de vendas, clientes e produtos)
SELECT 
  e.nome_fantasia AS empresa,
  COUNT(DISTINCT v.id_venda) AS total_vendas,
  COUNT(DISTINCT c.id_cliente) AS total_clientes,
  COUNT(DISTINCT p.id_produto) AS total_produtos
FROM 
  empresas e
LEFT JOIN 
  vendas v ON v.id_empresa = e.id_empresa
LEFT JOIN 
  clientes c ON c.id_empresa = e.id_empresa
LEFT JOIN 
  produtos p ON p.id_empresa = e.id_empresa
GROUP BY 
  e.id_empresa;-- OK

-- Tela Inicial (Dashboard Resumido)
SELECT 
  e.nome_fantasia AS empresa,
  COUNT(DISTINCT c.id_cliente) AS total_clientes,
  COUNT(DISTINCT p.id_produto) AS total_produtos,
  COUNT(DISTINCT v.id_venda) AS total_vendas,
  COALESCE(SUM(v.valor_total), 0) AS valor_total_vendido
FROM 
  empresas e
LEFT JOIN clientes c ON c.id_empresa = e.id_empresa
LEFT JOIN produtos p ON p.id_empresa = e.id_empresa
LEFT JOIN vendas v ON v.id_empresa = e.id_empresa
GROUP BY 
  e.id_empresa; -- OK

-- Tela de Vendas com Cliente e Forma de Pagamento
SELECT 
  v.id_venda,
  DATE_FORMAT(v.data_venda, '%d/%m/%Y') AS data,
  c.nome AS cliente,
  f.descricao AS forma_pagamento,
  v.valor_total
FROM 
  vendas v
JOIN clientes c ON v.id_cliente = c.id_cliente
JOIN formas_pagamento f ON v.id_forma_pagamento = f.id_forma_pagamento
ORDER BY 
  v.data_venda DESC; -- OK

-- Tela de Produtos por Categoria
SELECT 
  p.nome AS produto,
  p.descricao,
  p.preco_venda,
  p.quantidade_estoque,
  c.nome AS categoria,
  e.nome_fantasia AS empresa
FROM 
  produtos p
JOIN categorias_produto c ON p.id_categoria = c.id_categoria
JOIN empresas e ON p.id_empresa = e.id_empresa
ORDER BY 
  c.nome, p.nome; -- OK

-- Relatório Financeiro: Receita por Mês
SELECT 
  e.nome_fantasia AS empresa,
  DATE_FORMAT(v.data_venda, '%Y-%m') AS mes,
  COUNT(v.id_venda) AS qtd_vendas,
  SUM(v.valor_total) AS receita_total
FROM 
  vendas v
JOIN empresas e ON v.id_empresa = e.id_empresa
GROUP BY 
  e.id_empresa, mes
ORDER BY 
  mes DESC; -- OK

-- Tela de Clientes com Vendas Associadas
SELECT 
  c.nome AS cliente,
  c.email,
  c.telefone,
  e.nome_fantasia AS empresa,
  COUNT(v.id_venda) AS qtd_compras,
  COALESCE(SUM(v.valor_total), 0) AS total_gasto
FROM 
  clientes c
JOIN empresas e ON c.id_empresa = e.id_empresa
LEFT JOIN vendas v ON v.id_cliente = c.id_cliente
GROUP BY 
  c.id_cliente; -- OK

-- Relatório de Itens Vendidos
SELECT 
  p.nome AS produto,
  SUM(i.quantidade) AS total_vendido,
  SUM(i.subtotal) AS faturamento
FROM 
  itens_venda i
JOIN produtos p ON i.id_produto = p.id_produto
GROUP BY 
  i.id_produto
ORDER BY 
  total_vendido DESC; -- OK

-- Filtro de Vendas por Período e Empresa
-- Altere as datas conforme necessário
SELECT 
  v.id_venda,
  DATE_FORMAT(v.data_venda, '%d/%m/%Y') AS data_venda,
  c.nome AS cliente,
  v.valor_total,
  e.nome_fantasia AS empresa
FROM 
  vendas v
JOIN clientes c ON v.id_cliente = c.id_cliente
JOIN empresas e ON v.id_empresa = e.id_empresa
WHERE 
  v.data_venda BETWEEN '2025-01-01' AND '2025-12-31'
  AND e.id_empresa = 1; -- OK

-- Estoque Crítico (produtos com quantidade baixa)
SELECT 
  p.nome AS produto,
  p.quantidade_estoque,
  e.nome_fantasia AS empresa
FROM 
  produtos p
JOIN empresas e ON p.id_empresa = e.id_empresa
WHERE 
  p.quantidade_estoque < 10
ORDER BY 
  p.quantidade_estoque ASC; -- OK

-- Resumo de Vendas por Forma de Pagamento

SELECT 
  f.descricao AS forma_pagamento,
  COUNT(v.id_venda) AS total_vendas,
  SUM(v.valor_total) AS total_recebido
FROM 
  vendas v
JOIN formas_pagamento f ON v.id_forma_pagamento = f.id_forma_pagamento
GROUP BY 
  f.id_forma_pagamento; -- OK

-- Despesas por Categoria e Empresa
SELECT 
  e.nome_fantasia AS empresa,
  d.categoria,
  COUNT(d.id_despesa) AS total_despesas,
  SUM(d.valor) AS valor_total
FROM 
  despesas d
JOIN empresas e ON d.id_empresa = e.id_empresa
GROUP BY 
  e.id_empresa, d.categoria
ORDER BY 
  valor_total DESC;-- OK, mas retornando vazio

-- Relatório de Movimentação de Estoque
SELECT 
  m.id_movimentacao,
  p.nome AS produto,
  m.tipo,
  m.quantidade,
  DATE_FORMAT(m.data_prod, '%d/%m/%Y %H:%i') AS data,
  m.descricao
FROM 
  estoque_movimentacoes m
JOIN produtos p ON m.id_produto = p.id_produto
ORDER BY 
  m.data_prod DESC; -- OK, mas retornando vazio

-- Geração de Relatório Anual de Vendas por Cliente
SELECT 
  c.nome AS cliente,
  COUNT(v.id_venda) AS total_vendas,
  SUM(v.valor_total) AS total_gasto
FROM 
  vendas v
JOIN clientes c ON v.id_cliente = c.id_cliente
WHERE 
  YEAR(v.data_venda) = 2025
GROUP BY 
  c.id_cliente
ORDER BY 
  total_gasto DESC;-- OK

--  Exportação de Relatório de Produtos Vendidos (Simulação de CSV)
SELECT 
  p.nome AS produto,
  SUM(i.quantidade) AS quantidade_total,
  SUM(i.subtotal) AS valor_total
FROM 
  itens_venda i
JOIN produtos p ON i.id_produto = p.id_produto
GROUP BY 
  p.id_produto
ORDER BY 
  valor_total DESC; -- OK

-- 
ALTER TABLE vendas MODIFY valor_total DECIMAL(10,2);
ALTER TABLE itens_venda MODIFY subtotal DECIMAL(10,2);
ALTER TABLE itens_venda MODIFY preco_unitario DECIMAL(10,2);

