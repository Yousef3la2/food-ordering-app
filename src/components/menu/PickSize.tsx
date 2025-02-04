/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { formatCurrency } from "@/lib/formatters";

function PickSize({ sizes, item }: { sizes: any; item: any }) {
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
            <RadioGroupItem value={String(size.name)} id={String(size.id)} />
            <Label htmlFor={String(size.id)}>
              {size.name} {formatCurrency(size.price + item.baseprice)}
            </Label>
          </div>
        )
      )}
    </RadioGroup>
  );
}

export default PickSize;
