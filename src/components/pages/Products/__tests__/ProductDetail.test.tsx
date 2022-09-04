import React from "react";
import Router from "react-router-dom";
import { act } from "react-dom/test-utils";
import { render, screen, waitFor } from "@testing-library/react";
import * as productService from "../../../../services/products";
import * as articleService from "../../../../services/articles";
import { Product, Article } from "../../../../interfaces";
import ProductDetail from "../ProductDetail";

const mockProducts: Product[] = [
  {
    id: "0000-0000-00000-0000-1",
    name: "product 1",
    articles: [
      {
        id: "0000-0000-00000-0000-1",
        amountRequired: 4,
      },
    ],
  },
];

const mockArticles: Article[] = [
  {
    id: "0000-0000-00000-0000-1",
    name: "article 1",
    amountInStock: 4,
  },
];

const mockParams = { productId: mockProducts[0].id };
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => mockParams),
}));

jest.mock("../../../../services/products", () => ({
  getProductDetails: jest.fn(() => mockProducts),
}));

jest.mock("../../../../services/articles", () => ({
  getArticles: jest.fn(() => mockArticles),
}));

describe("Products Details Component", () => {
  test("should render the products component", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ productId: "1234" });
    render(<ProductDetail />);
    await act(() => {
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });
  });

  test("should show error when no ProductId passed", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({});

    render(<ProductDetail />);
    await act(() => {
      expect(
        screen.getByText("Something went wrong", { exact: false })
      ).toBeInTheDocument();
    });
  });

  test("should render the products details along with articles details", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ productId: mockProducts[0].id });
    jest.spyOn(productService, "getProductDetails").mockResolvedValue(mockProducts[0]);
    jest.spyOn(articleService, "getArticles").mockResolvedValue(mockArticles);
    render(<ProductDetail />);
    await waitFor(() => {
      expect(
        screen.getByText(mockArticles[0].name, { exact: false })
      ).toBeInTheDocument();
    });
  });

  test("should display if service throws error", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ productId: mockProducts[0].id });
    jest.spyOn(productService, "getProductDetails").mockRejectedValue([]);
    render(<ProductDetail />);
    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong", { exact: false })
      ).toBeInTheDocument();
    });
  });
});
