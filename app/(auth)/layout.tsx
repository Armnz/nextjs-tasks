import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
	const { data } = await supabase.auth.getSession();

  if (data.session) {     {/* Check if session exists */}
  redirect('/')
}
  return (
    <>
    <nav>
      <h1>Helpdesk</h1>
      <Link href="/signup">Sign up</Link>
      <Link href="/login">Log in</Link>
    </nav>
    {children}
    </>
  )
}
