import ButtonCard from "../buttons/ButtonCard";


const variants = {
  yellow: "bg-[#FFF59D]",
  pink: "bg-[#F8BBD0]",
  green: "bg-[#C8E6C9]",
  blue: "bg-[#B3E5FC]",
  orange: "bg-[#FFE0B2]",
  crazy: "bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 animate-pulse mix-blend-screen filter hover:scale-125 transition-all duration-700 ease-in-out",
};

const rotacoes = ["-rotate-3", "-rotate-1", "rotate-0", "rotate-1", "rotate-2"]

const pinos = ["bg-red-500", "bg-blue-500", "bg-yellow-400", "bg-green-500"]

const variantKeys = Object.keys(variants);   // ["yellow", "pink", ...]
const escolher = (lista, id) => lista[id % lista.length];

const Card = ({ tarefa, onToggle, onDelete }) => {
  const cor = variants[escolher(variantKeys, tarefa.id)];
  console.log(cor)
  const rotacao = escolher(rotacoes, tarefa.id * 7);
  const pino = escolher(pinos, tarefa.id * 3);

  return (
    <div
      className={`relative w-48 min-h-48 p-4 pt-6 shadow-lg ${cor} ${rotacao} ${
        tarefa.isComplete ? "opacity-60" : ""
      }`}
    >

      <span
        className={`absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-md ${pino}`}
      />

      <p
        className={`font-caveat text-2xl text-[#1a2a4a] wrap-break-word ${
          tarefa.isComplete ? "line-through" : ""
        }`}
      >
        {tarefa.content}
      </p>

      <div className="absolute bottom-2 right-2 flex gap-1">
        <ButtonCard variant="edit" onClick={() => onToggle(tarefa.id, !tarefa.isComplete)} />
        <ButtonCard variant="delete" onClick={() => onDelete(tarefa.id)} />
      </div>
    </div>
  );
};

export default Card;
