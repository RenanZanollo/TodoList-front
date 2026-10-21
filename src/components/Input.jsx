import { useState } from "react";

const Input = ({ onAdicionar }) => {
  const [tarefa, setTarefa] = useState("");

  const postTarefa = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tarefa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: tarefa }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      onAdicionar(data.tarefa)

      console.log(data);

      setTarefa("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex mt-10 justify-center">
      <input
        onChange={(e) => setTarefa(e.target.value)}
        value={tarefa}
        type="text"
        placeholder="Insira a tarefa"
        className="flex justify-center rounded-xl border pl-2"
      />
      <button onClick={postTarefa} className="p-2 border ml-3 cursor-pointer">
        Adicionar
      </button>
    </div>
  );
};

export default Input;
