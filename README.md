Rap It Up 🎤
Rap It Up is a rap battle platform where users can connect their wallets, showcase their skills, and earn rewards. The platform features a pixelated, retro-inspired design with a vibrant yellow and orange theme. Users can participate in daily, weekly, and all-time leaderboards, connect their MetaMask wallets, and start rapping to climb the ranks!

Features ✨
Pixelated Design: A retro, pixelated UI with vibrant yellow and orange colors.

Wallet Integration: Connect your MetaMask wallet to participate.

Leaderboards: Compete in daily, weekly, and all-time leaderboards.

Dynamic Background: Animated GIFs and floating effects in the background.

Responsive Design: Works seamlessly on desktop and mobile devices.

Technologies Used 🛠️
Frontend:

Next.js - React framework for server-side rendering and static site generation.

Tailwind CSS - Utility-first CSS framework for styling.

shadcn/ui - Reusable UI components.

Lucide Icons - Beautiful and customizable icons.

Wallet Integration:

MetaMask - Browser extension for Ethereum wallet integration.

Animations:

CSS animations for floating effects and glitch animations.

Getting Started 🚀
Prerequisites
Node.js (v18 or higher)

npm or yarn

MetaMask browser extension

Installation
Clone the repository:

bash
Copy
git clone https://github.com/your-username/rap-it-up.git
cd rap-it-up
Install dependencies:

bash
Copy
npm install
# or
yarn install
Run the development server:

bash
Copy
npm run dev
# or
yarn dev
Open your browser:
Visit http://localhost:3000 to view the app.

Environment Variables
Create a .env.local file in the root directory and add the following variables:

env
Copy
NEXT_PUBLIC_INFURA_ID=your-infura-project-id
NEXT_PUBLIC_ALCHEMY_KEY=your-alchemy-api-key
Connecting Your Wallet
Click the Connect MetaMask button on the homepage.

Approve the connection request in your MetaMask extension.

Once connected, you'll be redirected to the song selection page.

Project Structure 📂
Copy
rap-it-up/
├── components/            # Reusable UI components
│   ├── pixelated-background.tsx
│   ├── pixelated-title.tsx
│   └── ui/                # shadcn/ui components
├── pages/                 # Next.js pages
│   ├── index.tsx          # Homepage
│   ├── connect.tsx        # Wallet connection page
│   ├── leaderboard.tsx    # Leaderboard page
│   └── songs.tsx          # Song selection page
├── public/                # Static assets
│   ├── Pixelart/          # GIFs and pixel art
│   └── fonts/             # Custom fonts
├── styles/                # Global styles
│   └── globals.css
├── README.md              # Project documentation
├── package.json           # Node.js dependencies
└── next.config.js         # Next.js configuration
