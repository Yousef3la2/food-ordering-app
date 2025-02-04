/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { formatCurrency } from "@/lib/formatters";
import { ProductWithRelations } from "@/types/product";
import { Size } from "@prisma/client";

function PickSize({
  Sizes,
  item,
}: {
  Sizes: Size[];
  item: ProductWithRelations;
}) {
  return (
    <RadioGroup defaultValue="comfortable">
      {Sizes.map((size) => (
        <div
          key={size.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <RadioGroupItem value={String(size.name)} id={String(size.id)} />
          <Label htmlFor={String(size.id)}>
            {size.name} {formatCurrency(size.price + item.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

export default PickSize;
