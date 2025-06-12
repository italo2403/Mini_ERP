import { useEffect, useState } from "react";

export default function DespesaForm() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [data, setData] = useState("");
  const [idEmpresa, setIdEmpresa] = useState("");

  const [empresas, setEmpresas] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/empresas")
      .then((res) => res.json())
      .then(setEmpresas);
  }, []);

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    const despesa = {
      descricao,
      valor,
      data_despesa: data,
      id_empresa: Number(idEmpresa),
    };

    const res = await fetch("http://localhost:3000/despesas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(despesa),
    });

    const dataRes = await res.json();
    alert(dataRes.message || "Despesa salva com sucesso");
  };

  return (
    <div className="container py-4">
      <h2>Nova Despesa</h2>
      <form onSubmit={salvar} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Descrição</label>
          <input className="form-control" required value={descricao} onChange={(e) => setDescricao(e.target.value)} />
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
          <label className="form-label">Empresa</label>
          <select className="form-select" required value={idEmpresa} onChange={(e) => setIdEmpresa(e.target.value)}>
            <option value="">Selecione...</option>
            {empresas.map((e) => (
              <option key={e.id_empresa} value={e.id_empresa}>{e.nome_fantasia}</option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-success">Salvar</button>
        </div>
      </form>
    </div>
  );
}
