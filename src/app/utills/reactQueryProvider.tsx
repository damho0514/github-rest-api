"use client";

import {
  QueryClientProvider,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import React from "react";

export const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
