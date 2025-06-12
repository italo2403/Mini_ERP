import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PlanoList() {
  const [planos, setPlanos] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/planos_assinatura")
      .then((res) => res.json())
      .then(setPlanos);
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Planos de Assinatura</h2>
        <Link to="/planos/novo" className="btn btn-primary">Novo Plano</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Valor</th>
              <th>Duração</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {planos.map((plano) => (
              <tr key={plano.id_plano}>
                <td>{plano.id_plano}</td>
                <td>{plano.nome}</td>
                <td>R$ {Number(plano.valor).toFixed(2)}</td>
                <td>{plano.duracao_meses} mês(es)</td>
                <td>{plano.descricao || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
