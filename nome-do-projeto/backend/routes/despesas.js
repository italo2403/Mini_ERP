// routes/despesas.js
import express from "express";
import db from "../db.js";

const routerDespesas = express.Router();

// Criar nova despesa
routerDespesas.post("/", async (req, res) => {
  const { descricao, valor, data, id_empresa } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO despesas (descricao, valor, data, id_empresa) VALUES (?, ?, ?, ?)",
      [descricao, valor, data, id_empresa]
    );
    res.status(201).json({ message: "Despesa cadastrada com sucesso!", id: result.insertId });
  } catch (err) {
    console.error("Erro ao salvar despesa:", err);
    res.status(500).json({ error: "Erro ao salvar despesa." });
  }
});

// Listar despesas
routerDespesas.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM despesas");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar despesas." });
  }
});

export default routerDespesas;