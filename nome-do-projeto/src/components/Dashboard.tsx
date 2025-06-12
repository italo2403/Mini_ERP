import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dados, setDados] = useState<any>({});
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/dashboard")
      .then((res) => res.json())
      .then(setDados)
      .catch(() => setErro("Erro ao carregar o dashboard"));
  }, []);

  const entidades = Object.entries(dados);

  return (
    <div className="container py-4">
      <h2 className="mb-4">📊 Visão Geral do Sistema</h2>
      {erro && <div className="alert alert-danger">{erro}</div>}
      <div className="row g-4">
        {entidades.map(([chave, valor]) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={chave}>
            <div className="card text-center border-primary h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-capitalize">{chave.replace(/_/g, " ")}</h5>
                <p className="display-6">{String(valor)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
