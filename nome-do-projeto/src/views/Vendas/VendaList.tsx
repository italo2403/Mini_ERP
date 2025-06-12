import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function VendaList() {
  const [vendas, setVendas] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/consultar?query=vendas")
      .then(res => res.json())
      .then(setVendas);
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Vendas Realizadas</h2>
        <Link to="/vendas/nova" className="btn btn-primary">Nova Venda</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Forma de Pagamento</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((v) => (
              <tr key={v.id_venda}>
                <td>{v.id_venda}</td>
                <td>{v.cliente}</td>
                <td>{v.forma_pagamento}</td>
                <td>R$ {Number(v.valor_total).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
