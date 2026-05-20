// app/api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error('STRIPE_SECRET_KEY is not configured');
  return new Stripe(secretKey);
}

export async function POST(req: NextRequest) {
  const client = await (await import('@/lib/supabase-server')).createClient();
  const { data: { session }, error: authError } = await client.auth.getSession();
  if (authError || !session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { data: profile } = await client
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', session.user.id)
    .single();

  let customerId: string | null = (profile as { stripe_customer_id: number | null } | null)?.stripe_customer_id?.toString() ?? null;

  if (!customerId) {
    const customer = await getStripe().customers.create({
      email: session.user.email!,
      metadata: { supabase_uid: session.user.id },
    });
    customerId = customer.id;

    await client
      .from('profiles')
      .update({ stripe_customer_id: customerId })
      .eq('id', session.user.id);
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://basic64school.com';

  const checkoutSession = await getStripe().checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: 2500,
          product_data: {
            name: 'Basic64 School Premium',
            description: 'One-time access to all 42 lessons (Levels 0-6)',
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    customer_update: { address: 'auto' },
    success_url: `${baseUrl}/premium?success=true`,
    cancel_url: `${baseUrl}/premium?canceled=true`,
    metadata: {
      supabase_uid: session.user.id,
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}

export const dynamic = 'force-dynamic';
