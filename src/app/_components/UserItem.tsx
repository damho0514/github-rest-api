import Image from "next/image";
import React from "react";
import { GitHubUser } from "../lib/getData";
import BookMark from "./BookMark";

type UserItemProps = {
  data: GitHubUser[];
};

export default function UserItem({ data }: UserItemProps) {
  return (
    <div className="flex justify-center">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 mt-12 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors"
          >
            <div className="flex justify-between items-center mb-4">
              <Image
                src={item.avatar_url}
                alt="avatar"
                width={40}
                height={40}
                priority
                className="bg-slate-500 rounded-full"
              />
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold truncate">
                {item.login}
              </h2>
            </div>
            <div className="flex flex-col justify-start text-start">
              <p className="py-1">User ID: {item.id}</p>
              <div className="flex justify-between items-center">
                <div className="m-0 max-w-[30ch] text-sm opacity-50">
                  {item.type}
                </div>
                <BookMark bookmark={item} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
