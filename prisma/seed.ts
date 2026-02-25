import prisma from "@/lib/db";

async function main() {
  const blogPosts = [
    {
      slug: "react-basics",
      title: "React Basics",
      content: `# Learn React Basics

## What is React?

React is a JavaScript library for building user interfaces. It is built on top of React and provides a lot of features for building web applications.

## Features

- Virtual DOM
- JSX
- Components
- State management

**React and Next.js are perfectly compatible with each other.**`,
    },
    {
      slug: "nextjs-basics",
      title: "Next.js Basics",
      content: `# Learn Next.js Basics

## What is Next.js?

Next.js is a React framework for building server-side rendered and static site applications.

## Features

- Server-side rendering
- Static site generation
- API routes
- Image optimization

## Code Example

\`\`\`javascript
export default function Page() {
  return <h1>Hello World</h1>;
}
\`\`\`

This is a simple Next.js page component.`,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: post,
    });
  }

  console.log("Blog posts seeded successfully");
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
