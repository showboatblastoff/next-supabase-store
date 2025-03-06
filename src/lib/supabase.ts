import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Default values for build time (these won't actually be used in production)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// For server components
export const createServerClient = () => {
  return createClient(
    supabaseUrl,
    supabaseKey
  );
};

// For client components
export const createBrowserClient = () => {
  return createClientComponentClient();
};
