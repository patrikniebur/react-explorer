import { render } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import { repositorySearch } from "../../data/queries";
import { App, initialQueryVariables } from "./App";

const emptyMock: MockedResponse = {
  request: {
    query: repositorySearch,
    variables: { ...initialQueryVariables, first: 10 },
  },
};
test("Renders app", () => {
  render(
    <MockedProvider mocks={[emptyMock]}>
      <App />
    </MockedProvider>,
  );
});
