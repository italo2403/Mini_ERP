import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ItemVendaList() {
  const [itens, setItens] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/consultar?query=itens")
      .then(res => res.json())
      .then(setItens);
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Itens de Venda</h2>
        <Link to="/itens_venda/novo" className="btn btn-primary">Adicionar Item</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((i) => (
              <tr key={i.id_item}>
                <td>{i.id_item}</td>
                <td>{i.produto}</td>
                <td>{i.quantidade}</td>
                <td>R$ {Number(i.subtotal).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
