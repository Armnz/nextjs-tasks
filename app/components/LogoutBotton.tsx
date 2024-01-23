'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LogoutBotton() {
	const router = useRouter();

	const handleLogout = async () => {
		const supabase = createClientComponentClient();
		const { error } = await supabase.auth.signOut();

		if (!error) {
			router.push('/login');
		}
		if (error) {
			console.log(error);
		}
	};

	return (
		<button className="btb-primary" onClick={handleLogout}>
			Logout
		</button>
	);
}
