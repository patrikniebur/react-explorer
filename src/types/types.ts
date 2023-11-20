export type APIResponse<TKey extends string, data> = Record<TKey, data>;

export type Edges<T> = {
  pageInfo: {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  edges: {
    cursor: string;
    node: T;
  }[];
};

export type Repository = {
  __typename: "Repository";
  id: string;
  name: string;
  forkCount: number;
  stargazerCount: number;
  url: string;
};
