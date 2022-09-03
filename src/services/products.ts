import { request } from "../api/api";
import { Product } from "../interfaces";

export const getProducts = async () => {
  const requestOptions = {
    method: "GET",
    url: `${process.env.REACT_APP_API_ENDPOINT}/products`,
  };

  return request<Product[]>(requestOptions);
};
