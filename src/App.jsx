import "./App.css";
import { Header } from "./components/Header";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <main className="section">
          <Dashboard />
        </main>
      </div>
    </>
  );
}

export default App;
