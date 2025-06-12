import { useState } from "react";

export default function CategoriaForm() {
  const [nome, setNome] = useState("");

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    const categoria = { nome };
    const res = await fetch("http://localhost:3000/categorias_produto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoria),
    });
    const data = await res.json();
    alert(data.message || "Categoria salva");
  };

  return (
    <div className="container py-4">
      <h2>Nova Categoria de Produto</h2>
      <form onSubmit={salvar} className="row g-3">
        <div className="col-md-8">
          <label className="form-label">Nome</label>
          <input className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="col-12">
          <button className="btn btn-success">Salvar</button>
        </div>
      </form>
    </div>
  );
}
