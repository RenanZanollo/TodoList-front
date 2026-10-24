import ButtonCard from "./buttons/ButtonCard";

const TarefaList = ({ tarefas, updateTarefa, deleteTarefa }) => {
  console.log(tarefas);
  return (
    <div className="p-4">
        {tarefas.map((t) => {
          return(
            <div  key={t.id} className="flex p-4 ">
            <div className="flex border p-4 rounded-lg">
          <div className="border p-4">{t.content}</div>
          <div className={`flex ml-4 justify-center items-center border px-1 text-xs rounded-full ${t.isComplete ? "text-blue-700" : "text-red-700"}`}>
            {t.isComplete ? "Completo" : "Em progresso"}
          </div>
          </div>
          <ButtonCard variant="edit"   onClick={() => updateTarefa(t.id)} />
          <ButtonCard variant="delete" onClick={() => deleteTarefa(t.id)} />
          </div>
          )})}
    </div>
  )};

export default TarefaList;
