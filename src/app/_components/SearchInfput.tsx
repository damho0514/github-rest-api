"use client";

import { TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SearchIcon from "../assets/Icon/SearchIcon";

type SearchInfputProps = {
  onChange: (v: string) => void;
};
function SearchInfput({ onChange }: SearchInfputProps) {
  const [searchInput, setSearchInput] = useState("");
  return (
    <TextField.Root
      value={searchInput}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search the docs…"
      size="2"
      className="w-48"
    >
      <TextField.Slot>
        <SearchIcon />
      </TextField.Slot>
    </TextField.Root>
  );
}

export default SearchInfput;
