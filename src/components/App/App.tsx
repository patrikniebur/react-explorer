import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Container, Heading, VStack } from "@chakra-ui/react";

import { RepoList } from "../RepoList/RepoList";
import { QueryError } from "../QueryError/QueryError";
import { Paginator } from "../Paginator/Paginator";
import { repositorySearch, RepositorySearchQuery } from "../../data/queries";

const LIST_COUNT = 10;

export function App() {
  const {
    currentOrStaleData: data,
    error,
    loading,
    pageInfo,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
  } = useRepositoryData();

  const repositories = data?.search.edges.map((e) => e.node) ?? [];

  return (
    <Container mt={10}>
      <VStack spacing={5}>
        <Heading>React repositories</Heading>
        {error ? (
          <QueryError error={error} />
        ) : (
          <>
            <RepoList loading={loading} repositories={repositories} />
            <Paginator
              loading={loading}
              totalPages={totalPages}
              currentPage={currentPage}
              nextPage={nextPage}
              prevPage={prevPage}
              {...pageInfo!}
            />
          </>
        )}
      </VStack>
    </Container>
  );
}

type PaginationState = {
  before?: string;
  after?: string;
  first?: number;
  last?: number;
};
function useRepositoryData() {
  const [paginationQuery, setPaginationQuery] = useState<PaginationState>({
    first: LIST_COUNT,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, previousData, ...restQuery } = useQuery<
    RepositorySearchQuery["data"],
    RepositorySearchQuery["variables"]
  >(repositorySearch, {
    variables: { ...initialQueryVariables, ...paginationQuery },
  });

  /* Gets new data or stale if available */
  const d = data ?? previousData;

  const pageInfo = d?.search.pageInfo;

  const totalPages = Math.floor(
    d?.search.repositoryCount ?? LIST_COUNT / LIST_COUNT,
  );

  const nextPage = () => {
    setPaginationQuery({ after: pageInfo!.endCursor, first: LIST_COUNT });
    setCurrentPage((p) => p + 1);
  };
  const prevPage = () => {
    setPaginationQuery({ before: pageInfo!.startCursor, last: LIST_COUNT });
    setCurrentPage((p) => p - 1);
  };

  return {
    currentPage,
    currentOrStaleData: d,
    totalPages,
    nextPage,
    prevPage,
    pageInfo,
    ...restQuery,
  };
}

export const initialQueryVariables = {
  type: "REPOSITORY" as const,
  query: "React in:name,description sort:stars-desc",
};
