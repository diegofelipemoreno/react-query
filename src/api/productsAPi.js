import axios from 'axios';

const productApi =  axios.create({
    baseURL: 'http://localhost:3000/products'
});

export const getProducts= async () => {
    const res = await productApi.get('/');

    return res.data;
}

export const createProducts= (product) => {
    productApi.post('/', product);
}

export const deleteProduct= (id) => {
    productApi.delete(`/${id}`);
}

export const updateProduct= (product) => {
    console.log(product, 'productproduct');
    productApi.put(`/${product,id}`, product);
}