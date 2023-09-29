import { useEffect, useState } from 'react';
import supabase from '/utils/supabase';

export const useBooks = () => {
  const [books, setBooks] = useState<{ id: number; title: string; author: string; rate: number }[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response: any = await supabase.from('books').select('*');
    setBooks(response.data);
  };

  const postBooks = async (book: { title: string; author: string; rate: number }) => {
    const response = await supabase.from('books').insert(book);
    return response;
  };

  return { books, setBooks, fetchBooks, postBooks };
};
