// index.js (organizado e corrigido)
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

// Importações de rotas
import Dashboard from "./routes/dashboard.js";
import Assinatura from "./routes/assinaturas.js";
import Planos_assinatura from "./routes/planos_assinatura.js";
import Vendas from "./routes/vendas.js";
import Produtos from "./routes/produtos.js";
import Usuarios from "./routes/usuarios.js";
import Clientes from "./routes/clientes.js";
import Categoria_Produtos from "./routes/categorias_produto.js";
import Estoque_Movimentacoes from "./routes/estoque_movimentacoes.js";
import Notificacoes from "./routes/notificacoes.js";
import Relatorios_Gerados from "./routes/relatorios_gerados.js";
import Recebimentos from "./routes/recebimentos.js";
import Despesas from "./routes/despesas.js";
import Intens_Venda from "./routes/itens_venda.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "banco_teste",
});

// Registro das rotas
app.use("/api/dashboard", Dashboard);
app.use("/api/usuarios", Usuarios);
app.use("/api/clientes", Clientes);
app.use("/api/produtos", Produtos);
app.use("/api/vendas", Vendas);
app.use("/api/planos_assinatura", Planos_assinatura);
app.use("/api/assinaturas", Assinatura);
app.use("/api/despesas", Despesas);
app.use("/api/recebimentos", Recebimentos);
app.use("/api/estoque_movimentacoes", Estoque_Movimentacoes);
app.use("/api/categorias_produto", Categoria_Produtos);
app.use("/api/notificacoes", Notificacoes);
app.use("/api/relatorios_gerados", Relatorios_Gerados);
app.use("/api/itens_venda", Intens_Venda);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
