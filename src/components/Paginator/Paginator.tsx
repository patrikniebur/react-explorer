import { HStack, Text, Button } from "@chakra-ui/react";

type Props = {
  currentPage: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  loading?: boolean;
};

export function Paginator({
  currentPage,
  totalPages,
  prevPage,
  nextPage,
  hasPreviousPage,
  hasNextPage,
  loading,
}: Props) {

  return (
    <HStack w="full" justifyContent="space-between">
      <Button
        onClick={prevPage}
        aria-label="Previous Page"
        isDisabled={!hasPreviousPage || loading}
      >
        👈
      </Button>
      <Text>
        {/* total repositories was getting different response on every page */}
        Page {currentPage} out of {totalPages > 100_000 ? 'many' : totalPages}
      </Text>
      <Button
        onClick={nextPage}
        aria-label="Next Page"
        isDisabled={!hasNextPage || loading}
      >
        👉
      </Button>
    </HStack>
  );
}
