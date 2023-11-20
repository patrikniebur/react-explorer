import { render, screen } from "@testing-library/react";
import { ApolloError } from "@apollo/client";

import { ErrorCodes } from "../../types";
import { QueryError } from "./QueryError";

test("Renders QueryError when missing env variables", async () => {
  const error = new ApolloError({
    extraInfo: { error_code: ErrorCodes.MISSING_ENV },
  });
  render(<QueryError error={error} />);

  expect(screen.getByRole("alert")).toBeDefined();
  screen.getByText("Missing ENV variables");
});

test("Renders QueryError with any Apollo error", async () => {
  const error = new ApolloError({});
  render(<QueryError error={error} />);

  expect(screen.getByRole("alert")).toBeDefined();
  screen.getByText("Something went wrong");
});

test("Renders QueryError with any generic error", async () => {
  const error = new Error();
  render(<QueryError error={error} />);

  expect(screen.getByRole("alert")).toBeDefined();
  screen.getByText("Something went wrong");
});
