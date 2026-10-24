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

  const updateTarefa = async (id, isComplete) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tarefa/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isComplete }),
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

      if (!res.ok) {
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
    <div className="w-full h-full bg-[#1A251E]">
      <h1 className="text-center font-fredericka text-[#FFFFFF] text-5xl pt-12 ">
        Minhas Tarefas
      </h1>
      <div class="w-full max-w-xs mx-auto text-white">
        <svg
          viewBox="0 0 100 10"
          class="w-full h-auto stroke-current"
          fill="none"
          stroke-width="0.4"
        >
          <path d="M 0 5 Q 25 1, 50 5 T 100 5" />
        </svg>
      </div>
      <p className="font-caveat text-center text-[#F3BC8B] mt-4">
        o que fazer hoje?
      </p>
      <Input onAdicionar={adicionarTarefa} />
      <div className="flex justify-center">
        <TarefaList
          tarefas={tarefas}
          updateTarefa={updateTarefa}
          deleteTarefa={deleteTarefa}
        />
      </div>
    </div>
  );
}

export default App;
