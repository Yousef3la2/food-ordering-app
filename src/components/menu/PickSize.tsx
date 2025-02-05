import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { formatCurrency } from "@/lib/formatters";
import { ProductWithRelations } from "@/types/product";
import { Size } from "@prisma/client";

function PickSize({
  Sizes,
  item,
  selectedSize,
  setSelectedSize,
}: {
  Sizes: Size[];
  item: ProductWithRelations;
  selectedSize: Size;
  setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
}) {
  return (
    <RadioGroup defaultValue="-" className="grid grid-cols-2 gap-4">
      {Sizes.map((size) => (
        <div
          key={size.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4 "
        >
          <RadioGroupItem
            value={selectedSize.name}
            id={String(size.id)}
            checked={selectedSize.id === size.id}
            onClick={() => setSelectedSize(size)}
          />
          <Label htmlFor={String(size.id)}>
            {size.name} {formatCurrency(size.price + item.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

export default PickSize;
