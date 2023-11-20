import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link,
} from "@chakra-ui/react";

function App() {
  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Repository</Th>
            <Th>Stars</Th>
            <Th>Forks</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Link href="#">Example repo</Link>
            </Td>
            <Td>250 🌟</Td>
            <Td>40 🍴</Td>
          </Tr>
          <Tr>
            <Td>
              <Link href="#">Example repo</Link>
            </Td>
            <Td>250 🌟</Td>
            <Td>40 🍴</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default App;
