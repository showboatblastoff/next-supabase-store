import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Check if user profile exists
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select()
        .eq('id', data.user.id)
        .single();

      // If profile doesn't exist, create one
      if (profileError || !profileData) {
        const userData = data.user.user_metadata || {};
        
        await supabase.from('profiles').insert([
          {
            id: data.user.id,
            email: data.user.email,
            name: userData.name || userData.full_name || null,
            avatar_url: userData.avatar_url || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/dashboard', request.url));
} 