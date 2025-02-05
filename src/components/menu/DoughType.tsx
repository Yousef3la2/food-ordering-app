/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { formatCurrency } from "@/lib/formatters";
import { Dough } from "@prisma/client";

function DoughType({ types }: { types: Dough[] }) {
  return (
    <RadioGroup defaultValue="comfortable" className="grid grid-cols-2 gap-4">
      {types.map((type) => (
        <div
          key={type.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <RadioGroupItem value="default" id={type.id} />
          <Label htmlFor={type.id}>
            {type.name} {formatCurrency(type.price)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

export default DoughType;
