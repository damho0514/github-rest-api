"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import UserList from "./_components/UserList";
import { Box, Button, Skeleton, Tabs } from "@radix-ui/themes";

import { fetchGithubUsers, GitHubSearchResponse } from "./lib/getData";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import BookmarkList from "./_components/BookMarkList";
import SearchInfput from "./_components/SearchInfput";
import debounce from "lodash/debounce";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState<string | undefined>("");
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
    queryKey: ["users", query],
    queryFn: ({ pageParam = 1 }) =>
      fetchGithubUsers({
        pageParam,
        query: query || "type:user",
      }),
    retry: 2, // 요청 실패 시 최대 2회 재시도
    refetchOnMount: false, // 페이지 로드 시 리패치 방지
    refetchOnReconnect: false, // 네트워크 재연결 시 리패치 방지
    refetchOnWindowFocus: false, // 창 포커스 시 리패치 방지
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선하게 유지
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.items.length === 0 ? null : nextPage;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setQuery(value);
    }, 500),
    []
  );

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
    debouncedSearch(value);
  };

  return (
    <>
      <Tabs.Root defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
        </Tabs.List>
        <Box pt="2">
          <Tabs.Content value="account">
            <div className="flex  flex-col items-center justify-between p-24 ">
              <div className="font-bold text-2xl items-center flex">
                User List
              </div>
              <SearchInfput
                isLoading={isLoading}
                onChange={handleSearchInputChange}
                searchInput={searchInput}
              />
              <ScrollArea>
                <UserList
                  data={data?.pages?.flatMap((res) => res.items) || []}
                />
                {isFetchingNextPage ? <Skeleton /> : <div ref={ref} />}
              </ScrollArea>
            </div>
          </Tabs.Content>
          <Tabs.Content value="documents">
            <BookmarkList />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </>
  );
}
