import { useEffect, useState } from "react";

export default function EstoqueMovForm() {
  const [idProduto, setIdProduto] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [quantidade, setQuantidade] = useState(0);
  const [data, setData] = useState("");
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/produtos").then(res => res.json()).then(setProdutos);
  }, []);

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    const movimento = { id_produto: Number(idProduto), tipo, quantidade, data_prod: data };
    const res = await fetch("http://localhost:3000/estoque_movimentacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movimento),
    });
    const dataRes = await res.json();
    alert(dataRes.message || "Movimentação salva!");
  };

  return (
    <div className="container py-4">
      <h2>Nova Movimentação de Estoque</h2>
      <form onSubmit={salvar} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Produto</label>
          <select className="form-select" required value={idProduto} onChange={(e) => setIdProduto(e.target.value)}>
            <option value="">Selecione...</option>
            {produtos.map((p) => (
              <option key={p.id_produto} value={p.id_produto}>{p.nome}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Tipo</label>
          <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Quantidade</label>
          <input type="number" className="form-control" value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Data</label>
          <input type="date" className="form-control" value={data} onChange={(e) => setData(e.target.value)} required />
        </div>
        <div className="col-12">
          <button className="btn btn-success">Salvar</button>
        </div>
      </form>
    </div>
  );
}
