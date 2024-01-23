import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Logo from './tasks-logo.png';
import LogoutBotton from './LogoutBotton';

type NavbarProps = {
	user?: {
		email?: string;
	};
};

const Navbar = ({ user }: NavbarProps) => {
	return (
		<nav>
			<Image src={Logo} alt="Tasks logo" width={70} quality={100} placeholder="blur" />
			<h1>The Helpdesk</h1>
			<Link href={'/'}>Dashboard</Link>
			<Link href={'/tickets'} className='mr-auto'>Tickets</Link>

			{user && <p>Welcome, {user.email}</p>}
      <LogoutBotton />
		</nav>
	);
};

export default Navbar;
