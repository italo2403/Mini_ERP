import { useEffect, useState } from "react";

export default function RecebimentoForm() {
  const [valor, setValor] = useState(0);
  const [origem, setOrigem] = useState("");
  const [data, setData] = useState("");
  const [idFormaPagamento, setIdFormaPagamento] = useState("");
  const [idEmpresa, setIdEmpresa] = useState("");

  const [formas, setFormas] = useState<any[]>([]);
  const [empresas, setEmpresas] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/formas_pagamento").then(res => res.json()).then(setFormas);
    fetch("http://localhost:3000/empresas").then(res => res.json()).then(setEmpresas);
  }, []);

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    const recebimento = {
      valor,
      origem,
      data_recebimento: data,
      id_forma_pagamento: Number(idFormaPagamento),
      id_empresa: Number(idEmpresa),
    };

    const res = await fetch("http://localhost:3000/recebimentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recebimento),
    });

    const dataRes = await res.json();
    alert(dataRes.message || "Recebimento registrado com sucesso");
  };

  return (
    <div className="container py-4">
      <h2>Novo Recebimento</h2>
      <form onSubmit={salvar} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Origem</label>
          <input className="form-control" required value={origem} onChange={(e) => setOrigem(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Valor (R$)</label>
          <input type="number" className="form-control" required value={valor} onChange={(e) => setValor(Number(e.target.value))} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Data</label>
          <input type="date" className="form-control" required value={data} onChange={(e) => setData(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Forma de Pagamento</label>
          <select className="form-select" required value={idFormaPagamento} onChange={(e) => setIdFormaPagamento(e.target.value)}>
            <option value="">Selecione...</option>
            {formas.map((f) => (
              <option key={f.id_forma_pagamento} value={f.id_forma_pagamento}>{f.descricao}</option>
            ))}
          </select>
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
          <button className="btn btn-success">Salvar Recebimento</button>
        </div>
      </form>
    </div>
  );
}
