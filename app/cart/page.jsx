"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import React from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import CartProduct from "@/components/CartProduct";

export default function Cart() {
  const cartItems = useAppSelector((store) => store.cart);

  const subTotal = cartItems
    .reduce((acc, currentItem) => {
      return acc + currentItem.price * currentItem.qty;
    }, 0)
    .toFixed(2);

  const shippingCost = Number(subTotal) > 0 ? 10 : 0;
  const totalAmount = (Number(subTotal) + shippingCost).toFixed(2);

  return (
    <div className="px-4 md:px-8 lg:px-20 py-8 lg:py-16">
      <Breadcrumb />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        <div className="lg:col-span-8">
          <h2 className="py-2 mb-6 text-2xl font-bold">Your Cart</h2>

          {cartItems.length > 0 ? (
            <>
              <div className="hidden md:flex items-center justify-between border-b border-slate-400 text-slate-400 pb-3 font-semibold text-sm mb-4">
                <h2 className="uppercase">Product</h2>
                <h2 className="uppercase">Quantity</h2>
                <h2 className="uppercase">Price</h2>
              </div>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartProduct key={item.id} cartItem={item} />
                ))}
              </div>

              {/* COUPON FORM */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 py-8">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="coupon" className="sr-only">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    id="coupon"
                    name="coupon"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Coupon Code"
                    aria-label="Enter coupon code"
                  />
                </div>
                <button className="w-full sm:w-auto shrink-0 py-2.5 px-6 rounded-lg bg-lime-600 text-white hover:bg-lime-700 transition-colors">
                  Apply Coupon
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                Your cart is empty
              </p>
              <Link
                href="/"
                className="inline-block bg-lime-600 text-white rounded-lg py-2 px-6 hover:bg-lime-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-slate-800 dark:text-slate-100 p-5">
            <h2 className="text-2xl pb-3 font-bold">Cart Summary</h2>

            <div className="space-y-4 divide-y divide-slate-500">
              <div className="pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">
                    Subtotal
                  </span>
                  <span className="font-semibold">${subTotal}</span>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-slate-600 dark:text-slate-300">
                    Tax
                  </span>
                  <span className="font-semibold">$0</span>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-slate-600 dark:text-slate-300">
                    Shipping
                  </span>
                  <span className="font-semibold">${shippingCost}</span>
                </div>
              </div>

              {shippingCost > 0 && (
                <div className="py-4">
                  <p className="text-sm text-slate-400">
                    Shipping charge of $10 applies to all orders
                  </p>
                </div>
              )}

              <div className="py-4">
                <div className="flex items-center justify-between font-bold">
                  <span>Total</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
            </div>

            <Link
              href={cartItems.length > 0 ? "/checkout" : "#"}
              className={`mt-6 block w-full text-center py-3 px-4 rounded-lg transition-colors ${
                cartItems.length > 0
                  ? "bg-lime-600 text-white hover:bg-lime-700"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
              onClick={(e) => cartItems.length === 0 && e.preventDefault()}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
