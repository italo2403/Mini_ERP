import { useState, useEffect } from "react";

export default function AssinaturaForm() {
  const [idCliente, setIdCliente] = useState("");
  const [idPlano, setIdPlano] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [status, setStatus] = useState("ativa");

  const [clientes, setClientes] = useState<any[]>([]);
  const [planos, setPlanos] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/clientes").then(res => res.json()).then(setClientes);
    fetch("http://localhost:3000/planos_assinatura").then(res => res.json()).then(setPlanos);
  }, []);

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    const assinatura = { id_cliente: idCliente, id_plano: idPlano, data_inicio: dataInicio, status };
    const res = await fetch("http://localhost:3000/assinaturas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(assinatura),
    });
    const data = await res.json();
    alert(data.message || "Assinatura criada com sucesso");
  };

  return (
    <div className="container">
      <h2>Nova Assinatura</h2>
      <form onSubmit={salvar} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Cliente</label>
          <select className="form-select" required value={idCliente} onChange={(e) => setIdCliente(e.target.value)}>
            <option value="">Selecione...</option>
            {clientes.map((c) => (
              <option key={c.id_cliente} value={c.id_cliente}>{c.nome}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Plano</label>
          <select className="form-select" required value={idPlano} onChange={(e) => setIdPlano(e.target.value)}>
            <option value="">Selecione...</option>
            {planos.map((p) => (
              <option key={p.id_plano} value={p.id_plano}>{p.nome}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Data de Início</label>
          <input type="date" className="form-control" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Status</label>
          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ativa">Ativa</option>
            <option value="cancelada">Cancelada</option>
            <option value="pendente">Pendente</option>
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">Salvar</button>
        </div>
      </form>
    </div>
  );
}
