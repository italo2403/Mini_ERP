// const express = require("express");
import express from "express";
const router = express.Router();
import db from "../db.js";

router.get("/", async (req, res) => {
  try {
    const queries = {
      usuarios: "SELECT COUNT(*) as total FROM usuarios",
      empresas: "SELECT COUNT(*) as total FROM empresas",
      clientes: "SELECT COUNT(*) as total FROM clientes",
      categorias_produto: "SELECT COUNT(*) as total FROM categorias_produto",
      produtos: "SELECT COUNT(*) as total FROM produtos",
      estoque_movimentacoes: "SELECT COUNT(*) as total FROM estoque_movimentacoes",
      formas_pagamento: "SELECT COUNT(*) as total FROM formas_pagamento",
      vendas: "SELECT COUNT(*) as total FROM vendas",
      itens_venda: "SELECT COUNT(*) as total FROM itens_venda",
      recebimentos: "SELECT COUNT(*) as total FROM recebimentos",
      despesas: "SELECT COUNT(*) as total FROM despesas",
      relatorios_gerados: "SELECT COUNT(*) as total FROM relatorios_gerados",
      notificacoes: "SELECT COUNT(*) as total FROM notificacoes",
      logs_acesso: "SELECT COUNT(*) as total FROM logs_acesso",
      assinaturas: "SELECT COUNT(*) as total FROM assinaturas",
      planos_assinatura: "SELECT COUNT(*) as total FROM planos_assinatura"
    };

    const result = {};
    for (const [chave, sql] of Object.entries(queries)) {
      const [rows] = await db.query(sql);
      result[chave] = rows[0].total;
    }

    res.json(result);
  } catch (err) {
    console.error("Erro no dashboard:", err);
    res.status(500).json({ error: "Erro ao carregar dashboard" });
  }
});

// module.exports = router;
export default router;