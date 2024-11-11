import axios from "axios";
import { Octokit } from "@octokit/rest";

export type GitHubUser = {
  login: string;
  id: number;
  avatar_url: string;
  type: string;
};

export type GitHubSearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
};

// Octokit 인스턴스 생성 시, throttle 옵션 추가
const octokit = new Octokit({
  auth: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  throttle: {
    // 기본 rate limit 처리
    onRateLimit: (retryAfter, options) => {
      console.log(
        `Rate limit exceeded, retrying after ${retryAfter} seconds...`
      );
      return true; // retry를 위한 설정, true일 경우 재시도
    },
    // Secondary rate limit 처리
    onSecondaryRateLimit: (retryAfter, options) => {
      console.log(
        `Secondary rate limit exceeded, retrying after ${retryAfter} seconds...`
      );
      return true; // retry를 위한 설정, true일 경우 재시도
    },
  },
});

export const fetchGithubUsers = async ({
  pageParam,
  query,
}: {
  pageParam: number;
  query: string;
}) => {
  try {
    const response = await octokit.request(`GET /search/users`, {
      q: `${query} in:login created:>2023-01-01`,
      page: pageParam, // 페이지 번호
      per_page: 20, // 한 페이지당 항목 수
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      const retryAfter = error.response.headers["retry-after"];
      const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 3000; // `retry-after` 헤더가 있으면 그 시간만큼 기다림
      await sleep(waitTime); // 대기 후 재시도

      throw new Error("Too many attempts, rate limit exceeded.");
    } else {
      throw error; // 다른 에러 발생 시 에러를 던짐
    }
  }
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
