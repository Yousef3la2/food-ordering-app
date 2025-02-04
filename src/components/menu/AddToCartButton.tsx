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
// import DoughType from "./DoughType";
import Extras from "./Extras";

import { ProductWithRelations } from "@/types/product";

// const types = [
//   { id: crypto.randomUUID, name: "Pan", price: 0 },
//   { id: crypto.randomUUID, name: "Thin 'n' Crispy", price: 0 },
//   { id: crypto.randomUUID, name: "Stuffed Crust", price: 7 },
//   { id: crypto.randomUUID, name: "Cheesy Bites", price: 8 },
//   { id: crypto.randomUUID, name: "Beef n Chedder Stuffed", price: 8 },
// ];

function AddToCartButton({ item }: { item: ProductWithRelations }) {
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
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
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
            <PickSize Sizes={item.Size} item={item} />
          </div>
          {/* <div className="space-y-4 text-center">
            <Label htmlFor="dough-type">Choose the dough</Label>
            <DoughType types={types} />
          </div> */}
          <div className="space-y-4 text-center">
            <Label htmlFor="add-extras">Any extras?</Label>
            <Extras extras={item.extras} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full h-10">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddToCartButton;
