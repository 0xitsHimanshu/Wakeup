# WakeUp

> Keep your servers awake always. Stop losing users to slow cold starts or unexpected downtime.

[![GitHub Stars](https://img.shields.io/github/stars/0xitsHimanshu/Wakeup?style=social)](https://github.com/0xitsHimanshu/Wakeup)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## About

WakeUp is a modern web application designed to prevent server cold starts and ensure your applications remain responsive 24/7. Built with Next.js 15 and powered by cutting-edge technologies, WakeUp provides an elegant solution to keep your services running smoothly without unexpected downtime.

### Key Features

- **Always-On Monitoring** - Keep your servers active and prevent cold starts
- **Lightning Fast** - Built with Next.js 15 for optimal performance
- **Beautiful UI** - Modern, responsive design with dark mode support
- **Secure Authentication** - Google OAuth integration with NextAuth.js
- **Interactive Dashboard** - Monitor and manage your services easily
- **Easy Integration** - Simple setup process to get started quickly

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (React 19)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **3D Graphics:** [Three.js](https://threejs.org/) with React Three Fiber
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Type Safety:** [TypeScript](https://www.typescriptlang.org/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)
- **Animations:** Custom WebGL shaders and particle systems

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/0xitsHimanshu/Wakeup.git
cd Wakeup
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory and add your configuration:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
wakeup/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── actions/           # Server actions
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── features/          # Feature showcase components
│   ├── gl/                # WebGL and 3D components
│   ├── ui/                # Reusable UI components
│   └── shared/            # Shared components
├── lib/                   # Utility libraries
├── hooks/                 # Custom React hooks
├── public/                # Static assets
└── utils/                 # Utility functions
```

## Usage

1. **Sign In** - Use Google authentication to access your dashboard
2. **Add Services** - Configure the servers/services you want to keep awake
3. **Monitor** - Track the status of your services in real-time
4. **Relax** - Let WakeUp handle the rest!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Himanshu**
- GitHub: [@0xitsHimanshu](https://github.com/0xitsHimanshu)

## Show Your Support

Give a ⭐ if this project helped you!

## Contact

For questions or feedback, please open an issue on GitHub.

---

<p align="center">Made by Himanshu</p>