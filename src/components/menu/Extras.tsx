import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { formatCurrency } from "@/lib/formatters";
import { Extra } from "@prisma/client";

function Extras({
  extras,
  selectedExtras,
  setSelectedExtras,
}: {
  extras: Extra[];
  selectedExtras: Extra[];
  setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>;
}) {
  const handleExtra = (extra: Extra) => {
    if (selectedExtras.find((e) => e.id === extra.id)) {
      const filteredSelectedExtras = selectedExtras.filter(
        (item) => item.id !== extra.id
      );
      setSelectedExtras(filteredSelectedExtras);
    } else {
      setSelectedExtras((prev) => [...prev, extra]);
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      {extras.map((extra) => (
        <div
          key={extra.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <Checkbox
            id={String(extra.id)}
            checked={Boolean(selectedExtras.find((e) => e.id === extra.id))}
            onClick={() => handleExtra(extra)}
          />
          <Label
            htmlFor={String(extra.id)}
            className="text-sm text-accent font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {extra.name} {formatCurrency(extra.price)}
          </Label>
        </div>
      ))}
    </div>
  );
}

export default Extras;
