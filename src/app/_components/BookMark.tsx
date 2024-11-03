"use client";

import React, { useEffect } from "react";
import BookMarkIcon from "../assets/Icon/BookMarkIcon";
import { Response } from "../lib/getData";
import useCartStore from "../store/cartStore";

type BookMarkProps = {
  bookmark: Response;
};
function BookMark({ bookmark }: BookMarkProps) {
  const { addToCart, toggleSelectItem, selectedItemIds } = useCartStore();

  const handleClick = () => {
    addToCart(bookmark);
    toggleSelectItem(bookmark.login); // 클릭 시 선택 상태 토글
  };

  const isSelected = selectedItemIds.includes(bookmark.login);
  return (
    <BookMarkIcon
      className={`cursor-pointer  ${isSelected ? "text-blue-500" : "bg-transparent"}`}
      onClick={() => handleClick()}
    />
  );
}

export default BookMark;
