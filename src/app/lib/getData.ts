import axios from "axios";

export type Response = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
};

type Params = {
  page: { pageParam: number };
  per_page: number;
};
const githubApi = axios.create({
  baseURL: `https://api.github.com`,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    // "Content-Type": "application/json",
  },
});

export const fetchGithubUsers = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  try {
    const response = await githubApi.get("/users", {
      params: { since: pageParam, per_page: 20 },
    });

    if (!response) {
      throw new Error("failed Error");
    }
    return response.data;
  } catch (error) {
    console.error("API Call Error:", error);
    throw error;
  }
};
