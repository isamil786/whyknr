# Why.Karimnagar

A full-featured local news website for Karimnagar, inspired by [Dakshin News](https://dakshinnews.com). Built for [@why.karimnagar](https://www.instagram.com/why.karimnagar/) on Instagram.

## Features

- **News homepage** with featured stories and category sections
- **Article pages** with title, photo or video, and rich content
- **Categories**: Breaking News, Local News, Politics, Events, In Focus, Lifestyle
- **Admin CMS** at `/admin` to publish, edit, and delete articles
- **Media support**: upload photos/videos or paste URLs (including YouTube)
- **Instagram integration** with links to @why.karimnagar
- **Mobile-responsive** modern UI

## Quick Start

```bash
npm install
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin Panel

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Login with password: `admin123` (change in `.env`)
3. Click **+ New Article** to publish news

### Creating an Article

| Field | Description |
|-------|-------------|
| **Title** | Headline of the news story |
| **Photo / Video** | Choose media type, upload file or paste URL |
| **Content** | Full article body (HTML supported) |
| **Category** | Breaking, Local, Politics, etc. |
| **Featured** | Show in "In Focus" section on homepage |

## Environment Variables

Copy `.env.example` to `.env`:

```
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="admin123"
```

## Tech Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- Prisma + SQLite
- TypeScript

## Project Structure

```
src/
  app/
    (site)/          # Public pages
    admin/           # CMS dashboard
    api/             # REST API routes
  components/        # UI components
  lib/               # Database, auth, utilities
```

## Deployment

Works on Vercel, Railway, or any Node.js host. For production:

1. Set `ADMIN_PASSWORD` to a strong password
2. Use PostgreSQL by changing `DATABASE_URL` in Prisma schema
3. Configure file upload storage (S3/Cloudinary) for production media

---

**Why.Karimnagar** — Facts · Fearless · Faithful
