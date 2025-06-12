import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CategoriaList() {
  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/categorias_produto").then(res => res.json()).then(setCategorias);
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Categorias de Produto</h2>
        <Link to="/categorias_produto/nova" className="btn btn-primary">Nova Categoria</Link>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((c) => (
            <tr key={c.id_categoria}>
              <td>{c.id_categoria}</td>
              <td>{c.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
