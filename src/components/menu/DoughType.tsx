/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { formatCurrency } from "@/lib/formatters";

function DoughType({ types }: { types: any }) {
  return (
    <RadioGroup defaultValue="comfortable">
      {sizes.map(
        (size: {
          id: React.Key | null | undefined;
          name:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
          price:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
        }) => (
          <div
            key={size.id}
            className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
          >
            <RadioGroupItem value="default" id={size.id} />
            <Label htmlFor={size.id}>
              {size.name} {formatCurrency(type.price)}
            </Label>
          </div>
        )
      )}
    </RadioGroup>
  );
}

export default DoughType;
