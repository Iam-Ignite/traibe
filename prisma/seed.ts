import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.article.deleteMany();

  console.log("Seeding database...");

  // Create parent articles
  const webDev = await prisma.article.create({
    data: {
      title: "Introduction to Web Development",
      slug: "introduction-to-web-development",
      category: "Technology",
      content: `Web development is the process of building and maintaining websites. It encompasses web design, web content development, client-side/server-side scripting, and network security configuration.

Modern web development involves creating responsive, fast, and user-friendly applications that work across different devices and browsers.

## Key Areas:
- Frontend Development
- Backend Development
- Full-stack Development
- DevOps and Deployment`,
    },
  });

  const reactGuide = await prisma.article.create({
    data: {
      title: "Getting Started with React",
      slug: "getting-started-with-react",
      category: "Technology",
      content: `React is a popular JavaScript library for building user interfaces. It was created by Facebook and has become one of the most widely used frontend frameworks.

## Why React?
- Component-based architecture
- Virtual DOM for better performance
- Large ecosystem and community
- Great developer experience

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.`,
    },
  });

  const designPrinciples = await prisma.article.create({
    data: {
      title: "UI/UX Design Principles",
      slug: "ui-ux-design-principles",
      category: "Design",
      content: `Great design is about more than just aesthetics—it's about creating intuitive, accessible, and delightful user experiences.

## Core Principles:
1. **Consistency** - Use familiar UI patterns
2. **Hierarchy** - Guide users' attention
3. **Feedback** - Let users know what's happening
4. **Simplicity** - Remove unnecessary complexity
5. **Accessibility** - Design for everyone

These principles form the foundation of user-centered design.`,
    },
  });

  const onlineLearning = await prisma.article.create({
    data: {
      title: "The Future of Online Education",
      slug: "the-future-of-online-education",
      category: "Education",
      content: `Online education has transformed how we learn. With platforms offering courses on virtually any topic, learning has become more accessible than ever.

## Benefits:
- Learn at your own pace
- Access to expert instructors globally
- Affordable compared to traditional education
- Flexibility to balance work and study

The pandemic accelerated this shift, and hybrid learning models are here to stay.`,
    },
  });

  // Create child articles
  await prisma.article.create({
    data: {
      title: "HTML and CSS Fundamentals",
      slug: "html-and-css-fundamentals",
      category: "Technology",
      parentId: webDev.id,
      content: `HTML (HyperText Markup Language) and CSS (Cascading Style Sheets) are the building blocks of web development.

## HTML
HTML provides the structure of web pages. It uses tags to define elements like headings, paragraphs, links, images, and more.

## CSS
CSS is used to style and layout web pages. It controls colors, fonts, spacing, positioning, and responsive design.

Together, they form the foundation that every web developer must master.`,
    },
  });

  await prisma.article.create({
    data: {
      title: "JavaScript Basics for Beginners",
      slug: "javascript-basics-for-beginners",
      category: "Technology",
      parentId: webDev.id,
      content: `JavaScript is the programming language of the web. It adds interactivity and dynamic behavior to websites.

## Key Concepts:
- Variables and Data Types
- Functions
- Control Flow (if/else, loops)
- DOM Manipulation
- Events

Modern JavaScript (ES6+) has introduced powerful features like arrow functions, destructuring, async/await, and modules that make development more efficient.`,
    },
  });

  await prisma.article.create({
    data: {
      title: "React Hooks Deep Dive",
      slug: "react-hooks-deep-dive",
      category: "Technology",
      parentId: reactGuide.id,
      content: `Hooks are functions that let you use state and other React features in functional components.

## Common Hooks:
- **useState** - Add state to components
- **useEffect** - Perform side effects
- **useContext** - Access context values
- **useRef** - Create mutable references
- **useMemo** - Memoize expensive calculations
- **useCallback** - Memoize functions

Hooks revolutionized React development by making functional components as powerful as class components.`,
    },
  });

  console.log("Database seeded successfully!");
  console.log(`Created 7 articles with parent-child relationships.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
