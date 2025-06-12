import { useEffect, useState } from "react";

export default function ItemVendaForm() {
  const [idVenda, setIdVenda] = useState("");
  const [idProduto, setIdProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [precoUnitario, setPrecoUnitario] = useState(0);
  const [mensagem, setMensagem] = useState("");

  const [vendas, setVendas] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/vendas").then(res => res.json()).then(setVendas);
    fetch("http://localhost:3000/produtos").then(res => res.json()).then(setProdutos);
  }, []);

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = precoUnitario * quantidade;

    const item = {
      id_venda: Number(idVenda),
      id_produto: Number(idProduto),
      quantidade,
      preco_unitario: precoUnitario,
      subtotal
    };

    const res = await fetch("http://localhost:3000/itens_venda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    const data = await res.json();
    setMensagem(data.message || "Item registrado com sucesso!");
  };

  return (
    <div className="container py-4">
      <h2>Adicionar Item à Venda</h2>
      <form onSubmit={salvar} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Venda</label>
          <select className="form-select" required value={idVenda} onChange={(e) => setIdVenda(e.target.value)}>
            <option value="">Selecione...</option>
            {vendas.map((v) => (
              <option key={v.id_venda} value={v.id_venda}>Venda #{v.id_venda}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Produto</label>
          <select className="form-select" required value={idProduto} onChange={(e) => setIdProduto(e.target.value)}>
            <option value="">Selecione...</option>
            {produtos.map((p) => (
              <option key={p.id_produto} value={p.id_produto}>{p.nome}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Quantidade</label>
          <input type="number" className="form-control" required value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Preço Unitário (R$)</label>
          <input type="number" className="form-control" required value={precoUnitario} onChange={(e) => setPrecoUnitario(Number(e.target.value))} />
        </div>
        <div className="col-12">
          <button className="btn btn-success">Salvar Item</button>
        </div>
        {mensagem && <div className="alert alert-info mt-3">{mensagem}</div>}
      </form>
    </div>
  );
}
