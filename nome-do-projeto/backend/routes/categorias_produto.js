// routes/categorias_produto.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// Criar nova categoria de produto
router.post("/", async (req, res) => {
  const { nome } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO categorias_produto (nome) VALUES (?)",
      [nome]
    );
    res.status(201).json({ message: "Categoria cadastrada com sucesso!", id: result.insertId });
  } catch (err) {
    console.error("Erro ao salvar categoria:", err);
    res.status(500).json({ error: "Erro ao salvar categoria." });
  }
});

// Listar categorias
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categorias_produto");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar categorias." });
  }
});

export default router;