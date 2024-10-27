import React from "react";
import UserList from "./_components/UserList";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <div
        style={{ height: "100px" }}
        className="font-bold text-2xl items-center flex"
      >
        User List
      </div>
      <UserList />
    </main>
  );
}
