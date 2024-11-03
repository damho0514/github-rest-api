import Image from "next/image";
import React from "react";
import { Response } from "../lib/getData";
import BookMarkIcon from "../assets/Icon/BookMarkIcon";
import BookMark from "./BookMark";

type UserListProps = {
  data: Response[];
};
export default function UserList({ data }: UserListProps) {
  return (
    <>
      <div className="flex justify-center">
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 mt-12 gap-4  grid-cols-4">
          {data.map((res, idx) => (
            <div
              key={idx}
              className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors"
            >
              <div className="flex justify-between items-center mb-4">
                <Image
                  src={res.avatar_url}
                  alt="avatar"
                  width={40}
                  height={40}
                  priority
                  className="bg-slate-500 rounded-full"
                />
                <h2 className="text-md font-semibold">{res.login}</h2>
              </div>
              <div className="flex flex-col justify-start text-start">
                <p className="py-1">User ID: {res.id}</p>
                <div className="flex justify-between items-center">
                  <div className="m-0 max-w-[30ch] text-sm opacity-50">
                    {res.type}
                  </div>
                  <BookMark bookmark={res} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1>북마크 목록</h1>
      </div>
    </>
  );
}
