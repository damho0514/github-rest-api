import {
  Box,
  Flex,
  ScrollArea,
  Skeleton,
  Spinner,
  Tabs,
} from "@radix-ui/themes";
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
    retry(failureCount, error) {
      console.log({ error });
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
    <Box pt="2">
      <ToastUI />
      <Tabs.Content value="account">
        <div className="flex  flex-col items-center justify-between p-24 ">
          <div className="font-bold text-2xl items-center flex">User List</div>
          <SearchInfput
            onChange={(v) => {
              debouncedSearch(v);
            }}
          />
          <ScrollArea>
            {isLoading ? (
              // 최초 로딩 중인 경우 스켈레톤 컴포넌트를 표시
              <SkeletonUserItem />
            ) : (
              // 로딩이 완료되면 데이터 렌더링
              <UserItem data={data?.pages?.flatMap((res) => res.items) || []} />
            )}
            <div ref={ref} />
          </ScrollArea>
          {isFetchingNextPage && (
            <Flex
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "15px",
              }}
            >
              <Spinner
                loading={true}
                style={{ width: "25px", height: "25px" }}
              />
            </Flex>
          )}
        </div>
      </Tabs.Content>
    </Box>
  );
}
