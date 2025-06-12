import {  useState } from "react";

export default function UsuarioForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha_hash, setSenha] = useState("");
  const [tipo_usuario, setNivelAcesso] = useState("comum");
  // const [idEmpresa, setIdEmpresa] = useState("");

  // const [empresas, setEmpresas] = useState<any[]>([]);

  // useEffect(() => {
  //   fetch("http://localhost:3000/empresas").then(res => res.json()).then(setEmpresas);
  // }, []);

const salvar = async (e: React.FormEvent) => {
  e.preventDefault();
  const usuario = { nome, email, senha_hash, nivel_acesso: tipo_usuario };
// id_empresa: Number(idEmpresa)
  try {
    const res = await fetch("http://localhost:3000/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Erro ao cadastrar usuário.");
    }

    alert(data.message || "Usuário cadastrado com sucesso!");
  } catch (error: any) {
    alert("Erro: " + error.message);
  }
};

  return (
    <div className="container py-4">
      <h2>Novo Usuário</h2>
      <form onSubmit={salvar} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input className="form-control" required value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Senha</label>
          <input type="password" className="form-control" required value={senha_hash} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Nível de Acesso</label>
          <select className="form-select" value={tipo_usuario} onChange={(e) => setNivelAcesso(e.target.value)}>
            <option value="comum">Comum</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        {/* <div className="col-md-3">
          <label className="form-label">Empresa</label>
          <select className="form-select"  value={idEmpresa} onChange={(e) => setIdEmpresa(e.target.value)}>
            <option value="">Selecione...</option>
            {empresas.map((e) => (
              <option key={e.id_empresa} value={e.id_empresa}>{e.nome_fantasia}</option>
            ))}
          </select>
        </div> */}
        <div className="col-12">
          <button type="submit" className="btn btn-success">Salvar Usuário</button>
        </div>
      </form>
    </div>
  );
}
