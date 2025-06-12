import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AssinaturaList() {
  const [assinaturas, setAssinaturas] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/assinaturas")
      .then((res) => res.json())
      .then(setAssinaturas);
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Assinaturas</h2>
        <Link to="/assinaturas/nova" className="btn btn-primary">Nova Assinatura</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Plano</th>
              <th>Data Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {assinaturas.map((a) => (
              <tr key={a.id_assinatura}>
                <td>{a.id_assinatura}</td>
                <td>{a.nome_cliente}</td>
                <td>{a.nome_plano}</td>
                <td>{a.data_inicio?.split("T")[0]}</td>
                <td>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
