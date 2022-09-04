import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductComponent from '../Products';
import * as productService from '../../../../services/products';
import { Product } from '../../../../interfaces';
import { act } from 'react-dom/test-utils';

const mockProducts: Product[] = [{
id: '0000-0000-00000-0000-1',
name: 'product 1',
articles:[
    {
        id: '0000-0000-00000-0000-1',
        amountRequired: 4,
    }
]
}];

jest.mock('react-router-dom');
jest.mock('../ProductCard', () => () => 'ProductCard');


jest.mock('../../../../services/products', ()=>({
    getProducts: jest.fn(() => mockProducts),
}));

describe('Products Component', () => {
    test('should render the products component', async () => {
        render(<ProductComponent />);
        await waitFor(()=>{
            expect(screen.getByRole('heading')).toBeInTheDocument();
        });
    });

    test('should call service to get products', async () => {
        render(<ProductComponent />);
        await waitFor(()=>{
            expect(productService.getProducts).toBeCalled();
        });
    });

    test('should show loading before the service is called', async () => {
        jest.spyOn(productService, "getProducts").mockResolvedValue(mockProducts);
        render(<ProductComponent />);
        // status role comes from bootstrap spinner.
        expect(screen.getByRole('status')).toBeInTheDocument();
        await act(()=>{
            expect(productService.getProducts).toBeCalled();
        });
    });

    test('should show product card when products are fetched', async () => {
        jest.spyOn(productService, "getProducts").mockResolvedValue(mockProducts);
        render(<ProductComponent />);
        await waitFor(()=>{
            expect(screen.getByText('ProductCard')).toBeInTheDocument();
        });
    });

    test('should not show product card when product not fetched successfully', async () => {
        jest.spyOn(productService, "getProducts").mockRejectedValue(`error while fetching products`);
        render(<ProductComponent />);
        await act(()=>{
            expect(screen.queryByText('ProductCard')).not.toBeInTheDocument();
        });
    });
});