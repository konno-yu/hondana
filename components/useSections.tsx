import { useEffect, useState } from 'react';
import { Section } from './SectionDrawer';
import supabase from '/utils/supabase';

export const useSections = () => {
  const [sections, setSections] = useState<Array<{ book_id: number; section: Section }>>();

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    const response: any = await supabase.from('sections').select('*');
    setSections(response.data);
  };

  const postSections = async (bookId: number, section: Section) => {
    const obj = { book_id: bookId, section };
    const response = await supabase.from('sections').insert(obj);
    return response;
  };

  const putSections = async (bookId: number, section: Section) => {
    const obj = { book_id: bookId, section };
    const response = await supabase.from('sections').update(obj).eq('book_id', bookId);
    return response;
  };

  return { sections, fetchSections, postSections, putSections };
};
