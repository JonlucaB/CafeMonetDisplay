# CafeMonetDisplay
A web app that takes google calendar data and displays it in a table format. This is useful for displaying calendar events depending on what Table they are referring to.


Starting out, we had to create a Google Project and enable the google calendar API on it. Before I was able to finish setting it up, it requested the URI the app would be hosted from (for OAuth 2.0 purposes). Because I hadn't even started this README by that point, I went ahead and began setting everything up.

First, I updated NPM and NodeJS to their latest versions, as I was going to use NextJS to start my react app. Event though NextJS uses NodeJS to render, we can still use NextJS on Github pages if we export the app to a static website (thanks to this blog -> https://www.freecodecamp.org/news/how-to-deploy-next-js-app-to-github-pages/#:~:text=js%20uses%20Node.,static%20page%20generation%20in%20Next.)

"GitHub Pages is designed to host static files, which means we can publish only HTML, CSS, JavaScript (and other static files) there. So we'll need to enable static page generation in Next.js."

"Now after running next build, Next.js will generate an out folder containing static assets for our application. In the next steps, we will take this directory and upload it to GitHub Pages."

# NextJS Jargon
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
