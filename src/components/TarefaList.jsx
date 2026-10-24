import Card from "./cards/Card";

const TarefaList = ({ tarefas, updateTarefa, deleteTarefa }) => {
  return (
    <div className="flex flex-wrap gap-8 justify-center p-8">
      {tarefas.map((t) => (
        <Card key={t.id} tarefa={t} onToggle={updateTarefa} onDelete={deleteTarefa} />
      ))}
    </div>
  );
};

export default TarefaList;