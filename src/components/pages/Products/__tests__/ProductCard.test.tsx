import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCardComponent from '../ProductCard';
import { Product } from '../../../../interfaces';

const mockProduct: Product =  {
id: '0000-0000-00000-0000-1',
name: 'product 1',
articles:[
    {
        id: '0000-0000-00000-0000-1',
        amountRequired: 4,
    }
]
};

const mockHandleClick = jest.fn();
 
describe('Products Cards Component', () => {
    test('should render the product card component', async () => {
        render(<ProductCardComponent product={mockProduct} clickHandler={mockHandleClick} />);
        expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    });

    test('should render required articles count', async () => {
        render(<ProductCardComponent product={mockProduct} clickHandler={mockHandleClick}/>);
        expect(screen.getByText('Required Articles', {exact: false})).toBeInTheDocument();
    });

    test('should not render required articles count', async () => {
        const mockProductWithNoArticles = {
            ...mockProduct,
            articles: [],
        }
        render(<ProductCardComponent product={mockProductWithNoArticles} clickHandler={mockHandleClick}/>);
        expect(screen.queryByText('Required Articles', {exact: false})).not.toBeInTheDocument();
    });
});