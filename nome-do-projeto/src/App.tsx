import { Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import ERPConsultas from "./components/ERPConsultas";
import InserirVenda from "./components/InserirVenda";
import Dashboard from "./components/Dashboard";

// Assinaturas
import AssinaturaList from "./views/Assinaturas/AssinaturaList";
import AssinaturaForm from "./views/Assinaturas/AssinaturaForm";

// Planos
import PlanoList from "./views/Planos/PlanoList";
import PlanoForm from "./views/Planos/PlanoForm";

// Vendas
import VendaForm from "./views/Vendas/VendaForm";
import VendaList from "./views/Vendas/VendaList";

// Produtos
import ProdutoForm from "./views/Produtos/ProdutoForm";
import ProdutoList from "./views/Produtos/ProdutoList";

// Usuários
import UsuarioForm from "./views/Usuarios/UsuarioForm";
import UsuarioList from "./views/Usuarios/UsuarioList";

// Itens de Venda
import ItemVendaForm from "./views/ItensVenda/ItemVendaForm";
import ItemVendaList from "./views/ItensVenda/ItemVendaList";

// Despesas
import DespesaForm from "./views/Despesas/DespesaForm";
import DespesaList from "./views/Despesas/DespesaList";

// Recebimentos
import RecebimentoForm from "./views/Recebimentos/RecebimentoForm";
import RecebimentoList from "./views/Recebimentos/RecebimentoList";

// Relatórios
import RelatorioForm from "./views/RelatoriosGerados/RelatorioForm";
import RelatorioList from "./views/RelatoriosGerados/RelatorioList";

// Logs
import LogList from "./views/LogsAcesso/LogList";

// Notificações
import NotificacaoForm from "./views/Notificacoes/NotificacaoForm";
import NotificacaoList from "./views/Notificacoes/NotificacaoList";

// Estoque
import EstoqueMovForm from "./views/EstoqueMovimentacoes/EstoqueMovForm";
import EstoqueMovList from "./views/EstoqueMovimentacoes/EstoqueMovList";

// Categorias
import CategoriaForm from "./views/CategoriasProduto/CategoriaForm";
import CategoriaList from "./views/CategoriasProduto/CategoriaList";

// Clientes
import ClienteForm from "./views/Clientes/ClienteForm";
import ClienteList from "./views/Clientes/ClienteList";

export default function App() {
  return (
    <div className="container py-4">
      <h1 className="mb-4">Sistema ERP</h1>

      <nav className="mb-4">
        <Link className="btn btn-outline-primary me-2" to="/">🏠 Início</Link>
        <Link className="btn btn-outline-success me-2" to="/dashboard">📊 Dashboard</Link>
        <Link className="btn btn-outline-secondary" to="/consultas">🔍 Consultas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/consultas" element={<ERPConsultas />} />
        <Route path="/inserir-venda" element={<InserirVenda />} />

        <Route path="/assinaturas" element={<AssinaturaList />} />
        <Route path="/assinaturas/nova" element={<AssinaturaForm />} />

        <Route path="/planos" element={<PlanoList />} />
        <Route path="/planos/novo" element={<PlanoForm />} />

        <Route path="/vendas" element={<VendaList />} />
        <Route path="/vendas/nova" element={<VendaForm />} />

        <Route path="/produtos" element={<ProdutoList />} />
        <Route path="/produtos/novo" element={<ProdutoForm />} />

        <Route path="/usuarios" element={<UsuarioList />} />
        <Route path="/usuarios/novo" element={<UsuarioForm />} />

        <Route path="/itens_venda" element={<ItemVendaList />} />
        <Route path="/itens_venda/novo" element={<ItemVendaForm />} />

        <Route path="/despesas" element={<DespesaList />} />
        <Route path="/despesas/nova" element={<DespesaForm />} />

        <Route path="/recebimentos" element={<RecebimentoList />} />
        <Route path="/recebimentos/novo" element={<RecebimentoForm />} />

        <Route path="/relatorios_gerados" element={<RelatorioList />} />
        <Route path="/relatorios_gerados/novo" element={<RelatorioForm />} />

        <Route path="/logs_acesso" element={<LogList />} />

        <Route path="/notificacoes" element={<NotificacaoList />} />
        <Route path="/notificacoes/nova" element={<NotificacaoForm />} />

        <Route path="/estoque_movimentacoes" element={<EstoqueMovList />} />
        <Route path="/estoque_movimentacoes/nova" element={<EstoqueMovForm />} />

        <Route path="/categorias_produto" element={<CategoriaList />} />
        <Route path="/categorias_produto/nova" element={<CategoriaForm />} />

        <Route path="/clientes" element={<ClienteList />} />
        <Route path="/clientes/novo" element={<ClienteForm />} />
      </Routes>
    </div>
  );
}
