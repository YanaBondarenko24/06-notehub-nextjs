import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from './Notes.client';

export default async function Notes({
  searchParams,}: {
    searchParams: Promise<{
      query?: string,
      page?: number
    }>;
}){
  const queryClient = new QueryClient();
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const query = String(params.query ?? '')
  await queryClient.prefetchQuery({
    queryKey: ["notes",query,page],
    queryFn: () => fetchNotes(query,page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient  />
    </HydrationBoundary>
  )
}

