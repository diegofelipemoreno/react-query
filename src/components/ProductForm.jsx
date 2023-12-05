import { useMutation, useQueryClient } from '@tanstack/react-query';
import {createProducts} from '../api/productsAPi';

function ProductForm() {
    const queryClient = useQueryClient();
    const addProductMutation = useMutation({
        mutationFn: createProducts,
        onSuccess: () => {
            console.log('Product added');
            queryClient.invalidateQueries('products');
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const newFormData = new FormData(event.target);
        const newProduct = Object.fromEntries(newFormData);

        console.log('subnmit', newProduct);
        
        addProductMutation.mutate({...newProduct, inStock: true });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>In stock</label>
            <input id="name" type="text" name="name"/>

            <label htmlFor='description'>Description</label>
            <input id="description" type="text" name="description"/>

            <label htmlFor='price'>Price</label>
            <input id="price" type="text" name="price"/>

            <button>Add product</button>
        </form>
    )
}

export default ProductForm