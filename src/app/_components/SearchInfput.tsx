"use client";

import { TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SearchIcon from "../assets/Icon/SearchIcon";

type SearchInputProps = {
  onChange: (v: string) => void;
};

function SearchInput({ onChange }: SearchInputProps) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="flex justify-center mt-4  lg:mt-12  w-full px-4">
      <TextField.Root
        value={searchInput}
        onChange={(e) => {
          const value = e.target.value;
          onChange(value);
          setSearchInput(value);
        }}
        placeholder="Search users..."
        size="2"
        className="w-full max-w-xs sm:max-w-64 md:max-w-xl lg:max-w-full xl:max-w-5xl  border border-gray-300 rounded-lg shadow-md focus-within:border-blue-500"
      >
        <TextField.Slot>
          <SearchIcon />
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
}

export default SearchInput;
