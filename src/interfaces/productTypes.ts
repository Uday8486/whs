import { Article } from "./articleTypes";

type ProductArticle = Pick<Article, 'id' | 'name'> & {
    amountRequired: number,
}
export interface Product {
    id: string,
    name: string,
    articles: ProductArticle[],
}