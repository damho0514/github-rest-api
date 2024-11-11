import { Flex, ScrollArea, Spinner, Tabs } from "@radix-ui/themes";
import * as Toggle from "@radix-ui/react-toggle";
import React, { useCallback, useEffect, useState } from "react";
import SearchInfput from "./SearchInfput";
import UserItem from "./UserItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchGithubUsers } from "../lib/getData";
import { useInView } from "react-intersection-observer";
import debounce from "lodash/debounce";
import SkeletonUserItem from "./SkeletonUserItem";
import ToastUI from "./ToastUI";
import { useToastStore } from "../store/toastStore";

export default function UserCard() {
  const { showToast } = useToastStore();
  const [query, setQuery] = useState<string | undefined>("");
  const [userType, setUserType] = useState<"User" | "Organization" | "">("");
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
    queryKey: ["users", query, userType],
    queryFn: ({ pageParam = 1 }) =>
      fetchGithubUsers({
        pageParam,
        query: `${query}${userType}`,
      }),
    retry(failureCount, error) {
      if (error) {
        showToast("error", error.message);
        return false;
      }
      return true;
    },
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
    if (inView && hasNextPage) fetchNextPage();
  }, [hasNextPage, inView]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setQuery(value);
    }, 500),
    []
  );

  return (
    <>
      <ToastUI />
      <Tabs.Content value="account">
        <div className="flex  flex-col items-center justify-between p-24 ">
          <div className="font-bold text-2xl items-center flex">User List</div>
          <SearchInfput
            onChange={(v) => {
              debouncedSearch(v);
            }}
          />
          <Flex className="items-center gap-3">
            <div>User Type:</div>
            <Toggle.Root
              pressed={userType === "User"}
              onPressedChange={(e) => setUserType(e ? "User" : "")}
              aria-label="Toggle italic"
              className="flex  items-center justify-center rounded bg-white leading-4 text-mauve11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=on]:bg-violet6 data-[state=on]:text-violet12"
            >
              User
            </Toggle.Root>
            <Toggle.Root
              pressed={userType === "Organization"}
              onPressedChange={(pressed) =>
                setUserType(pressed ? "Organization" : "")
              }
              aria-label="Toggle italic"
              className="flex items-center justify-center rounded bg-white leading-4 text-mauve11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=on]:bg-violet6 data-[state=on]:text-violet12"
            >
              Organizer
            </Toggle.Root>
          </Flex>

          <ScrollArea>
            {isLoading ? (
              <SkeletonUserItem />
            ) : (
              <UserItem data={data?.pages?.flatMap((res) => res.items) || []} />
            )}
            <div ref={ref} />
          </ScrollArea>
          {isFetchingNextPage && (
            <Flex className="flex justify-center p-[15px]">
              <Spinner className="w-6 h-6" />
            </Flex>
          )}
        </div>
      </Tabs.Content>
    </>
  );
}
