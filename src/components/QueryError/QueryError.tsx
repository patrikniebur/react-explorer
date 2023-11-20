import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
} from "@chakra-ui/react";
import { ApolloError } from "@apollo/client";

import { ErrorCodes } from "../../types";

type Props = {
  error: ApolloError | Error;
};

export function QueryError({ error }: Props) {
  const { title, description } = getErrorMessage(error);

  return (
    <Alert status="error" flexDir="column" alignItems="start">
      <HStack spacing={0}>
        <AlertIcon />
        <AlertTitle>{title}</AlertTitle>
      </HStack>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

export function getErrorMessage(error: ApolloError | Error) {
  if (
    error instanceof ApolloError &&
    error.extraInfo?.error_code === ErrorCodes.MISSING_ENV
  ) {
    return {
      title: "Missing ENV variables",
      description:
        "Make sure that env variables are defined and available in scope during the build",
    };
  }

  return {
    title: "Something went wrong",
    description:
      "Looks like I've made a mistake somewhere. Try resolving the problem by refreshing the page and consider filing a github issue.",
  };
}
