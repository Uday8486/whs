import { Article } from "./articleTypes";

type ProductArticle = Pick<Article, 'id' > & {
    amountRequired: number,
}
export interface Product {
    id: string,
    name: string,
    articles: ProductArticle[],
}