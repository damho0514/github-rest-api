"use client";

import { Spinner, TextField } from "@radix-ui/themes";
import React, { useCallback, useEffect, useState } from "react";
import SearchIcon from "../assets/Icon/SearchIcon";

type SearchInfputProps = {
  onChange: (v: string) => void;
  searchInput: string;
  isLoading: boolean;
};
function SearchInfput({ isLoading, searchInput, onChange }: SearchInfputProps) {
  return (
    <TextField.Root
      value={searchInput}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search the docs…"
      size="2"
      className="w-48"
    >
      <TextField.Slot>
        {isLoading ? <Spinner /> : <SearchIcon />}
      </TextField.Slot>
    </TextField.Root>
  );
}

export default SearchInfput;
