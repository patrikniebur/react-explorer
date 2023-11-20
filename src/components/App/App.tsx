import { useQuery } from "@apollo/client";
import { Container, Heading, VStack } from "@chakra-ui/react";

import { RepoList } from "../RepoList/RepoList";
import { QueryError } from "../QueryError/QueryError";
import { repositorySearch, RepositorySearchQuery } from "../../data/queries";

export function App() {
  const { data, loading, error } = useQuery<
    RepositorySearchQuery["data"],
    RepositorySearchQuery["variables"]
  >(repositorySearch, {
    variables: initialQueryVariables,
  });

  const repositories = data?.search.edges.map((e) => e.node) ?? [];

  return (
    <Container mt={10}>
      <VStack spacing={5}>
        <Heading>React repositories</Heading>
        {error ? (
          <QueryError error={error} />
        ) : (
          <RepoList loading={loading} repositories={repositories} />
        )}
      </VStack>
    </Container>
  );
}

export const initialQueryVariables = {
  type: "REPOSITORY" as const,
  count: 5,
  query: "React in:name,description sort:stars-desc",
};
