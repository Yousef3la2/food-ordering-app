/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { formatCurrency } from "@/lib/formatters";

function Extras({ extras }: { extras: any }) {
  return extras.map(
    (extra: {
      id: Key | null | undefined;
      name:
        | string
        | number
        | bigint
        | boolean
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | Promise<
            | string
            | number
            | bigint
            | boolean
            | ReactPortal
            | ReactElement<unknown, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | null
            | undefined
          >
        | null
        | undefined;
      price: number;
    }) => (
      <div
        key={extra.id}
        className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
      >
        <Checkbox id={String(extra.id)} />
        <Label
          htmlFor={String(extra.id)}
          className="text-sm text-accent font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {extra.name} {formatCurrency(extra.price)}
        </Label>
      </div>
    )
  );
}

export default Extras;
