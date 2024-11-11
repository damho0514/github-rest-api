"use client";

import React, { Suspense } from "react";
import { Skeleton, Tabs } from "@radix-ui/themes";
import UserCard from "./_components/UserCard";
import BookmarkList from "./_components/BookMarkList";

export default function Home() {
  return (
    <>
      <Tabs.Root defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
        </Tabs.List>
        <Suspense fallback={<div>Loading...</div>}>
          <UserCard />
        </Suspense>
        <Tabs.Content value="documents">
          <BookmarkList />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}
