"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import PickSize from "./PickSize";
import Extras from "./Extras";
import { ProductWithRelations } from "@/types/product";
import DoughType from "./DoughType";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addCartItem, selectCartItems } from "@/redux/features/cart/cartSlice";
import { Dough, DoughTypes, Extra, ProductSizes, Size } from "@prisma/client";
import { useState } from "react";
import { formatCurrency } from "@/lib/formatters";
import { getItemQuantity } from "@/lib/cart";
import ChooseQuantity from "./ChooseQuantity";

function AddToCartButton({ item }: { item: ProductWithRelations }) {
  const cart = useAppSelector(selectCartItems);
  const quantity = getItemQuantity(item.id, cart);
  const dispatch = useAppDispatch();
  const defaultSize =
    cart.find((element) => element.id === item.id)?.size ||
    item.Size.find((size) => size.name === ProductSizes.Small);

  const defaultDough =
    cart.find((element) => element.id === item.id)?.dough ||
    item.Dough.find((dough) => dough.name === DoughTypes.Pan);

  const defaultExtras =
    cart.find((element) => element.id === item.id)?.extras || [];

  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);
  const [selectedDough, setSelectedDough] = useState<Dough>(defaultDough!);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras);

  let totalPrice = item.basePrice;
  if (selectedSize) {
    totalPrice += selectedSize.price;
  }
  if (selectedDough) {
    totalPrice += selectedDough.price;
  }
  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }

  const handleAddToCart = () => {
    dispatch(
      addCartItem({
        basePrice: item.basePrice,
        id: item.id,
        image: item.image,
        name: item.name,
        size: selectedSize,
        dough: selectedDough,
        extras: selectedExtras,
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="lg"
          className="mt-4  text-white rounded-full !px-8"
        >
          <span>Add To Cart</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader className="flex items-center">
          <Image src={item.image} alt={item.name} width={200} height={200} />
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription className="text-center">
            {item.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-10">
          <div className="space-y-4 text-center">
            <Label htmlFor="pick-size">Pick your size</Label>
            <PickSize
              Sizes={item.Size}
              item={item}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>
          <div className="space-y-4 text-center">
            <Label htmlFor="dough-type">Choose the dough</Label>
            <DoughType
              types={item.Dough}
              selectedDough={selectedDough}
              setSelectedDough={setSelectedDough}
            />
          </div>
          <div className="space-y-4 text-center">
            <Label htmlFor="add-extras">Any extras?</Label>
            <Extras
              extras={item.extras}
              selectedExtras={selectedExtras}
              setSelectedExtras={setSelectedExtras}
            />
          </div>
        </div>
        <DialogFooter>
          {quantity === 0 ? (
            <Button
              type="submit"
              onClick={handleAddToCart}
              className="w-full h-10"
            >
              Add to cart {formatCurrency(totalPrice)}
            </Button>
          ) : (
            <ChooseQuantity
              quantity={quantity}
              item={item}
              selectedSize={selectedSize}
              selectedExtras={selectedExtras}
              selectedDough={selectedDough}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddToCartButton;
