import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
  fetch("http://localhost:3000/api/usuarios")
    .then(res => res.json())
    .then(setUsuarios);
}, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Usuários Cadastrados</h2>
        <Link to="/usuarios/novo" className="btn btn-primary">Novo Usuário</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Nível</th>
              <th>Empresa</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id_usuario}>
                <td>{u.id_usuario}</td>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td>{u.nivel_acesso}</td>
                <td>{u.nome_empresa || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
