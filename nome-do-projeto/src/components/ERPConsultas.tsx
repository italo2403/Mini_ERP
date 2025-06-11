import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type QueryItem = {
  id: string;
  label: string;
};

const queries: QueryItem[] = [
  { id: "produtos", label: "Produtos por Empresa" },
  { id: "vendas", label: "Vendas com Cliente" },
  { id: "itens", label: "Itens de Venda" },
  { id: "clientes", label: "Clientes por Empresa" },
  { id: "dashboard", label: "Resumo por Empresa" },
  { id: "estoque", label: "Estoque Crítico" },
  { id: "financeiro", label: "Resumo Financeiro por Mês" },
  { id: "formaspag", label: "Resumo por Forma de Pagamento" },
  { id: "movestoque", label: "Movimentação de Estoque" },
  { id: "relclientes", label: "Gastos Anuais por Cliente" },
  { id: "vendidos", label: "Produtos Vendidos" },
];

export default function ERPConsultas(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [dados, setDados] = useState<any[]>([]);

  const abrirConsulta = async (id: string, label: string) => {
    setTitulo(label);
    setOpen(true);
    try {
      const res = await fetch(`http://localhost:3000/consultar?query=${id}`);
      const data = await res.json();
      setDados(data);
    } catch {
      setDados([{ Erro: "Erro ao buscar dados." }]);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Consultas ERP</h2>
      <div className="row g-3">
        {queries.map((q) => (
          <div className="col-12 col-sm-6 col-md-4" key={q.id}>
            <button
              className="btn btn-primary w-100"
              onClick={() => abrirConsulta(q.id, q.label)}
            >
              {q.label}
            </button>
          </div>
        ))}
      </div>

      {open && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{titulo}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="modal-body">
                {dados.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          {Object.keys(dados[0]).map((col) => (
                            <th key={col}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dados.map((row, i) => (
                          <tr key={i}>
                            {Object.values(row).map((val, j) => (
                              <td key={j}>{String(val)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>Nenhum dado encontrado.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setOpen(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
