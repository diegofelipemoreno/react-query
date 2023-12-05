import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import './App.css'

import Products from './components/Products';
import ProductForm from './components/ProductForm';

const POSTS = [
  {id: 1, title: "post 1"},
  {id: 2, title: "post 2"}
];

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

function App() {
  console.log(POSTS);
  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: ['posts'], // 'posts' The identifier key of you query
    queryFn: () => wait(1000).then(() => [...POSTS]) //() => Promise.reject('error message'),
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      wait(1000).then(() => {
        POSTS.push({ id: crypto.randomUUID(), title })
      });
    }, onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    }
  });

  useEffect(() => {
    console.log(postsQuery, 'postsQuerypostsQuery');
  }, [postsQuery]);


  if (postsQuery.isLoading) return <h1>Loading...</h1>;

  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <>
      <h1>Vite + React</h1>
      <ul>
        {postsQuery.data.map((post) => (
          <li key={`post-${post.id}`}>{post.title} cosa</li>
        )
        )}
      </ul>
      <button 
      disable={newPostMutation.isLoading}
      onClick={() => newPostMutation.mutate('new post')}></button>
      <Products />
      <ProductForm />
    </>
  )
}

export default App
