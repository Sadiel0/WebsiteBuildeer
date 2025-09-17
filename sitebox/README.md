# SiteBox - AI Website Builder

An AI-powered "site-in-a-box" application that generates bilingual small-business websites from a JSON page plan, then handles domain purchase and publishing.

## Features

- 🤖 **AI-Powered Planning**: Generates website content using OpenAI GPT-4
- 🌐 **Bilingual Support**: Spanish-first UX with English support
- ⚡ **3-Minute Wizard**: Quick setup process for business preferences
- 🎨 **Smart Design**: AI-assisted layout with rules-constrained design
- 📱 **Responsive**: Mobile-first design with Tailwind CSS
- 🔗 **Domain Integration**: GoDaddy API integration for domain search/purchase
- 🚀 **One-Click Publish**: Vercel deployment automation

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Supabase (Auth, Postgres, Storage)
- **AI**: OpenAI GPT-4 for content generation
- **Validation**: Zod schemas with strict typing
- **Testing**: Vitest, React Testing Library
- **Deployment**: Vercel (planned)

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create `.env.local` with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   GODADDY_API_KEY=your_godaddy_api_key
   GODADDY_API_SECRET=your_godaddy_api_secret
   VERCEL_PROJECT_ID=your_vercel_project_id
   VERCEL_TOKEN=your_vercel_token
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Set up Supabase**:
   Run the SQL commands in `supabase.sql` to create the required tables.

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Run tests**:
   ```bash
   npm test
   ```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── wizard/            # Wizard form
│   └── (preview)/         # Preview pages
├── components/
│   └── renderer/          # Section renderers
├── lib/                   # Utilities
├── types/                 # TypeScript types
└── __tests__/            # Test files
```

## API Endpoints

- `POST /api/plan/create` - Generate website plan from preferences
- `GET /api/domain/search` - Search available domains
- `POST /api/domain/purchase` - Purchase domain (stubbed)
- `POST /api/images/score` - Score images for placement (stubbed)
- `POST /api/publish` - Publish to Vercel (stubbed)

## Testing

The project includes comprehensive tests for:
- Plan validation with Zod schemas
- Component rendering with React Testing Library
- API endpoint functionality

Run tests with:
```bash
npm test
```

## Example Usage

1. Visit `/wizard` to start the website creation process
2. Fill out business information and preferences
3. AI generates a complete website plan
4. Preview the generated site at `/s/[projectId]`
5. Purchase domain and publish (features in development)

## Development Status

✅ **Completed**:
- Next.js setup with TypeScript and Tailwind
- Zod schemas and validation
- Wizard form with multi-step process
- Section renderers for all component types
- API routes for plan creation
- Supabase integration
- Basic testing setup

🚧 **In Progress**:
- shadcn/ui integration
- Image upload and scoring
- Domain purchase flow
- Vercel deployment automation

📋 **Planned**:
- Stripe payment integration
- User authentication
- Advanced AI features
- Analytics integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
