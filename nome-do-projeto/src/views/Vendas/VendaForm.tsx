import { useEffect, useState } from "react";

export default function VendaForm() {
  const [idCliente, setIdCliente] = useState("");
  const [idProduto, setIdProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [mensagem, setMensagem] = useState("");

  const [clientes, setClientes] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/clientes").then(res => res.json()).then(setClientes);
    fetch("http://localhost:3000/produtos").then(res => res.json()).then(setProdutos);
  }, []);

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("Salvando...");

    const venda = { id_cliente: Number(idCliente), id_produto: Number(idProduto), quantidade };

    const res = await fetch("http://localhost:3000/vendas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(venda),
    });

    const data = await res.json();
    setMensagem(data.message || "Venda registrada com sucesso");
  };

  return (
    <div className="container py-4">
      <h2>Registrar Nova Venda</h2>
      <form onSubmit={salvar} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Cliente</label>
          <select className="form-select" required value={idCliente} onChange={(e) => setIdCliente(e.target.value)}>
            <option value="">Selecione um cliente</option>
            {clientes.map((c) => (
              <option key={c.id_cliente} value={c.id_cliente}>{c.nome}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Produto</label>
          <select className="form-select" required value={idProduto} onChange={(e) => setIdProduto(e.target.value)}>
            <option value="">Selecione um produto</option>
            {produtos.map((p) => (
              <option key={p.id_produto} value={p.id_produto}>{p.nome}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Quantidade</label>
          <input type="number" min={1} className="form-control" value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">Salvar Venda</button>
        </div>
        {mensagem && <div className="alert alert-info mt-3">{mensagem}</div>}
      </form>
    </div>
  );
}
