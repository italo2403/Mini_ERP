// routes/estoque_movimentacoes.js
import express from "express";
import db from "../db.js";

const routerEstoque = express.Router();

// Criar nova movimentação de estoque
routerEstoque.post("/", async (req, res) => {
  const { id_produto, tipo, quantidade, data_prod } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO estoque_movimentacoes (id_produto, tipo, quantidade, data_prod) VALUES (?, ?, ?, ?)",
      [id_produto, tipo, quantidade, data_prod]
    );
    res.status(201).json({ message: "Movimentação de estoque cadastrada com sucesso!", id: result.insertId });
  } catch (err) {
    console.error("Erro ao salvar movimentação:", err);
    res.status(500).json({ error: "Erro ao salvar movimentação." });
  }
});

// Listar movimentações de estoque
routerEstoque.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM estoque_movimentacoes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar movimentações." });
  }
});

export default routerEstoque;
