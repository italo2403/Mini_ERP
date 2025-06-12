import { useEffect, useState } from "react";

export default function ClienteForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idEmpresa, setIdEmpresa] = useState("");
  const [empresas, setEmpresas] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/empresas").then(res => res.json()).then(setEmpresas);
  }, []);

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    const cliente = { nome, email, telefone, id_empresa: Number(idEmpresa) };
    const res = await fetch("http://localhost:3000/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
    const data = await res.json();
    alert(data.message || "Cliente salvo com sucesso");
  };

  return (
    <div className="container py-4">
      <h2>Novo Cliente</h2>
      <form onSubmit={salvar} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input className="form-control" required value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Email</label>
          <input className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Telefone</label>
          <input className="form-control" required value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Empresa</label>
          <select className="form-select" required value={idEmpresa} onChange={(e) => setIdEmpresa(e.target.value)}>
            <option value="">Selecione...</option>
            {empresas.map((e) => (
              <option key={e.id_empresa} value={e.id_empresa}>{e.nome_fantasia}</option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-success">Salvar Cliente</button>
        </div>
      </form>
    </div>
  );
}
