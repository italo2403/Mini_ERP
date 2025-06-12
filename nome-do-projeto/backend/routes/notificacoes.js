// routes/notificacoes.js
import express from "express";
import db from "../db.js";

const routerNotificacoes = express.Router();

// Criar nova notificação
routerNotificacoes.post("/", async (req, res) => {
  const { mensagem, id_usuario, data_envio } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO notificacoes (mensagem, id_usuario, data_envio) VALUES (?, ?, ?)",
      [mensagem, id_usuario, data_envio]
    );
    res.status(201).json({ message: "Notificação cadastrada com sucesso!", id: result.insertId });
  } catch (err) {
    console.error("Erro ao salvar notificação:", err);
    res.status(500).json({ error: "Erro ao salvar notificação." });
  }
});

// Listar notificações
routerNotificacoes.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM notificacoes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar notificações." });
  }
});

export default routerNotificacoes;
