import React from "react";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import App from "./App";
import { Provider } from "react-redux";

test("renders App component without any data", () => {
  const initState = {
    breed: "all",
    subBreed: "all",
    number: "1",
    imageResults: 0,
    error: false,
  };

  const mockStore = configureStore();
  const dogStore = mockStore(initState);

  render(
    <Provider store={dogStore}>
        <App />
    </Provider>
  );
  const noDogsFound = screen.getByText(/No Dogs Found/i);
  expect(noDogsFound).toBeInTheDocument();
});
