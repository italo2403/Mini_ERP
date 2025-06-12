import { Link } from "react-router-dom";

const links = [
  { to: "/usuarios", label: "Usuários" },
  { to: "/clientes", label: "Clientes" },
  { to: "/produtos", label: "Produtos" },
  { to: "/categorias_produto", label: "Categorias de Produto" },
  { to: "/vendas", label: "Vendas" },
  { to: "/itens_venda", label: "Itens de Venda" },
  { to: "/assinaturas", label: "Assinaturas" },
  { to: "/planos", label: "Planos de Assinatura" },
  { to: "/recebimentos", label: "Recebimentos" },
  { to: "/despesas", label: "Despesas" },
  { to: "/estoque_movimentacoes", label: "Movimentações de Estoque" },
  { to: "/relatorios_gerados", label: "Relatórios Gerados" },
  { to: "/notificacoes", label: "Notificações" },
  { to: "/logs_acesso", label: "Logs de Acesso" },
];

export default function Home() {
  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">📋 Menu Principal</h1>
      <div className="row g-4">
        {links.map((link, i) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
            <Link to={link.to} className="btn btn-outline-primary w-100">
              {link.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
