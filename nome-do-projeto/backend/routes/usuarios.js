// routes/usuarios.js
import express from "express";
import db from "../db.js";

const routerUsuarios = express.Router();
// Criar novo usuário
routerUsuarios.post("/", async (req, res) => {
  const { nome, email, senha_hash, tipo_usuario} = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario) VALUES (?, ?, ?, ?)",
      [nome, email, senha_hash, tipo_usuario]
    );
    res.status(201).json({ message: "Usuário cadastrado com sucesso!", id: result.insertId });
  } catch (err) {
    console.error("Erro ao salvar usuário:", err);
    res.status(500).json({ error: "Erro ao salvar usuário." });
  }
});

// Listar usuários
routerUsuarios.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT u.*, e.nome_fantasia AS nome_empresa FROM usuarios u LEFT JOIN empresas e ON u.id_empresa = e.id_empresa");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

export default routerUsuarios;
