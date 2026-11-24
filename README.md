<div align="center">

<img src=".github/banner.svg" width="100%" alt="Empirical — Fashion & lifestyle storefront" />

<p><b>🛍️ E-commerce Website</b></p>

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Lottie-00DDB3?style=for-the-badge&logo=lottiefiles&logoColor=white" alt="Lottie" />
</p>

</div>

## 📖 Overview

**Empirical** is a fashion and lifestyle storefront built with **Next.js**. Customers can browse the product collection, read articles, explore events and the brand gallery, and manage their account, cart and orders.

## ✨ Key Features

### 🛒 Shopping

- Product catalog & product detail pages
- Shopping cart and order success flow
- Order history in the user profile

### 📰 Content

- Finance articles with detail pages
- Events with detail pages
- Gallery, Philosophy and Contact pages

### 🔐 Accounts

- Sign up, login, OTP verification, forgot & update password
- Protected routes via middleware
- Persisted auth state

### 🎨 Experience

- Smooth animations with Framer Motion & Lottie
- Carousels with Embla & Splide
- Custom loading & 404 pages

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) · React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **UI** | shadcn/ui (Radix) · Lucide · Sonner |
| **State** | Redux Toolkit · Redux Persist |
| **Animation** | Framer Motion · Lottie · React Type Animation |
| **Carousels** | Embla Carousel · Splide |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/moazzembhuiyan/imperialempirical-website.git
cd imperialempirical-website
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_BASE_URL=
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | Backend API base URL |

### Run

```bash
npm run dev
# open http://localhost:3000
```

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```text
src/
├── app/
│   ├── (auth)/      # Login, sign-up, OTP, password
│   ├── (public)/    # Products, articles, events, gallery...
│   └── (private)/   # Cart & profile
├── components/      # UI components
├── redux/           # Store & API
├── lottie/          # Animations
└── middleware.ts    # Route protection
```

## 📝 More Documentation

Detailed developer notes are available in [`docs/NOTES.md`](docs/NOTES.md).

---

<div align="center">

### 👨‍💻 Developed by [Moazzem Hossen Bhuiyan](https://github.com/moazzembhuiyan)

<sub>Mobile App Developer (React Native) • Web Developer</sub>

<p>
  <a href="https://github.com/moazzembhuiyan"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://www.linkedin.com/in/moazzem-hossen-bhuiyan-325432331/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="mailto:moazzembhuiyan394@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>
</p>

<sub>⭐ If you like this project, consider giving it a star!</sub>

</div>
