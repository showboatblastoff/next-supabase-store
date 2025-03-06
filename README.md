# Next.js Store with Supabase Backend

This is a Next.js e-commerce store application with Supabase for backend services, featuring Google authentication and a customer profile system with dashboard.

## Features

- 🚀 Next.js 15 with App Router
- 🔐 Authentication with Supabase (Email and Google OAuth)
- 👤 Customer profiles and dashboard
- 🎨 Tailwind CSS for styling
- ☁️ Ready for Vercel deployment

## Getting Started

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Supabase Setup

1. Create a new project on [Supabase](https://app.supabase.com/)
2. Set up authentication:
   - Enable Email/Password sign-in
   - Configure Google OAuth provider
3. Create the `profiles` table with the following schema:

   ```sql
   create table public.profiles (
     id uuid not null references auth.users on delete cascade,
     created_at timestamp with time zone default now() not null,
     updated_at timestamp with time zone default now() not null,
     email text not null,
     name text,
     avatar_url text,
     primary key (id)
   );

   -- Enable row level security
   alter table public.profiles enable row level security;

   -- Create policies
   create policy "Public profiles are viewable by everyone." on public.profiles
     for select using (true);

   create policy "Users can insert their own profile." on public.profiles
     for insert with check (auth.uid() = id);

   create policy "Users can update their own profile." on public.profiles
     for update using (auth.uid() = id);
   ```

## Deploying to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fyourrepo)

### Option 2: Deploy from GitHub

1. Push your code to a GitHub repository
2. Visit [Vercel](https://vercel.com/)
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: Next.js
   - Environment Variables: Add your Supabase credentials
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```
6. Click "Deploy"

### Option 3: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Login to Vercel:
   ```bash
   vercel login
   ```
3. Deploy:
   ```bash
   vercel
   ```
4. Follow the CLI prompts to configure your project
5. Add environment variables:
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

## After Deployment

1. Set up your Google OAuth redirect URLs in the Supabase dashboard:
   - Add `https://your-vercel-domain.vercel.app/auth/callback` to the list of redirect URLs
2. Test your application by signing in with Google

## Important Notes

- Ensure your Supabase security settings are properly configured
- When using OAuth, configure the correct redirect URLs in both Supabase and your OAuth provider's dashboard

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
