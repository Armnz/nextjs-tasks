import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

type DeleteParams = {
  id: number;
};

export async function DELETE(_: any, { params }: { params: DeleteParams }) {
  const id = params.id;

  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase.from('Tickets')
    .delete()
    .eq('id', id)

  return NextResponse.json({ error })
}