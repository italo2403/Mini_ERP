import { useState } from "react";

export default function NotificacaoForm() {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipo, setTipo] = useState("informativa");
  const [status, setStatus] = useState("pendente");

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    const notificacao = { titulo, mensagem, tipo, status };

    const res = await fetch("http://localhost:3000/notificacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notificacao),
    });

    const data = await res.json();
    alert(data.message || "Notificação salva");
  };

  return (
    <div className="container py-4">
      <h2>Nova Notificação</h2>
      <form onSubmit={salvar} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input className="form-control" required value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Tipo</label>
          <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="informativa">Informativa</option>
            <option value="alerta">Alerta</option>
          </select>
        </div>
        <div className="col-md-12">
          <label className="form-label">Mensagem</label>
          <textarea className="form-control" required value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Status</label>
          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pendente">Pendente</option>
            <option value="lida">Lida</option>
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-success">Salvar Notificação</button>
        </div>
      </form>
    </div>
  );
}

