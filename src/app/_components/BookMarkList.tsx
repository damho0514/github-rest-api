"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import useCartStore from "../store/cartStore";

const BookmarkList = () => {
  const { items, loadCart } = useCartStore();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <div>
      <h2>북마크 목록</h2>
      <ul>
        {items.map((product) => (
          <li
            key={product.id}
            className="flex py-4 gap-4 items-center border-b-grey-600 border-b-2 justify-between"
          >
            <Image
              className="w-16 sm:w-20 md:w-24"
              src={product.avatar_url}
              alt={product.login}
              width={80}
              height={80}
            />
            <h1 className="font-medium">{product.id}</h1>
            <div className="flex gap-2 justify-center items-center bg-black/10 px-2 rounded-sm">
              <div>{product.login}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkList;
