import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const TIER_PRICES: Record<string, { amount: number; name: string }> = {
  walkup: { amount: 9900, name: "Walk-Up Song" },
  personal: { amount: 15000, name: "Personal Songs" },
  anthem: { amount: 60000, name: "Professional Sonic Branding/Jingle" },
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new Error('Missing STRIPE_SECRET_KEY');

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    const { tier, name, email, formData } = await req.json();

    const tierInfo = TIER_PRICES[tier];
    if (!tierInfo) throw new Error('Invalid tier selected');

    const origin = req.headers.get('origin') || 'https://bespoke-beat-bliss.lovable.app';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `KantaCanta – ${tierInfo.name}`,
              description: `Custom song order for ${name}`,
            },
            unit_amount: tierInfo.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      metadata: {
        customer_name: name,
        tier,
        ...formData,
      },
      success_url: `${origin}/?payment=success`,
      cancel_url: `${origin}/?payment=cancelled`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
