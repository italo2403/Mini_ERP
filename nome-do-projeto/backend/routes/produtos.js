// routes/produtos.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// Rota para criar um novo produto
router.post("/", async (req, res) => {
  const { nome, preco_venda, quantidade_estoque, id_empresa } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO produtos (nome, preco_venda, quantidade_estoque, id_empresa) VALUES (?, ?, ?, ?)",
      [nome, preco_venda, quantidade_estoque, id_empresa]
    );
    res.status(201).json({ message: "Produto cadastrado com sucesso!", id: result.insertId });
  } catch (err) {
    console.error("Erro ao salvar produto:", err);
    res.status(500).json({ error: "Erro ao salvar produto." });
  }
});

// Rota para listar produtos
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM produtos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
});

export default router;
