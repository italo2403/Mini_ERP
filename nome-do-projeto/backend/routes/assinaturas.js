// routes/usuarios.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// Rota para criar um novo cliente
router.post("/", async (req, res) => {
  const { nome, email, telefone, id_empresa } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO clientes (nome, email, telefone, id_empresa) VALUES (?, ?, ?, ?)",
      [nome, email, telefone, id_empresa]
    );
    res.status(201).json({ message: "Cliente cadastrado com sucesso!", id: result.insertId });
  } catch (err) {
    console.error("Erro ao salvar cliente:", err);
    res.status(500).json({ error: "Erro ao salvar cliente." });
  }
});

// Rota para listar clientes
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM clientes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar clientes." });
  }
});

export default router;