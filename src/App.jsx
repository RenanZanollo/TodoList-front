import { useEffect, useState } from "react";
import Input from "./components/Input.jsx";
import TarefaList from "./components/TarefaList.jsx";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const updateTarefa = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tarefa/${id}`, {
        method: "PATCH",
      });

      const data = await res.json();

      console.log(res);
      if (!res.ok) {
        throw new Error(data.message);
      }
      setTarefas((prev) => prev.map((t) => (t.id === id ? data.tarefa : t)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTarefa = async (id) => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:3000/api/tarefa/${id}`, {
        method: "DELETE",
      });

      if (!res) {
        const data = await res.json();
        throw new Error(data.message);
      }

      setTarefas((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Input onAdicionar={adicionarTarefa} />
      <div className="flex justify-center">
        <TarefaList
          tarefas={tarefas}
          updateTarefa={updateTarefa}
          deleteTarefa={deleteTarefa}
        />
      </div>
    </>
  );
}

export default App;
