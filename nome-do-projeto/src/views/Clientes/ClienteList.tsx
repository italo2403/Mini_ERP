import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ClienteList() {
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/consultar?query=clientes").then(res => res.json()).then(setClientes);
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Clientes</h2>
        <Link to="/clientes/novo" className="btn btn-primary">Novo Cliente</Link>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Empresa</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.nome}>
              <td>{c.nome}</td>
              <td>{c.email}</td>
              <td>{c.telefone}</td>
              <td>{c.empresa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
