import { useState } from "react";

export default function PlanoForm() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState(0);
  const [duracao, setDuracao] = useState(1);
  const [descricao, setDescricao] = useState("");

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    const plano = { nome, valor, duracao_meses: duracao, descricao };

    const res = await fetch("http://localhost:3000/planos_assinatura", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plano),
    });

    const data = await res.json();
    alert(data.message || "Plano salvo com sucesso");
  };

  return (
    <div className="container py-4">
      <h2>Novo Plano de Assinatura</h2>
      <form onSubmit={salvar} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Valor (R$)</label>
          <input type="number" step="0.01" className="form-control" value={valor} onChange={(e) => setValor(Number(e.target.value))} required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Duração (meses)</label>
          <input type="number" className="form-control" value={duracao} onChange={(e) => setDuracao(Number(e.target.value))} required />
        </div>
        <div className="col-md-12">
          <label className="form-label">Descrição</label>
          <textarea className="form-control" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">Salvar</button>
        </div>
      </form>
    </div>
  );
}
