import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link,
  Skeleton,
  Spinner,
  AbsoluteCenter,
} from "@chakra-ui/react";

import { Repository } from "../../types";

type Props = {
  repositories: Repository[];
  loading?: Boolean;
};
export function RepoList({ loading, repositories }: Props) {
  const loadingWithStaleData = loading && repositories.length > 0;
  const loadingWithNoData = loading && repositories.length === 0;

  return (
    <TableContainer w="full" opacity={loadingWithStaleData ? 0.5 : 1}>
      {loadingWithStaleData && (
        <AbsoluteCenter>
          <Spinner />
        </AbsoluteCenter>
      )}
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th w="100px">Repository</Th>
            <Th>Stars</Th>
            <Th>Forks</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loadingWithNoData ? (
            <LoadingSkeleton />
          ) : (
            <RepositoriesRows repositories={repositories} />
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function RepositoriesRows({ repositories }: Pick<Props, "repositories">) {
  if (repositories.length === 0) {
    return (
      <Tr>
        <Td colSpan={3}>No repositories found</Td>
      </Tr>
    );
  }

  return (
    <>
      {repositories.map((repo) => (
        <Tr key={repo.id}>
          <Td>
            <Link href={repo.url} target="_blank" textDecor={"underline"}>
              {repo.name}
            </Link>
          </Td>
          <Td w="15%">🌟 {repo.stargazerCount.toLocaleString()}</Td>
          <Td w="15%">🍴 {repo.forkCount.toLocaleString()}</Td>
        </Tr>
      ))}
    </>
  );
}

function LoadingSkeleton() {
  return (
    <Tr>
      <Td>
        <Skeleton>Loading</Skeleton>
      </Td>
      <Td>
        <Skeleton>Loading 🌟</Skeleton>
      </Td>
      <Td>
        <Skeleton>Loading 🍴</Skeleton>
      </Td>
    </Tr>
  );
}
