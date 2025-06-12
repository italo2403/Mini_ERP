import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DespesaList() {
  const [despesas, setDespesas] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/despesas")
      .then(res => res.json())
      .then(setDespesas);
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Despesas</h2>
        <Link to="/despesas/nova" className="btn btn-primary">Nova Despesa</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Empresa</th>
            </tr>
          </thead>
          <tbody>
            {despesas.map((d) => (
              <tr key={d.id_despesa}>
                <td>{d.id_despesa}</td>
                <td>{d.descricao}</td>
                <td>R$ {Number(d.valor).toFixed(2)}</td>
                <td>{d.data_despesa?.split("T")[0]}</td>
                <td>{d.nome_empresa || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
