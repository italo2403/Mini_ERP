import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function InserirVenda() {
  const [clientes, setClientes] = useState<{ id_cliente: number; nome: string }[]>([]);
  const [produtos, setProdutos] = useState<{ id_produto: number; nome: string }[]>([]);
  const [idCliente, setIdCliente] = useState("");
  const [idProduto, setIdProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/clientes")
      .then((res) => res.json())
      .then(setClientes)
      .catch(() => setMensagem("Erro ao carregar clientes."));

    fetch("http://localhost:3000/produtos")
      .then((res) => res.json())
      .then(setProdutos)
      .catch(() => setMensagem("Erro ao carregar produtos."));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("Salvando venda...");

    try {
      const res = await fetch("http://localhost:3000/vendas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_cliente: Number(idCliente),
          id_produto: Number(idProduto),
          quantidade,
        }),
      });

      const data = await res.json();
      if (res.ok) setMensagem("Venda registrada com sucesso!");
      else setMensagem("Erro: " + data.error);
    } catch {
      setMensagem("Erro ao salvar venda.");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Registrar Nova Venda</h2>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Cliente</label>
          <select
            className="form-select"
            value={idCliente}
            onChange={(e) => setIdCliente(e.target.value)}
            required
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((c) => (
              <option key={c.id_cliente} value={c.id_cliente}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Produto</label>
          <select
            className="form-select"
            value={idProduto}
            onChange={(e) => setIdProduto(e.target.value)}
            required
          >
            <option value="">Selecione um produto</option>
            {produtos.map((p) => (
              <option key={p.id_produto} value={p.id_produto}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Quantidade</label>
          <input
            type="number"
            className="form-control"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            min={1}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success">
            Salvar Venda
          </button>
        </div>

        {mensagem && <div className="alert alert-info mt-3">{mensagem}</div>}
      </form>
    </div>
  );
}
