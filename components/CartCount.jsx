"use client";

import { useAppSelector } from "@/lib/redux/hooks";

export default function CartCount() {
  const cartItems = useAppSelector((store) => store.cart);

  return <span>{cartItems.length}</span>;
}
