/* eslint-disable @typescript-eslint/no-explicit-any */
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

const sizes = [
  { id: crypto.randomUUID, name: "Small", price: 0 },
  { id: crypto.randomUUID, name: "Meduim", price: 4 },
  { id: crypto.randomUUID, name: "Large", price: 8 },
];

// const types = [
//   { id: crypto.randomUUID, name: "Pan", price: 0 },
//   { id: crypto.randomUUID, name: "Thin 'n' Crispy", price: 0 },
//   { id: crypto.randomUUID, name: "Stuffed Crust", price: 7 },
//   { id: crypto.randomUUID, name: "Cheesy Bites", price: 8 },
//   { id: crypto.randomUUID, name: "Beef n Chedder Stuffed", price: 8 },
// ];

const extras = [
  { id: crypto.randomUUID, name: "Cheese", price: 48 },
  { id: crypto.randomUUID, name: "Green Pepper", price: 25 },
  { id: crypto.randomUUID, name: "Garlic", price: 25 },
  { id: crypto.randomUUID, name: "Tomato", price: 25 },
  //   { id: crypto.randomUUID, name: "Black Olives", price: 30 },
  //   { id: crypto.randomUUID, name: "Mushroom", price: 30 },
  //   { id: crypto.randomUUID, name: "Onion", price: 25 },
];

function AddToCartButton({ item }: { item: any }) {
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
            <PickSize sizes={sizes} item={item} />
          </div>
          {/* <div className="space-y-4 text-center">
            <Label htmlFor="dough-type">Choose the dough</Label>
            <DoughType types={types} />
          </div> */}
          <div className="space-y-4 text-center">
            <Label htmlFor="add-extras">Any extras?</Label>
            <Extras extras={extras} />
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
