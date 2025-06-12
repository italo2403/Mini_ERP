// routes/vendas.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// Rota para registrar uma nova venda
router.post("/", async (req, res) => {
  const { id_cliente, id_produto, quantidade } = req.body;

  if (!id_cliente || !id_produto || !quantidade) {
    return res.status(400).json({ error: "Dados incompletos." });
  }

  try {
    // Buscar preço e empresa do produto
    const [produtoRows] = await db.query("SELECT preco_venda, id_empresa FROM produtos WHERE id_produto = ?", [id_produto]);
    if (produtoRows.length === 0) return res.status(404).json({ error: "Produto não encontrado." });

    const { preco_venda, id_empresa } = produtoRows[0];
    const subtotal = preco_venda * quantidade;

    // Inserir na tabela vendas
    const [vendaResult] = await db.query(
      "INSERT INTO vendas (id_cliente, id_empresa, data_venda, valor_total, id_forma_pagamento) VALUES (?, ?, NOW(), ?, ?)",
      [id_cliente, id_empresa, subtotal, 1] // forma_pagamento = 1 (ex: PIX)
    );

    const id_venda = vendaResult.insertId;

    // Inserir na tabela itens_venda
    await db.query(
      "INSERT INTO itens_venda (id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (?, ?, ?, ?, ?)",
      [id_venda, id_produto, quantidade, preco_venda, subtotal]
    );

    res.status(201).json({ message: "Venda registrada com sucesso!", id_venda });
  } catch (error) {
    console.error("Erro ao salvar venda:", error);
    res.status(500).json({ error: "Erro ao salvar venda." });
  }
});

// Rota para listar vendas
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM vendas");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar vendas." });
  }
});

export default router;