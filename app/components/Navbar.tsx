import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import Logo from './tasks-logo.png';

export default function Navbar() {
  return (
    <nav>
      <Image
      src={Logo}
      alt='Tasks logo'
      width={70}
      quality={100}
      placeholder='blur'
      />
    <h1>The Helpdesk</h1>
    <Link href={'/'}>Dashboard</Link>
    <Link href={'/tickets'}>Tickets</Link>
  </nav>
  )
}
