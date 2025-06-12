import { useEffect, useState } from "react";

export default function ProdutoForm() {
  const [nome, setNome] = useState("");
  const [precoVenda, setPrecoVenda] = useState(0);
  const [quantidadeEstoque, setQuantidadeEstoque] = useState(0);
  const [idCategoria, setIdCategoria] = useState("");
  const [idEmpresa, setIdEmpresa] = useState("");

  const [categorias, setCategorias] = useState<any[]>([]);
  const [empresas, setEmpresas] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/categorias_produto").then(res => res.json()).then(setCategorias);
    fetch("http://localhost:3000/empresas").then(res => res.json()).then(setEmpresas);
  }, []);

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();

    const produto = {
      nome,
      preco_venda: precoVenda,
      quantidade_estoque: quantidadeEstoque,
      id_categoria: Number(idCategoria),
      id_empresa: Number(idEmpresa)
    };

    const res = await fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });

    const data = await res.json();
    alert(data.message || "Produto cadastrado com sucesso!");
  };

  return (
    <div className="container py-4">
      <h2>Novo Produto</h2>
      <form onSubmit={salvar} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input className="form-control" required value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Preço de Venda (R$)</label>
          <input type="number" className="form-control" required value={precoVenda} onChange={(e) => setPrecoVenda(Number(e.target.value))} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Estoque Inicial</label>
          <input type="number" className="form-control" required value={quantidadeEstoque} onChange={(e) => setQuantidadeEstoque(Number(e.target.value))} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Categoria</label>
          <select className="form-select" required value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
            <option value="">Selecione...</option>
            {categorias.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nome}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Empresa</label>
          <select className="form-select" required value={idEmpresa} onChange={(e) => setIdEmpresa(e.target.value)}>
            <option value="">Selecione...</option>
            {empresas.map((emp) => (
              <option key={emp.id_empresa} value={emp.id_empresa}>{emp.nome_fantasia}</option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">Salvar Produto</button>
        </div>
      </form>
    </div>
  );
}
