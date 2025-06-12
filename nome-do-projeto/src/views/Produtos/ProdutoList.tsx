import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProdutoList() {
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/consultar?query=produtos")
      .then(res => res.json())
      .then(setProdutos);
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Produtos Cadastrados</h2>
        <Link to="/produtos/novo" className="btn btn-primary">Novo Produto</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Empresa</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id_produto}>
                <td>{p.id_produto}</td>
                <td>{p.produto}</td>
                <td>R$ {Number(p.preco_venda).toFixed(2)}</td>
                <td>{p.quantidade_estoque}</td>
                <td>{p.empresa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
