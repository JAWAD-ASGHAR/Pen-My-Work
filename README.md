# Pen My Work - AI Handwriting Generator

Transform your digital text into authentic handwritten pages instantly. Perfect for assignments, notes, letters, and creative projects.

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Handwriting**: Convert typed text to realistic handwritten pages
- **Multiple Paper Styles**: Ruled, blank, and grid paper options
- **Customizable Ink Colors**: Choose from various ink colors and styles
- **High-Quality Output**: Generate HD images suitable for printing
- **Bulk Processing**: Handle multiple pages efficiently

### 📱 User Experience
- **Intuitive 5-Step Process**: Simple workflow from text to handwritten pages
- **Real-time Preview**: See your content as you type
- **Assignment Management**: Organize and manage your handwritten content
- **Download Options**: Multiple formats including PNG, PDF, and ZIP

### 💳 Subscription Management
- **Free Plan**: 10 pages trial with basic features
- **Pro Plan**: Unlimited pages with premium features
- **Credit System**: Track usage for free plan users
- **Subscription Status**: Handle active, cancelled, and expired subscriptions

## 🏗️ Architecture

### Frontend
- **Next.js 15**: React framework with App Router
- **Chakra UI**: Modern component library
- **TypeScript**: Type-safe development
- **Framer Motion**: Smooth animations
- **GSAP**: Advanced animations

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **Drizzle ORM**: Type-safe database operations
- **PostgreSQL**: Primary database
- **Better Auth**: Authentication system
- **Lemon Squeezy**: Payment processing

### AI & Processing
- **OpenAI API**: AI-powered text processing
- **Image Generation**: Create handwritten page images
- **File Processing**: Handle multiple formats and downloads

## 📊 Database Schema

### Core Tables
- **Users**: Authentication and user management
- **Assignments**: User-generated handwritten content
- **Subscriptions**: Payment and plan management
- **User Credits**: Free plan usage tracking
- **Plans**: Available subscription tiers

### Key Relationships
- One user can have one active subscription
- Users can have multiple assignments
- Credits are tracked per user for free plan

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- OpenAI API key
- Lemon Squeezy account
- Google OAuth credentials

### Environment Variables
Create a `.env.local` file with:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/penmywork"

# Authentication
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Lemon Squeezy
LEMONSQUEEZY_API_KEY="your-lemonsqueezy-api-key"
LEMONSQUEEZY_WEBHOOK_SECRET="your-webhook-secret"

# App
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
```

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Pen-My-Work
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up the database**
```bash
# Run migrations
npm run db:migrate

# Sync plans to database
npm run sync-plans
```

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Pen-My-Work/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (protected)/       # Protected user pages
│   ├── (public)/          # Public pages (plans, etc.)
│   └── api/               # API routes
├── components/            # React components
│   ├── create/           # Assignment creation flow
│   └── ...               # Other UI components
├── server/               # Server actions
│   └── actions/          # Database and API actions
├── src/                  # Source code
│   ├── config/           # Configuration files
│   ├── db/               # Database schema and setup
│   └── ...
├── lib/                  # Utility libraries
├── utils/                # Helper functions
└── public/               # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run sync-plans` - Sync plans to database

## 💳 Subscription Plans

### Free Plan
- 10 handwritten pages trial
- Basic handwriting styles
- Standard paper types
- Email support
- 720p image quality

### Pro Plan ($5/month)
- Unlimited handwritten pages
- All handwriting styles
- All paper types
- Priority email support
- 1080p HD image quality
- Bulk processing (up to 10 pages)
- Custom ink colors
- No watermarks

## 🔐 Authentication & Security

- **Google OAuth**: Secure user authentication
- **Session Management**: Persistent user sessions
- **Route Protection**: Middleware-based access control
- **Database Security**: Row-level security (RLS)
- **Webhook Verification**: Secure payment processing

## 🎨 UI/UX Features

- **Responsive Design**: Works on all devices
- **Dark/Light Mode**: User preference support
- **Loading States**: Smooth user feedback
- **Error Handling**: Graceful error management
- **Accessibility**: WCAG compliant components

## 🔄 Webhook Integration

The application handles various Lemon Squeezy webhooks:
- `subscription_created` - New subscription
- `subscription_updated` - Subscription changes
- `subscription_cancelled` - Subscription cancellation

## 📈 Performance

- **Turbopack**: Fast development builds
- **Image Optimization**: Optimized image delivery
- **Database Indexing**: Efficient queries
- **Caching**: Strategic caching for better performance

## 🧪 Testing

- **TypeScript**: Compile-time error checking
- **ESLint**: Code quality enforcement
- **Next.js Built-in**: Framework-level optimizations

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Other Platforms
- **Netlify**: Static site hosting
- **Railway**: Full-stack deployment
- **DigitalOcean**: Custom server deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check the code comments
- **Issues**: Report bugs on GitHub
- **Discussions**: Ask questions in GitHub Discussions

## 🔮 Roadmap

- [ ] Mobile app development
- [ ] Advanced handwriting styles
- [ ] Team collaboration features
- [ ] API for third-party integrations
- [ ] Advanced export formats
- [ ] Real-time collaboration

---

Built with ❤️ using Next.js, Chakra UI, and OpenAI
