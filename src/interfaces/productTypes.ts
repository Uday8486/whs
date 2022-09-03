import { Article } from "./articleTypes";

export interface Product {
    id: string,
    name: string,
    articles: Article[],
}