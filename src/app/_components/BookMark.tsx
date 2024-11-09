"use client";

import React from "react";
import BookMarkIcon from "../assets/Icon/BookMarkIcon";
import useCartStore from "../store/cartStore";
import { GitHubUser } from "../lib/getData";

type BookMarkProps = {
  bookmark: GitHubUser;
};
function BookMark({ bookmark }: BookMarkProps) {
  const { addToCart, toggleSelectItem, selectedItemIds } = useCartStore();

  const handleClick = () => {
    addToCart(bookmark);
    toggleSelectItem(bookmark?.login); // 클릭 시 선택 상태 토글
  };

  const isSelected = selectedItemIds.includes(bookmark?.login);
  return (
    <BookMarkIcon
      className={`cursor-pointer  ${isSelected ? "text-blue-500" : "bg-transparent"}`}
      onClick={() => handleClick()}
    />
  );
}

export default BookMark;
