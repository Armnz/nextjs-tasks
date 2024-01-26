'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addTicket(formData: FormData) {
  const ticket = Object.fromEntries(formData);

  const supabase = createServerActionClient({ cookies });

  // get current user session
  const { data: sessionData } = await supabase.auth.getSession();

  // insert the data
  const { error } = await supabase.from('Tickets')
  .insert({ ...ticket, user_email: sessionData.session?.user.email })
  .select();

  if (error) {
    throw new Error('Could not add the new ticket')
  }

  revalidatePath('/tickets');
  redirect('/tickets');
}

export async function deleteTicket(id: number){
  const supabase = createServerActionClient({ cookies });

  // delete the data
  const { error } = await supabase.from('Tickets')
  .delete()
  .eq('id', id)

  if (error) {
    throw new Error('Could not delete the ticket')
  }

  revalidatePath('/tickets');
  redirect('/tickets');
}
