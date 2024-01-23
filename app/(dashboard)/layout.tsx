import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react';

import Navbar from '@/app/components/Navbar';
import { redirect } from 'next/navigation';

type DashboardLayoutProps = {
	children: React.ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
	const supabase = createServerComponentClient({ cookies });
	const { data } = await supabase.auth.getSession();

	if (!data.session) {     {/* Check if session exists */}
		redirect('/login')
	}

	return (
		<>
			<Navbar user={data.session.user} />
			{children}
		</>
	);
}
