// routes/planos_assinatura.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// Rota para criar um novo plano de assinatura
router.post("/", async (req, res) => {
  const { nome, preco, duracao_dias } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO planos_assinatura (nome, preco, duracao_dias) VALUES (?, ?, ?)",
      [nome, preco, duracao_dias]
    );
    res.status(201).json({ message: "Plano de assinatura cadastrado com sucesso!", id: result.insertId });
  } catch (err) {
    console.error("Erro ao salvar plano de assinatura:", err);
    res.status(500).json({ error: "Erro ao salvar plano de assinatura." });
  }
});

// Rota para listar planos de assinatura
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM planos_assinatura");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar planos de assinatura." });
  }
});

export default router;
