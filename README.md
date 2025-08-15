# Pen-My-Work ✨

Transform your digital text into beautiful, realistic handwritten documents using AI. Pen-My-Work is a Next.js application that generates handwritten-style text on various paper types with customizable writing styles and ink colors.

## 🚀 Features

- **AI-Powered Handwriting Generation**: Convert digital text into realistic handwritten text
- **Multiple Paper Types**: Choose from ruled, plain, grid, and lined paper styles
- **Customizable Writing Styles**: Various handwriting fonts including Caveat and more
- **Ink Color Customization**: Pick from predefined colors or use a custom color picker
- **User Authentication**: Secure sign-in with Supabase authentication
- **Subscription Plans**: Freemium model with paid plans via Lemon Squeezy
- **Credit System**: Usage-based credits for free plan users
- **Assignment Management**: Save and manage your generated documents
- **Responsive Design**: Beautiful, modern UI built with Chakra UI
- **Real-time Generation**: Instant preview and download capabilities

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **UI Framework**: Chakra UI with Framer Motion animations
- **Authentication**: Supabase Auth with Better Auth
- **Database**: PostgreSQL with Drizzle ORM
- **Payment Processing**: Lemon Squeezy
- **AI Integration**: OpenAI API
- **Styling**: CSS-in-JS with Emotion
- **Animations**: GSAP for smooth animations
- **Image Processing**: html-to-image, jsPDF for document generation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pen-my-work.git
   cd pen-my-work
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key

   # Lemon Squeezy
   LEMONSQUEEZY_API_KEY=your_lemonsqueezy_api_key
   LEMONSQUEEZY_WEBHOOK_SECRET=your_webhook_secret

   # Database
   DATABASE_URL=your_postgresql_connection_string
   ```

4. **Set up the database**
   ```bash
   # Run database migrations
   npm run db:push
   
   # Sync plans (if using Lemon Squeezy)
   npm run sync-plans
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
Pen-My-Work/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (protected)/       # Protected user routes
│   ├── (public)/          # Public routes
│   └── api/               # API routes
├── components/            # React components
│   ├── create/           # Creation flow components
│   └── ...               # Other UI components
├── lib/                  # Utility libraries
├── server/               # Server actions
├── src/                  # Source code
│   ├── config/           # Configuration files
│   └── db/               # Database schema and setup
├── utils/                # Utility functions
└── public/               # Static assets
```

## 🎯 Key Components

### Creation Flow
The app features a 5-step creation process:
1. **Paper Type Selection** - Choose paper style (ruled, plain, grid, etc.)
2. **Writing Style** - Select handwriting font
3. **Ink Color** - Pick ink color with custom color picker
4. **Content Input** - Enter your text with character count
5. **Generation** - AI processes and generates handwritten text

### Authentication
- Supabase-based authentication
- Protected routes for user-specific features
- Session management with Better Auth

### Subscription System
- Freemium model with free and paid plans
- Lemon Squeezy integration for payments
- Credit system for usage tracking
- Webhook handling for subscription events

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run sync-plans` - Sync Lemon Squeezy plans

### Database Management
```bash
# Generate migration
npx drizzle-kit generate

# Push schema changes
npx drizzle-kit push

# View database
npx drizzle-kit studio
```

## 📱 Usage

1. **Sign Up/Login**: Create an account or sign in
2. **Choose Plan**: Select a free or paid plan
3. **Create Document**: Follow the 5-step creation process
4. **Generate**: AI will process your text and generate handwritten output
5. **Download**: Save your generated document as PDF or image

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the documentation
- Contact support through the app

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Supabase for authentication and database
- Chakra UI for the beautiful component library
- Lemon Squeezy for payment processing
- The open-source community for various tools and libraries

---

Made with ❤️ by the Pen-My-Work team
