"use client";

import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from "@/lib/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function CartProduct({ cartItem }) {
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (cartId) => {
    dispatch(removeFromCart(cartId));
    toast.success("Items Removed Succesfully");
  };

  const handleIncrementItem = (cartId) => {
    dispatch(incrementQty(cartId));
    toast.success("Items Added Succesfully");
  };

  const handleDecrementItem = (cartId) => {
    dispatch(decrementQty(cartId));
    toast.success("Items Removed Succesfully");
  };

  return (
    <div className="flex items-center justify-between border-b border-slate-400  pb-3 font-semibold text-sm mb-4">
      <div className="flex items-center gap-3">
        <Image
          src={cartItem.image}
          width={249}
          height={249}
          alt={cartItem.title}
          className="rounded-xl w-20 h-20"
        />
        <div className="flex flex-col">
          <h2>{cartItem.title}</h2>
        </div>
      </div>
      <div className=" rounded-xl border border-gray-400 flex gap-3 items-center ">
        <button
          onClick={() => handleDecrementItem(cartItem.id)}
          className="border-r border-gray-400 py-2 px-4"
        >
          <Minus />
        </button>
        <p className="flex-grow py-2 px-4">{cartItem.qty}</p>
        <button
          onClick={() => handleIncrementItem(cartItem.id)}
          className="border-l border-gray-400 py-2 px-4"
        >
          <Plus />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <h4>${cartItem.price}</h4>
        <button onClick={() => handleRemoveFromCart(cartItem.id)}>
          <Trash2 className="text-red-600 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
