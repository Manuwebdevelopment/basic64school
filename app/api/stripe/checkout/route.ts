// app/api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { data: { session }, error: authError } = await supabase.auth.getSession();
  if (authError || !session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', session.user.id)
    .single();

  let customerId = profile?.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email!,
      metadata: { supabase_uid: session.user.id },
    });
    customerId = customer.id;

    await supabase
      .from('profiles')
      .update({ stripe_customer_id: customerId })
      .eq('id', session.user.id);
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://basic64school.com';

  const checkoutSession = await stripe.checkout.sessions.create({
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
