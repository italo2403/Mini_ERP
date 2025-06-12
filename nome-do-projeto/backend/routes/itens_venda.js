// routes/itens_venda.js
import express from "express";
import db from "../db.js";

const routerItensVenda = express.Router();

// Criar item de venda
routerItensVenda.post("/", async (req, res) => {
  const { id_venda, id_produto, quantidade, preco_unitario, subtotal } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO itens_venda (id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (?, ?, ?, ?, ?)",
      [id_venda, id_produto, quantidade, preco_unitario, subtotal]
    );
    res.status(201).json({ message: "Item de venda cadastrado com sucesso!", id: result.insertId });
  } catch (err) {
    console.error("Erro ao salvar item de venda:", err);
    res.status(500).json({ error: "Erro ao salvar item de venda." });
  }
});

// Listar itens de venda
routerItensVenda.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM itens_venda");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar itens de venda." });
  }
});

export default routerItensVenda;
