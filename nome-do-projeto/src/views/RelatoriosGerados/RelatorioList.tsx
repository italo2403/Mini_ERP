import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RelatorioList() {
  const [relatorios, setRelatorios] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/relatorios_gerados")
      .then(res => res.json())
      .then(setRelatorios);
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Relatórios Gerados</h2>
        <Link to="/relatorios_gerados/novo" className="btn btn-primary">Novo Relatório</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Data</th>
              <th>Arquivo</th>
            </tr>
          </thead>
          <tbody>
            {relatorios.map((r) => (
              <tr key={r.id_relatorio}>
                <td>{r.id_relatorio}</td>
                <td>{r.nome}</td>
                <td>{r.tipo}</td>
                <td>{r.data_gerado?.split("T")[0]}</td>
                <td><a href={r.arquivo_url} target="_blank" rel="noreferrer">Baixar</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
