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
} from "@chakra-ui/react";

import { Repository } from "../../types";

type Props = {
  repositories: Repository[];
  loading?: Boolean;
};
export function RepoList({ loading, repositories }: Props) {
  return (
    <TableContainer w="full">
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Repository</Th>
            <Th>Stars</Th>
            <Th>Forks</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
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
            <Link href={repo.url} target="_blank">
              {repo.name}
            </Link>
          </Td>
          <Td>🌟 {repo.stargazerCount}</Td>
          <Td>🍴 {repo.forkCount}</Td>
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
