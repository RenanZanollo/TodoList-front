import { useEffect, useState } from "react";
import Input from "./components/Input.jsx";
import TarefaList from "./components/TarefaList.jsx";

function App() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    let ignore = false;

    const getTarefas = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tarefa");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        if (!ignore) setTarefas(data);
      } catch (error) {
        console.error(error);
      }
    };

    getTarefas();
    return () => {
      ignore = true;
    };
  }, []);

  const adicionarTarefa = (novaTarefa) => {
    setTarefas((prev) => [...prev, novaTarefa]);
  };

  return (
    <>
      <Input onAdicionar={adicionarTarefa} />
      <div className="flex justify-center">
      <TarefaList tarefas={tarefas} />
      </div>
    </>
  );
}

export default App;
