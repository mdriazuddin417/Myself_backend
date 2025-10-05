# MyPortfolio Frontend

A modern personal portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.  
Includes public pages (Projects, Blog, Contact, Resume) and a **Manage (Admin)** area for content management.

---

## ✨ Features

- 🧩 **Projects** – Showcase your portfolio items.
- ✍️ **Blog** – Create and manage blog posts.
- ⚙️ **Manage** – Admin dashboard for CRUD operations.
- 🧾 **Resume** – Public and editable resume pages.
- 📬 **Contact** – Contact page.
- 🔐 **NextAuth** integration ready for authentication.
- 💅 **Beautiful UI** built using TailwindCSS and shadcn/ui.
- ⚡ **App Router** architecture for optimized routing and layouts.

---

## 🧱 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | [Next.js 14](https://nextjs.org/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) |
| Auth | [NextAuth.js](https://next-auth.js.org/) |
| Package Manager | npm / pnpm / bun |

---

## 📁 Project Structure

```
src/
├── actions/                     # Server Actions (CRUD)
├── app/
│   ├── (dashboard)/admin/       # Admin Dashboard
│   │   └── blog/
│   │       └── [slug]/new/page.tsx
│   ├── (public)/
│   │   ├── about/
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── resume/
│   │   │   ├── edit/page.tsx
│   │   │   └── page.tsx
│   ├── api/
│   │   └── auth/[...nextauth]/route.ts
│   ├── global-error.tsx
│   └── route.ts
├── public/
│   ├── images/
│   ├── favicon.ico
├── components/
├── lib/
├── styles/
│   └── globals.css
```

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### 2️⃣ Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Now open [http://localhost:3000](http://localhost:3000) to see your app.

---

## 🧰 Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
npm run format       # Format using Prettier
```

---

## 🎨 Styling and Components

### TailwindCSS
Tailwind is preconfigured. Add custom styles in `globals.css`.

### shadcn/ui
Add new components easily:
```bash
npx shadcn@latest add button
npx shadcn@latest add card input textarea dialog
```



---

## 🔐 Authentication Setup

File: `app/api/auth/[...nextauth]/route.ts`

Add your environment variables:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GITHUB_ID=
GITHUB_SECRET=
```

You can plug in any NextAuth provider.

---

## 🧪 Linting & Formatting

```bash
npm run lint
npm run type-check
npm run format
```

---

## 📦 Build and Deploy

```bash
npm run build
npm run start
```

Recommended deployment: **[Vercel](https://vercel.com/)** (zero-config for Next.js).

---

## 🗺️ Roadmap

- [ ] Add Prisma/Drizzle for DB persistence  
- [ ] Secure Admin dashboard  
- [ ] Add image uploads for projects/blog  
- [ ] Integrate markdown/MDX for blog posts  
- [ ] Write unit and integration tests  

---

## 📄 License

MIT License © 2025 — Built by **Riaz Uddin** ❤️

---

## 🙌 Acknowledgements

Powered by:
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [NextAuth.js](https://next-auth.js.org/)
