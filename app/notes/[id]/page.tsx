/* 
import { fetchNoteById } from "@/lib/api";


type Props = {
 params: Promise<{ id: string }>;
};


const NoteDetails = async ({ params }: Props) => {
 const { id } = await params;
 const note = await fetchNoteById(id);
 console.log(note);


return (
    <div>
        <h1>{note.title}</h1>
        <p>{note.content}</p>
    </div>
  );
};
 */

import { fetchNoteById } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from './NoteDetails.client';

type Props = {
  params: Promise<{id:string}>
}

export default async function NoteDetails({ params }: Props) {

  
  const queryClient = new QueryClient();
  const {id} = await params;
  await queryClient.prefetchQuery({
    queryKey: ["note",id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient  />
    </HydrationBoundary>
  )
}
