import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const RECIPIENT_EMAIL = "ebg.leena@gmail.com";

// Simple in-memory rate limiter (per IP, 5 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function validateString(val: unknown, maxLen: number): string | null {
  if (typeof val !== 'string') return null;
  const trimmed = val.trim();
  if (trimmed.length === 0 || trimmed.length > maxLen) return null;
  return trimmed;
}

function validateEmail(val: unknown): string | null {
  const s = validateString(val, 255);
  if (!s) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(s) ? s : null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(clientIp)) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
      status: 429,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return new Response(JSON.stringify({ error: 'Service temporarily unavailable' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const { type, data } = body;

    if (typeof type !== 'string' || typeof data !== 'object' || !data) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let subject: string;
    let htmlBody: string;

    if (type === 'quote') {
      const name = validateString(data.name, 100);
      const email = validateEmail(data.email);
      const phone = validateString(data.phone, 20);
      const tier = validateString(data.tier, 100);
      const songType = validateString(data.songType, 100);
      const occasion = validateString(data.occasion, 500);
      const referenceStyle = validateString(data.referenceStyle, 500);
      const customLyrics = data.customLyrics ? validateString(data.customLyrics, 2000) : null;
      const specialDetails = data.specialDetails ? validateString(data.specialDetails, 1000) : null;

      if (!name || !email || !phone || !tier || !songType || !occasion || !referenceStyle) {
        return new Response(JSON.stringify({ error: 'Missing or invalid required fields' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      subject = `New Song Quote Request from ${escapeHtml(name)}`;
      htmlBody = `
        <h2>New Song Quote Request</h2>
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <h3>Song Details</h3>
        <p><strong>Package:</strong> ${escapeHtml(tier)}</p>
        <p><strong>Song Type:</strong> ${escapeHtml(songType)}</p>
        <p><strong>Occasion:</strong> ${escapeHtml(occasion)}</p>
        <p><strong>Musical Style:</strong> ${escapeHtml(referenceStyle)}</p>
        ${customLyrics ? `<p><strong>Custom Lyrics:</strong></p><pre>${escapeHtml(customLyrics)}</pre>` : ''}
        ${specialDetails ? `<p><strong>Special Details:</strong> ${escapeHtml(specialDetails)}</p>` : ''}
      `;
    } else if (type === 'contact') {
      const name = validateString(data.name, 100);
      const email = validateEmail(data.email);
      const question = validateString(data.question, 1000);

      if (!name || !email || !question) {
        return new Response(JSON.stringify({ error: 'Missing or invalid required fields' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      subject = `New Question from ${escapeHtml(name)}`;
      htmlBody = `
        <h2>New Contact Question</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Question:</strong></p>
        <p>${escapeHtml(question)}</p>
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
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
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
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
