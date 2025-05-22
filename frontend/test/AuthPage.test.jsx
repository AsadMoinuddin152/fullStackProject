import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AuthPage from "../src/Pages/AuthPage/AuthPage";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);
const store = mockStore({});

describe("Auth Page", () => {
  test("loads and renders the login form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Login to Your Account/i)).toBeInTheDocument();
  });
});
