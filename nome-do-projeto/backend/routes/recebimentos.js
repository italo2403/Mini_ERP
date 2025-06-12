// routes/recebimentos.js
import express from "express";
import db from "../db.js";

const routerRecebimentos = express.Router();

// Criar novo recebimento
routerRecebimentos.post("/", async (req, res) => {
  const { id_venda, valor_recebido, data_recebimento } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO recebimentos (id_venda, valor_recebido, data_recebimento) VALUES (?, ?, ?)",
      [id_venda, valor_recebido, data_recebimento]
    );
    res.status(201).json({ message: "Recebimento registrado com sucesso!", id: result.insertId });
  } catch (err) {
    console.error("Erro ao salvar recebimento:", err);
    res.status(500).json({ error: "Erro ao salvar recebimento." });
  }
});

// Listar recebimentos
routerRecebimentos.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM recebimentos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar recebimentos." });
  }
});

export default routerRecebimentos;