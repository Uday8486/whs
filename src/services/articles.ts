import { request } from "../api/api";
import { Article } from "../interfaces";

export const getArticles = async () => {
    const requestOptions = {
      method: "GET",
      url: `${process.env.REACT_APP_API_ENDPOINT}/articles`,
    };
  
    return request<Article[]>(requestOptions);
  };
  