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
    <div className="flex justify-center">
      <div className="absolute  w-14 h-5 mt-6 mr-90 rotate-176 bg-[#F5ECC6] opacity-80"></div>
      <div className="absolute w-14 h-5 mt-6 ml-90 rotate-4  bg-[#F5ECC6] opacity-80"></div>
    <div className="flex mt-10 justify-between border-[#F5E3CC] rounded-xs bg-[#E6CFB3] py-2 w-2xl px-6">
      <input
        onChange={(e) => setTarefa(e.target.value)}
        value={tarefa}
        type="text"
        placeholder="Escreva uma nova tarefa."
        className="w-130 outline-0 border-b font-caveat placeholder-[#836952] border-[#836952] "
      />
      <button onClick={postTarefa} className="p-1 font-semibold border-dashed border text-[#04110B] bg-[#3E2717] border-[#FFFDF5] text-xs cursor-pointer w-24 rounded-lg ">
        + Adicionar
      </button>
    </div>
    </div>
  );
};

export default Input;
