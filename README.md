# AA Travel Group UK

Production-grade starting codebase for a premium Umrah/Hajj hotel wholesaler site, built with Next.js 15 (App Router), TypeScript, Tailwind, Prisma/MySQL, and JWT admin auth.

## What's built

- **Public site**: Home, Hotels (list + detail with gallery/amenities/rooms/map/reviews/related), Umrah Packages (list + detail), Travel Agents (B2B page + partner registration form), Services, About, Gallery, Blog (list + detail), Contact/Request Quote, FAQ, Privacy/Terms/Cookies.
- **Forms wired end-to-end**: quote requests, travel agent registration, and contact — validated with Zod, submitted via `react-hook-form`, saved to MySQL via Prisma, with an email notification hook (Nodemailer).
- **Database**: full Prisma schema (`prisma/schema.prisma`) covering Users, Hotels, Rooms, HotelImages, Amenities, Bookings, Enquiries, TravelAgents, Packages, Testimonials, BlogPosts, Categories, Gallery, Contacts, Admins.
- **Auth**: JWT-based admin login (`/admin/login`), httpOnly cookie session, role field (`SUPER_ADMIN`/`ADMIN`/`EDITOR`), and `middleware.ts` protecting `/admin/*` and `/api/admin/*`.
- **Admin**: dashboard overview reading live counts + a recent-enquiries table, plus a full CRUD API route for hotels (`/api/admin/hotels`) as the reference pattern.
- **SEO**: dynamic metadata per page, Open Graph/Twitter tags, `sitemap.ts`, `robots.ts`, JSON-LD on hotel pages.
- **Design system**: brand palette (`#C8102E` maroon, gold accent, cream/ink neutrals), Fraunces + Inter type pairing, an 8-point khatam star used as a signature divider motif, dark mode via a class-based theme provider, Framer Motion on the hero.

## What you still need to do before launch

This was generated in a sandboxed environment with no live MySQL instance, so nothing here has been run against a real database or `next build`. Before deploying:

1. **Install & configure**
   ```bash
   npm install
   cp .env.example .env      # fill in DATABASE_URL, JWT_SECRET, SMTP, Cloudinary, Maps, WhatsApp number
   npx prisma migrate dev --name init
   npm run seed               # creates an admin (admin@aatravelgroup.co.uk / ChangeMe123!) and demo hotel/package
   npm run dev
   ```
2. **Change the seeded admin password immediately** — it's a placeholder for local development only.
3. **Run `npm run build`** and fix any type/lint errors that surface — this codebase hasn't been compiled yet, so treat the first build as a real QA pass, not a formality.
4. **Extend admin CRUD**: `/api/admin/hotels` is the reference pattern (GET list, POST create). Rooms, HotelImages, Amenities, Packages, BlogPosts, Gallery, Testimonials, and TravelAgent moderation need the same GET/POST/PATCH/DELETE routes plus simple admin UI forms — copy the hotels route and the dashboard page's data-fetching pattern.
5. **Cloudinary uploads**: no upload widget is wired yet. Add `next-cloudinary`'s `CldUploadWidget` to the admin hotel/gallery forms and store the returned `secure_url`/`public_id` on `HotelImage`/`GalleryImage`.
6. **Google Maps**: hotel/contact maps currently use a plain embed iframe (no API key required). Swap for `@react-google-maps/api` if you want interactive markers, clustering, or the Places autocomplete on the contact form.
7. **Legal pages**: `/privacy-policy`, `/terms`, `/cookies` are placeholders — have them reviewed by a solicitor, especially around Hajj/Umrah booking terms and refund policy.
8. **Analytics/Live chat**: add your Google Analytics ID and a live chat script (Tawk.to, Crisp, etc.) in `src/app/layout.tsx`.
9. **Images**: replace the Unsplash placeholder URLs in `prisma/seed.ts` and hero/hotel components with your own licensed photography.

## Project structure

```
src/
  app/            Route segments (pages + API routes), one folder per URL
  components/
    ui/            Reusable primitives (Button, Input, StarDivider)
    layout/        Navbar, Footer, WhatsApp button, theme provider
    sections/      Page sections (Hero, ServicesGrid, QuoteForm, etc.)
  lib/             prisma client, auth (bcrypt/JWT), auth-edge (jose, for middleware), mailer, zod schemas, utils
  middleware.ts    Protects /admin and /api/admin
prisma/
  schema.prisma    Full data model
  seed.ts          Demo data + admin user
```

## Notes on the stack choices

- Auth verification is split into `lib/auth.ts` (Node runtime — bcrypt + jsonwebtoken, used in API routes) and `lib/auth-edge.ts` (`jose`, used in `middleware.ts`, which runs on the Edge runtime and can't use Node-only crypto packages).
- Prisma calls in page components are wrapped in `try/catch` so pages render an empty state instead of crashing when `DATABASE_URL` isn't configured yet — remove those fallbacks once your database is live if you'd rather fail loudly.
