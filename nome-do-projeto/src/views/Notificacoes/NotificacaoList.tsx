import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NotificacaoList() {
  const [notificacoes, setNotificacoes] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/notificacoes")
      .then(res => res.json())
      .then(setNotificacoes);
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Notificações</h2>
        <Link to="/notificacoes/nova" className="btn btn-primary">Nova Notificação</Link>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Tipo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {notificacoes.map((n) => (
            <tr key={n.id_notificacao}>
              <td>{n.id_notificacao}</td>
              <td>{n.titulo}</td>
              <td>{n.tipo}</td>
              <td>{n.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
