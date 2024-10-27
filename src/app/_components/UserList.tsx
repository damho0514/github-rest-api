import Image from "next/image";

import React from "react";

export type Owner = {
  avatar_url: string;
  login: string;
};

export type Repository = {
  id: number;
  name: string;
  description: string;
  owner: Owner;
};

const data: Repository[] = [
  {
    id: 1,
    owner: {
      login: "test",
      avatar_url: "apt",
    },
    name: "test",
    description: "aaa",
  },
  {
    id: 2,
    owner: {
      login: "test",
      avatar_url: "apt",
    },
    name: "test",
    description: "aaa",
  },
  {
    id: 3,
    owner: {
      login: "test",
      avatar_url: "apt",
    },
    name: "test",
    description: "aaa",
  },
  {
    id: 4,
    owner: {
      login: "test",
      avatar_url: "apt",
    },
    name: "test",
    description: "aaa",
  },
  {
    id: 5,
    owner: {
      login: "test",
      avatar_url: "apt",
    },
    name: "test",
    description: "aaa",
  },
  {
    id: 5,
    owner: {
      login: "test",
      avatar_url: "apt",
    },
    name: "test",
    description: "aaa",
  },
  {
    id: 5,
    owner: {
      login: "test",
      avatar_url: "apt",
    },
    name: "test",
    description: "aaa",
  },
  {
    id: 5,
    owner: {
      login: "test",
      avatar_url: "apt",
    },
    name: "test",
    description: "aaa",
  },
];
export default function UserList() {
  return (
    <div className="flex justify-center">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 mt-12 gap-4  grid-cols-4">
        {data.map((repo: Repository) => (
          <div
            key={repo.id}
            className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors"
          >
            <div className="flex justify-between items-center mb-4">
              <Image
                src=""
                alt="avatar"
                width={40}
                height={40}
                priority
                className="bg-slate-500 rounded-full"
              />
              <h2 className="text-md font-semibold">{repo.owner.login}</h2>
            </div>
            <div className="flex flex-col justify-start text-start">
              <p className="py-1">repo name: {repo.name}</p>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                {repo.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
