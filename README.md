# [Dezacord](https://dezacord.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE)

![Dezacord Landing Page](/dezacord.png)

## About Dezacord

This is a fully-functional real-time messaging application that mimics the functionalites of Discord. This application allows users to sign in/out, add/delete servers & channels, assign roles to users, communicate with multiple members in a channel and direct message members too. Along with these features users can also upload images & attachments in their channels/chats and video-stream with other members.
This platform is built using Next.js 13.4, React, shadcn/ui, TailwindCSS, PostgreSQL, Supabase, Prisma, Clerk, WebSockets, LiveKit, and more.

## Key Features

- **Real-time Messaging:** Instantly chat with other users using Socket.io
- **File Attachments:** Send files and images as messages using UploadThing
- **Editing & Deleting Messages:** Edit and delete messages in real-time
- **Voice & Video Calls:** Create text, audio, and video call channels
- **One-on-One Conversations:** Private one-on-one conversations between members
- **Member Management:** Kick members and change their roles
- **Invite System:** Generate unique invite links and set up an invite system
- **Message Batching:** Load messages in batches of 10 for seamless conversation
- **Server Customization:** Create and customize your server
- **Stunning UI:** Beautifully designed using TailwindCSS and shadcn/ui
- **Responsiveness:** Works flawlessly on both desktop and mobile devices
- **Light & Dark Mode:** Choose your preferred viewing mode
- **Websocket Fallback:** Ensures uninterrupted communication using polling
- **Database & ORM:** PostgreSQL for robustness & Prisma for database operations
- **PostgreSQL Database:** Utilize Supabase for your PostgreSQL database
- **Authentication:** Secured the app using Clerk Auth

## Installation

### Clone the repository
To get started, you'll need to clone this repository to your local machine. You can do this by running the following in the command line:

```bash 
git clone https://github.com/Sumer16/dezacord.git 
```

### Install dependencies

Once you've cloned the repository, navigate to the project directory and run npm/yarn install to install all the necessary dependencies.

```bash
cd dezacord

npm install
# or
yarn install
```

### Setup the environment variables

After the dependencies have been installed, create a ```.env``` file in the root of the project and add all necessary API credentials of your own:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_public_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/(sign-in)
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/(sign-up)
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL=your_db_url
DIRECT_URL=your_migration_direct_url

UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_key

LIVEKIT_API_KEY=your_livekit_key
LIVEKIT_API_SECRET=your_livekit_key
NEXT_PUBLIC_LIVEKIT_URL=your_livekit_url

NEXT_PUBLIC_SITE_URL=your_server_url(after deployment)
```

### Setup Prisma

Add MySQL Database (I used PlanetScale, you can use any of your own choice):

```bash
npx prisma generate
npx prisma db push
```

NOTE: I migrated my database from PlanetScale to Supabase. The steps to migrate is very simple for MySQL to PostgreSQL. Check the docs.

### Run the development server

After the dependencies have been installed, you can start the development server by running:

```bash
npm run dev
# or
yarn dev
```

This will start the server at `http://localhost:3000`, and you can view the website in your browser.

Open [`http://localhost:3000`](http://localhost:3000) with your browser to see the result.

## Build for production

```bash
npm run build
# or
yarn build
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

```bash
npm install -g vercel
# or
yarn global add vercel

vercel
```

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Things to say

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Credits

- [CodeWithAntonio](https://www.codewithantonio.com/) => Thanks for making this amazing tutorial! You have always been a great teacher and a great inspiration for developing full-stack projects.
