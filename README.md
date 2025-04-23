# DevCrew - Hackathon Team Finder

DevCrew is a platform designed to connect developers for hackathons. Our platform simplifies the process of finding teammates with complementary skills, joining existing teams, and showcasing your work to potential collaborators.

## 🌟 Key Features

### Proof of Work (POW) System - Our MVP ✨

The centerpiece of DevCrew is our innovative **Proof of Work (POW)** system, which allows developers to showcase their skills through actual work samples rather than just listing technologies they know.

- **Multi-platform Integration**: Seamlessly embed content from:
  - **Twitter/X**: Display actual tweets with engagement metrics
  - **LinkedIn**: Link to professional posts and updates
  - **GitHub**: Showcase repositories with stars, forks, and language information

- **Rich Content Display**: Each POW item shows:
  - Custom descriptions to provide context
  - Platform-specific styling and information
  - Interactive elements for direct engagement

- **Searchable Portfolio**: Your POWs create a living portfolio that other users can discover through search

POW Feature profiles with skills, interests, and achievements 

![20250423-0506-20 0603065-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/e25fecd7-b5bb-4f64-bf77-b478062520a5)

- **Team Creation**: Create teams for specific hackathons with custom join codes
- **Team Discovery**: Browse and join teams based on skills needed and hackathon goals
- **Real-time Chat**: Communicate with potential teammates before committing
- **Hackathon Directory**: Browse upcoming hackathons and their requirements

## 🚀 Technology Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: NextAuth.js with credential and social providers
- **UI Components**: Shadcn UI with custom animations using Framer Motion
- **Deployment**: Vercel

## 📋 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB database

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/devcrew.git
   cd devcrew
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open https://dev-crew-navy.vercel.app

## 📱 Usage

### Creating Your Profile

1. Sign up for an account
2. Complete your profile with skills, interests, and social links
3. Add Proof of Work items to showcase your abilities

### Finding Teammates

1. Browse available teams or create your own
2. Search for users with specific skills
3. View their profiles and proof of work to evaluate fit
4. Send team invitations or join requests

### Managing Your Team

1. Create a team for a specific hackathon
2. Share your team's join code with potential teammates
3. Communicate with team members through the built-in chat



## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [NextAuth.js](https://next-auth.js.org/)
---

Built with ❤️ by the DevCrew Team
