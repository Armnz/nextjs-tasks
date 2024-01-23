import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id;

  const res = await fetch(`http://localhost:4000/tickets/${id}`);
  const ticket = await res.json();

  if (!res.ok) {
    return NextResponse.json({error: 'Cannot find ticket'}, {
      status: 404
    });
  }

  return NextResponse.json(ticket, {
    status: 200
  });
}
