import { render, screen } from "@testing-library/react";

import { RepoList } from "./RepoList";

test("Renders RepoList with empty list", async () => {
  render(<RepoList repositories={[]} />);


  expect(screen.getByRole("table")).toBeDefined();
  expect(screen.queryByText("Loading")).not.toBeInTheDocument();
});

test("Renders loading state", async () => {
  render(<RepoList loading repositories={[]} />);

  await screen.findAllByText("Loading")
});
