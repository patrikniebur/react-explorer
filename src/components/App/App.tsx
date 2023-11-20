import { useQuery } from "@apollo/client";

import { RepoList } from "../RepoList/RepoList";
import { repositorySearch, RepositorySearchQuery } from "../../data/queries";

export function App() {
  const { data, loading } = useQuery<
    RepositorySearchQuery["data"],
    RepositorySearchQuery["variables"]
  >(repositorySearch, {
    variables: initialQueryVariables,
  });

  const repositories = data?.search.edges.map((e) => e.node) ?? [];

  return <RepoList loading={loading} repositories={repositories} />;
}

export const initialQueryVariables = {
  type: "REPOSITORY" as const,
  count: 5,
  query: "React in:name,description sort:stars-desc",
}
