import { useEffect, useState } from "react";

export default function LogList() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/logs_acesso")
      .then(res => res.json())
      .then(setLogs);
  }, []);

  return (
    <div className="container py-4">
      <h2>Logs de Acesso</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Ação</th>
              <th>IP</th>
              <th>Data/Hora</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i}>
                <td>{log.nome_usuario}</td>
                <td>{log.acao}</td>
                <td>{log.ip}</td>
                <td>{log.data_hora?.replace("T", " ").split(".")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
