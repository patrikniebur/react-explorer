import { gql } from "@apollo/client";

import { APIResponse, Repository, Edges } from "../types";

export const repositorySearch = gql`
  query repositorySearch(
    $query: String!
    $type: SearchType!
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    search(
      query: $query
      type: $type
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      repositoryCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          __typename
          ... on Repository {
            __typename
            name
            id
            forkCount
            stargazerCount
            url
          }
        }
      }
    }
  }
`;

export type RepositorySearchQuery = {
  data: APIResponse<"search", { repositoryCount: number } & Edges<Repository>>;
  variables: {
    query: string;
    type: "REPOSITORY" | "USER" | "ISSUE";
    first?: number;
    last?: number;
    after?: string;
    before?: string;
  };
};
