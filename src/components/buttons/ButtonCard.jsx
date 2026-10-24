import { Pencil, Trash2 } from "lucide-react";

const variants = {
  edit: {
    icon: Pencil,
    estilo: "text-blue-700 hover:bg-blue-100",
    label: "Editar",
  },
  delete: {
    icon: Trash2,
    estilo: "text-red-700 hover:bg-red-100",
    label: "Deletar",
  },
};

const ButtonCard = ({ variant, onClick }) => {
  const { icon: Icon, estilo, label } = variants[variant];

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`p-2 rounded-lg border cursor-pointer ${estilo}`}
    >
      <Icon size={18} />
    </button>
  );
};

export default ButtonCard