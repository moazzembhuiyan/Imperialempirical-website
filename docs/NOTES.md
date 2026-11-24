# Empirical

Empirical is a fashion and lifestyle storefront built with Next.js. Browse the
product collection, explore articles and events, and manage your account, cart,
and orders.

## Features

- Product catalog and product detail pages
- Articles, events, gallery, philosophy, and contact pages
- Account registration, sign-in, and password recovery
- Authenticated profile, shopping cart, and order history
- Responsive interface with animated elements

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19 and [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/) and RTK Query
- [Tailwind CSS](https://tailwindcss.com/)

## Requirements

- Node.js 20.9 or later
- npm
- An API server URL for the application backend

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root and set the API base URL:

   ```env
   NEXT_PUBLIC_BASE_URL=https://your-api.example.com
   ```

   Replace the example URL with the backend URL for your environment. The
   value should be the API origin, without a trailing endpoint path.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript types |

## Project structure

```text
src/
  app/         App Router pages and layouts
  component/   Shared and page-specific UI components
  Hooks/       Data-fetching hooks
  redux/       Redux store, slices, and API services
  assets/      Local images and branding
public/        Static assets
```

## Deployment

Build the project with `npm run build`, then run `npm start` in an environment
where `NEXT_PUBLIC_BASE_URL` points to the appropriate backend API. The project
can also be deployed to any platform that supports Next.js.
