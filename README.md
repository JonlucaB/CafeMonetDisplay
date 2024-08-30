# CafeMonetDisplay
A web app that takes google calendar data and displays it in a table format. This is useful for displaying calendar events depending on what Table they are referring to.


Starting out, we had to create a Google Project and enable the google calendar API on it. Before I was able to finish setting it up, it requested the URI the app would be hosted from (for OAuth 2.0 purposes). Because I hadn't even started this README by that point, I went ahead and began setting everything up.

First, I updated NPM and NodeJS to their latest versions, as I was going to use NextJS to start my react app. Event though NextJS uses NodeJS to render, we can still use NextJS on Github pages if we export the app to a static website (thanks to this blog -> https://www.freecodecamp.org/news/how-to-deploy-next-js-app-to-github-pages/#:~:text=js%20uses%20Node.,static%20page%20generation%20in%20Next.)

"GitHub Pages is designed to host static files, which means we can publish only HTML, CSS, JavaScript (and other static files) there. So we'll need to enable static page generation in Next.js."

"Now after running next build, Next.js will generate an out folder containing static assets for our application. In the next steps, we will take this directory and upload it to GitHub Pages."