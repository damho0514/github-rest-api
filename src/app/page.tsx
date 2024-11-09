"use client";

import React, { useEffect, useMemo } from "react";
import UserList from "./_components/UserList";
import { Skeleton } from "@radix-ui/themes";

import { fetchGithubUsers } from "./lib/getData";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function Home() {
  const { inView, ref } = useInView({
    threshold: 0.2,
  });
  const {
    data,
    hasNextPage,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchGithubUsers,
    retry: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage?.length === 0 || lastPage.length < 20
        ? undefined
        : nextPage;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <div className="font-bold text-2xl items-center flex">User List</div>
      <ScrollArea>
        <UserList data={data?.pages.flatMap((res) => res) || []} />
        {isFetchingNextPage ? <Skeleton /> : <div ref={ref} />}
      </ScrollArea>
    </main>
  );
}
