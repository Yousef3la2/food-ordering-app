import { useAppDispatch } from "@/redux/hooks";
import { ProductWithRelations } from "@/types/product";
import { Dough, Extra, Size } from "@prisma/client";
import { removeCartItem, addCartItem } from "@/redux/features/cart/cartSlice";
import React from "react";
import { Button } from "@/components/ui/button";

// Specify return type as JSX.Element
function ChooseQuantity({
  quantity,
  item,
  selectedExtras,
  selectedSize,
  selectedDough,
}: {
  quantity: number;
  selectedExtras: Extra[];
  selectedSize: Size;
  selectedDough: Dough;
  item: ProductWithRelations;
}) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center flex-col gap-2 mt-4 w-full">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => dispatch(removeCartItem({ id: item.id }))}
        >
          -
        </Button>
        <div>
          <span className="text-black">{quantity} in cart</span>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            dispatch(
              addCartItem({
                basePrice: item.basePrice,
                id: item.id,
                image: item.image,
                name: item.name,
                extras: selectedExtras,
                size: selectedSize,
                dough: selectedDough,
              })
            )
          }
        >
          +
        </Button>
      </div>
      <Button
        size="sm"
        onClick={() => dispatch(removeCartItem({ id: item.id }))}
      >
        Remove
      </Button>
    </div>
  );
}

export default ChooseQuantity;
