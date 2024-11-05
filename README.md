<div align="center"><strong>Next.js 15 Admin Dashboard Template</strong></div>
<div align="center">Built with the Next.js (App Router)</div>
<br />
<div align="center">
<a href="https://minimal-dashboard-three.vercel.app">Demo</a>
<span> · </span>
<a href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">Clone & Deploy</a>
<span> · </span>
<a href="https://github.com/vercel/nextjs-postgres-nextauth-tailwindcss-template">Resources</a>
</div>

## Overview

This is a starter template using the following stack:

|                   |                                                                                  |
| ----------------- | -------------------------------------------------------------------------------- |
| Framework         | [Next.js (App Router)](https://nextjs.org)                                       |
| Language          | [TypeScript](https://www.typescriptlang.org)                                     |
| Auth              | [Auth.js](https://authjs.dev/?_gl=1*2exugf*_gcl_au*OTIxMjU2MTc0LjE3MzA3NzM1ODE.) |
| Database          | [Postgres](https://vercel.com/postgres)                                          |
| Media Cloud-based | [Cloudinary](https://next.cloudinary.dev/)                                       |
| Data Model        | [Prisma ORM](https://www.prisma.io/docs/getting-started)                         |
| Deployment        | [Vercel](https://vercel.com/docs/concepts/next.js/overview)                      |
| Styling           | [Tailwind CSS](https://tailwindcss.com)                                          |
| Components        | [Shadcn UI](https://ui.shadcn.com/)                                              |
| Form Handling     | [React Hook Form](https://react-hook-form.com/get-started#TypeScript)            |
| Analytics         | [Vercel Analytics](https://vercel.com/analytics)                                 |
| Formatting        | [Prettier](https://prettier.io)                                                  |

This template uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Getting Started

Next, Copy the `.env.example` file to `.env` and update the values. Follow the instructions in the `.env.example` file to set up your GitHub OAuth application, Cloudinary API, and others.

```bash
npm i -g vercel
vercel link
vercel env pull
```

During the deployment, Vercel will prompt you to create a new Postgres database. This will add the necessary environment variables to your project.

Create a table based on the schema defined in schema.prisma.

```
pnpm install
```

```
npx prisma db push
```

Finally, run the following commands to start the development server:

```
pnpm dev
```

You should now be able to access the application at http://localhost:3000.
