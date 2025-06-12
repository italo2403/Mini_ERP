// routes/relatorios_gerados.js
import express from "express";
import db from "../db.js";

const routerRelatorios = express.Router();

// Criar novo relatório
routerRelatorios.post("/", async (req, res) => {
  const { titulo, conteudo, data_geracao } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO relatorios_gerados (titulo, conteudo, data_geracao) VALUES (?, ?, ?)",
      [titulo, conteudo, data_geracao]
    );
    res.status(201).json({ message: "Relatório gerado com sucesso!", id: result.insertId });
  } catch (err) {
    console.error("Erro ao salvar relatório:", err);
    res.status(500).json({ error: "Erro ao salvar relatório." });
  }
});

// Listar relatórios
routerRelatorios.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM relatorios_gerados");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar relatórios." });
  }
});

export default routerRelatorios;


