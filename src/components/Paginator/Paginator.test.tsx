import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Paginator } from "./Paginator";

const initialProps: PropsOf<typeof Paginator> = {
  currentPage: 1,
  hasNextPage: true,
  hasPreviousPage: false,
  nextPage: jest.fn(),
  prevPage: jest.fn(),
  totalPages: 100,
};

type PropsOf<T> = T extends React.ComponentType<infer P> ? P : never;

test("Renders Paginator with first page and disabled button", async () => {
  render(<Paginator {...initialProps} />);

  expect(screen.getByLabelText("Previous Page")).toBeDisabled();
  expect(screen.getByLabelText("Next Page")).not.toBeDisabled();
});

test("When loading buttons are disabled and ignore clicks", async () => {
  const nextPage = jest.fn();
  const prevPage = jest.fn();
  render(
    <Paginator
      {...initialProps}
      loading
      nextPage={nextPage}
      prevPage={prevPage}
    />,
  );

  userEvent.click(screen.getByLabelText("Next Page"));
  userEvent.click(screen.getByLabelText("Previous Page"));

  expect(screen.getByLabelText("Previous Page")).toBeDisabled();
  expect(screen.getByLabelText("Next Page")).toBeDisabled();
  expect(nextPage).not.toHaveBeenCalled();
  expect(prevPage).not.toHaveBeenCalled();
});

test("When pages are available and not loading, event listeners are triggered on click", async () => {
  const nextPage = jest.fn();
  const prevPage = jest.fn();
  render(
    <Paginator
      {...initialProps}
      hasNextPage
      hasPreviousPage
      nextPage={nextPage}
      prevPage={prevPage}
    />,
  );

  userEvent.click(screen.getByLabelText("Next Page"));
  userEvent.click(screen.getByLabelText("Previous Page"));

  expect(nextPage).toHaveBeenCalledTimes(1);
  expect(prevPage).toHaveBeenCalledTimes(1);
});
