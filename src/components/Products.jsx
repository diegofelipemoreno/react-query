import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {getProducts, deleteProduct, updateProduct} from '../api/productsAPi';

function Products() {
    const queryClient = useQueryClient();
    const {isLoading, data: products, isError, error} =  useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        select: (products) => products.sort((a, b) => b.id - a.id),
    });

    const deleteProductMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            console.log('Product deleted');
            queryClient.invalidateQueries('products');
        }
    });


    const updateProductMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            console.log('Product updated');
            queryClient.invalidateQueries('products');
        }
    });


    if (isLoading) return <h1>Loading...</h1>;

    if (isError) return <pre>{JSON.stringify(error)}</pre>; 

    return (
        <ul>
            {products.map((product) => (
                <li key={`products-${product.id}`}>
                    <h2>{product.name}</h2>
                    <p>{product.description} </p>
                    <p>{product.price} </p>
                    <label htmlFor='in-stock'>In stock</label>
                    <input id="in-stock" type="checkbox" checked={product.inStock} onChange={
                        (event) => {
                            console.log(event.target.checked, product, {...product, inStock: event.target.checked});
                            updateProductMutation.mutate({...product, inStock: event.target.checked})
                        }
                    }/>
                    <button onClick={() => deleteProductMutation.mutate(product.id)}>Delete</button>
                </li>
                )
            )}
        </ul>
    )
}

export default Products;