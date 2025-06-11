import { Routes, Route, Link } from "react-router-dom";
import ERPConsultas from "./components/ERPConsultas";
import InserirVenda from "./components/InserirVenda";

function App() {
  return (
    <div className="container py-4">
      <h1 className="mb-4">Sistema ERP</h1>
      <nav className="mb-4">
        <Link className="btn btn-outline-primary me-2" to="/">📊 Dashboard</Link>
        <Link className="btn btn-outline-success" to="/vendas">📝 Inserir Venda</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ERPConsultas />} />
        <Route path="/vendas" element={<InserirVenda />} />
      </Routes>
    </div>
  );
}

export default App;
