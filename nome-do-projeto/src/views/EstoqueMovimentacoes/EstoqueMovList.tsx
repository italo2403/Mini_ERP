import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EstoqueMovList() {
  const [movs, setMovs] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/consultar?query=movestoque")
      .then(res => res.json())
      .then(setMovs);
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Movimentações de Estoque</h2>
        <Link to="/estoque_movimentacoes/nova" className="btn btn-primary">Nova Movimentação</Link>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {movs.map((m, i) => (
            <tr key={i}>
              <td>{m.nome}</td>
              <td>{m.tipo}</td>
              <td>{m.quantidade}</td>
              <td>{m.data_prod?.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
