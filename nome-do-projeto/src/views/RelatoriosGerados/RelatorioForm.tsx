import { useState } from "react";

export default function RelatorioForm() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("financeiro");
  const [arquivoUrl, setArquivoUrl] = useState("");

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    const relatorio = { nome, tipo, arquivo_url: arquivoUrl, data_gerado: new Date().toISOString().split("T")[0] };

    const res = await fetch("http://localhost:3000/relatorios_gerados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(relatorio),
    });

    const data = await res.json();
    alert(data.message || "Relatório salvo com sucesso");
  };

  return (
    <div className="container py-4">
      <h2>Novo Relatório Gerado</h2>
      <form onSubmit={salvar} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input className="form-control" required value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Tipo</label>
          <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="financeiro">Financeiro</option>
            <option value="vendas">Vendas</option>
            <option value="estoque">Estoque</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Link do Arquivo</label>
          <input className="form-control" required value={arquivoUrl} onChange={(e) => setArquivoUrl(e.target.value)} />
        </div>
        <div className="col-12">
          <button className="btn btn-success">Salvar</button>
        </div>
      </form>
    </div>
  );
}
