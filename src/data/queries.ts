import { gql } from "@apollo/client";

import { APIResponse, Repository, Edges } from "../types";

export const repositorySearch = gql`
  query repositorySearch(
    $query: String!
    $type: SearchType!
    $count: Int!
    $after: String
  ) {
    search(query: $query, type: $type, first: $count, after: $after) {
      repositoryCount
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
    count: number;
    after?: string;
  };
};
