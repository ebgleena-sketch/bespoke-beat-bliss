import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const RECIPIENT_EMAIL = "ebg.leena@gmail.com";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY is not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { type, data } = await req.json();

    let subject: string;
    let htmlBody: string;

    if (type === 'quote') {
      subject = `New Song Quote Request from ${data.name}`;
      htmlBody = `
        <h2>New Song Quote Request</h2>
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <h3>Song Details</h3>
        <p><strong>Package:</strong> ${data.tier}</p>
        <p><strong>Song Type:</strong> ${data.songType}</p>
        <p><strong>Occasion:</strong> ${data.occasion}</p>
        <p><strong>Musical Style:</strong> ${data.referenceStyle}</p>
        ${data.customLyrics ? `<p><strong>Custom Lyrics:</strong></p><pre>${data.customLyrics}</pre>` : ''}
        ${data.specialDetails ? `<p><strong>Special Details:</strong> ${data.specialDetails}</p>` : ''}
      `;
    } else if (type === 'contact') {
      subject = `New Question from ${data.name}`;
      htmlBody = `
        <h2>New Contact Question</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Question:</strong></p>
        <p>${data.question}</p>
      `;
    } else {
      return new Response(JSON.stringify({ error: 'Invalid type' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'KantaCanta <onboarding@resend.dev>',
        to: [RECIPIENT_EMAIL],
        subject,
        html: htmlBody,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error('Resend API error:', result);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: result }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
