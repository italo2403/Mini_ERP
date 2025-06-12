import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecebimentoList() {
  const [recebimentos, setRecebimentos] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/recebimentos")
      .then(res => res.json())
      .then(setRecebimentos);
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Recebimentos</h2>
        <Link to="/recebimentos/novo" className="btn btn-primary">Novo Recebimento</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Origem</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Forma Pagamento</th>
              <th>Empresa</th>
            </tr>
          </thead>
          <tbody>
            {recebimentos.map((r) => (
              <tr key={r.id_recebimento}>
                <td>{r.id_recebimento}</td>
                <td>{r.origem}</td>
                <td>R$ {Number(r.valor).toFixed(2)}</td>
                <td>{r.data_recebimento?.split("T")[0]}</td>
                <td>{r.forma_pagamento || "-"}</td>
                <td>{r.nome_empresa || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

