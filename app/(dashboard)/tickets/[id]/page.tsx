import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export const dynamicParams = true; // default val = true

export async function generateMetadata({ params }: {params: any}) {
	const supabase = createServerComponentClient({ cookies });

	const { data: ticket } = await supabase.from('Tickets')
    .select()
    .eq('id', params.id)
    .single()

	return {
		title: `Helpdesk | ${ticket?.title || 'Ticket not found'}`
	};
}

async function getTicket(id: string) {
  const supabase = createServerComponentClient({ cookies });

  // Convert id to integer
  const numericId = parseInt(id, 10);

  const { data, error } = await supabase.from('Tickets')
    .select()
    .eq('id', numericId)
    .single();

  if (!data) {
    notFound();
    return null;  // Handle null data scenario
  }

  return data;  // Directly return the data
}

type TicketDetailsProps = {
	params: {
		id: string;
	};
};

export default async function TicketDetails({ params }: TicketDetailsProps) {
	const ticket = await getTicket(params.id);

	return (
		<main>
			<nav>
				<h2>Ticket Details</h2>
			</nav>
			<div className="card">
				<h3>{ticket.title}</h3>
				<small>Created by {ticket.user_email}</small>
				<p>{ticket.body}</p>
				<div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
			</div>
		</main>
	);
}
