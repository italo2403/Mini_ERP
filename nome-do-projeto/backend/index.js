import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456", // ajuste conforme sua senha
  database: "banco_teste",
});

// Mapas de consultas SQL (para a interface de consultas)
const sqlMap = {
  produtos: `SELECT p.nome AS produto, p.preco_venda, p.quantidade_estoque, e.nome_fantasia AS empresa FROM produtos p JOIN empresas e ON p.id_empresa = e.id_empresa;`,
  vendas: `SELECT v.id_venda, c.nome AS cliente, f.descricao AS forma_pagamento, v.valor_total FROM vendas v JOIN clientes c ON v.id_cliente = c.id_cliente JOIN formas_pagamento f ON v.id_forma_pagamento = f.id_forma_pagamento;`,
  itens: `SELECT i.id_item, p.nome AS produto, i.quantidade, i.subtotal FROM itens_venda i JOIN produtos p ON i.id_produto = p.id_produto;`,
  clientes: `SELECT cl.nome, cl.email, cl.telefone, e.nome_fantasia AS empresa FROM clientes cl JOIN empresas e ON cl.id_empresa = e.id_empresa;`,
  dashboard: `SELECT e.nome_fantasia, COUNT(v.id_venda) AS total_vendas, COUNT(c.id_cliente) AS total_clientes FROM empresas e LEFT JOIN vendas v ON v.id_empresa = e.id_empresa LEFT JOIN clientes c ON c.id_empresa = e.id_empresa GROUP BY e.id_empresa;`,
  estoque: `SELECT p.nome, p.quantidade_estoque FROM produtos p WHERE p.quantidade_estoque < 10;`,
financeiro: `SELECT DATE_FORMAT(v.data_venda, '%Y-%m') AS mes, e.nome_fantasia, SUM(v.valor_total) AS total FROM vendas v JOIN empresas e ON v.id_empresa = e.id_empresa GROUP BY mes, e.nome_fantasia;`,
  formaspag: `SELECT f.descricao, COUNT(v.id_venda) AS total_vendas, SUM(v.valor_total) AS total_recebido FROM vendas v JOIN formas_pagamento f ON v.id_forma_pagamento = f.id_forma_pagamento GROUP BY f.descricao;`,
  movestoque: `SELECT p.nome, m.tipo, m.quantidade, m.data_prod FROM estoque_movimentacoes m JOIN produtos p ON m.id_produto = p.id_produto;`,
  relclientes: `SELECT c.nome, COUNT(v.id_venda) AS total_vendas, SUM(v.valor_total) AS total_gasto FROM vendas v JOIN clientes c ON v.id_cliente = c.id_cliente WHERE YEAR(v.data_venda) = 2025 GROUP BY c.id_cliente;`,
  vendidos: `SELECT p.nome, SUM(i.quantidade) AS quantidade_total, SUM(i.subtotal) AS valor_total FROM itens_venda i JOIN produtos p ON i.id_produto = p.id_produto GROUP BY p.id_produto;`,
};

// Rota genérica de consulta
app.get("/consultar", async (req, res) => {
  const { query } = req.query;

  if (!query || !sqlMap[query]) {
    return res.status(400).json({ error: "Consulta inválida." });
  }

  try {
    const [rows] = await pool.query(sqlMap[query]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao executar a consulta." });
  }
});

// Rota para listar produtos
app.get("/produtos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id_produto, nome FROM produtos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
});

// Rota para listar clientes
app.get("/clientes", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id_cliente, nome FROM clientes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar clientes." });
  }
});

// Rota para registrar uma nova venda
app.post("/vendas", async (req, res) => {
  const { id_cliente, id_produto, quantidade } = req.body;

  if (!id_cliente || !id_produto || !quantidade) {
    return res.status(400).json({ error: "Dados incompletos." });
  }

  try {
    // Buscar preço e empresa do produto
    const [produtoRows] = await pool.query("SELECT preco_venda, id_empresa FROM produtos WHERE id_produto = ?", [id_produto]);
    if (produtoRows.length === 0) return res.status(404).json({ error: "Produto não encontrado." });

    const { preco_venda, id_empresa } = produtoRows[0];
    const subtotal = preco_venda * quantidade;

    // Inserir na tabela vendas
    const [vendaResult] = await pool.query(
      "INSERT INTO vendas (id_cliente, id_empresa, data_venda, valor_total, id_forma_pagamento) VALUES (?, ?, NOW(), ?, ?)",
      [id_cliente, id_empresa, subtotal, 1] // forma_pagamento = 1 (ex: PIX)
    );

    const id_venda = vendaResult.insertId;

    // Inserir na tabela itens_venda
    await pool.query(
      "INSERT INTO itens_venda (id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (?, ?, ?, ?, ?)",
      [id_venda, id_produto, quantidade, preco_venda, subtotal]
    );

    res.status(201).json({ message: "Venda registrada com sucesso!", id_venda });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar venda no banco." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
