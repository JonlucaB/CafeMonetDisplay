# CafeMonetDisplay
A web app that takes google calendar data and displays it in a table format. This is useful for displaying calendar events depending on what Table they are referring to.


Starting out, we had to create a Google Project and enable the google calendar API on it. Before I was able to finish setting it up, it requested the URI the app would be hosted from (for OAuth 2.0 purposes). Because I hadn't even started this README by that point, I went ahead and began setting everything up.

First, I updated NPM and NodeJS to their latest versions, as I was going to use NextJS to start my react app. After realizing I hit my limit on my github pages account, I decided to try something new and went with Vercel.

It was extremely easy to set up and integrate with a hobby account, and looks like it won't be difficult to set up in the future!

I learned that Next JS  has server side rendering. When you are using server side rendering there is no browser. Hence, there will not be any variable window or document. Hence this error shows up. This makes it impossible to use 'document.getElementById()' or anything similar. The solution...? States?

I tried using states at first, but then I ran into issue where I wasn't allowed to use states in server side renderings... In NextJs there's client components and server components, and my sign on buttons are FO SHO client components since they need to render with the client. Not sure the stylistic or major differences between the two, and how to decide between them.

Apparently, to make it a client a component, you put "client component"; at the top of your .js file....

**pro tip, when styling an element and using JSX, just create a 'style = {[key] : [value]}' tag so it can read it properly

the 'onLoad' tag wasn't working for me either, so I used....


So I actually just scrapped my whole 'calendarData.jsx' file  because it was just too messy. It wouldn't load those google scripts and I gave up on that, and it turns out OAuth2.0 is easier on my side than OAuth1.0 ever was. I just need to give it a good redirectURL. I got an implementation of it off of this blog on DESCOPE https://www.descope.com/blog/post/oauth2-react-authentication-authorization



# GoogleCalendarAPI

I set up the Google project to accept requests from the 'https://cafe-monet-display.vercel.app' URI, but who knows if it is actually going to work from there. I want to see how the redirect works, and if I can get multiple users permission to use the project and therefore get access to the Google Calendar API



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
