import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(request: any) {
	const ticket = await request.json()

	// get supabase instance
	const supabase = createRouteHandlerClient({ cookies });

	// get current user session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		// Handle the case where session is null
		return NextResponse.json({ error: 'No session found' }, { status: 401 });
	}

  const { data, error } = await supabase
  .from('Tickets')
  .insert({
		...ticket,
    user_email: session.user.email,
  })
  .select()
  .single()

	return NextResponse.json({ data, error });
}
