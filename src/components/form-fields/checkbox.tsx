import { IFormField } from "@/types/app";
import { Label } from "../ui/label";
import { Checkbox as ShadcnCheckbox } from "../ui/checkbox";

interface Props {
  onClick?: () => void;
  checked: boolean;
  label?: IFormField["label"];
  name: IFormField["name"];
}

const Checkbox = ({ label, name, checked = false, onClick }: Props) => {
  return (
    <div className="text-accent flex items-center gap-2">
      <ShadcnCheckbox
        id={name}
        name={name}
        checked={checked}
        onCheckedChange={onClick} // ✅ Change this line
      />
      <Label htmlFor={name} className="text-sm font-normal">
        {label}
      </Label>
    </div>
  );
};

export default Checkbox;
