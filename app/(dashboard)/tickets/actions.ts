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

  revalidatePath('/tickets');
  redirect('/tickets');
}
