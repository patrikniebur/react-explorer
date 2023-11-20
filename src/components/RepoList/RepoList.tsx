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
            repositories.map((repo) => (
              <Tr key={repo.id}>
                <Td>
                  <Link href={repo.url} target="_blank">
                    {repo.name}
                  </Link>
                </Td>
                <Td>🌟 {repo.stargazerCount}</Td>
                <Td>🍴 {repo.forkCount}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
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
