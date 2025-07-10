# Open Source Project Explorer 🚀

An AI-enhanced GitHub repository discovery platform that helps developers find, explore, and contribute to open source projects with intelligent recommendations and insights.

## ✨ Features

### 🔍 Intelligent Search
- **AI-powered repository search** across GitHub's vast ecosystem
- **Smart filtering** by language, stars, activity, and more
- **Real-time suggestions** as you type
- **Advanced sorting** options (stars, forks, recent activity)

### 📊 Rich Repository Insights
- **Detailed repository cards** with comprehensive stats
- **Activity graphs** and contribution trends
- **Language breakdown** and technology stack analysis
- **Community health** indicators (issues, PRs, contributors)

### 🤖 AI-Powered Recommendations
- **Similar repositories** based on technology and purpose
- **Contribution opportunities** tailored to your skills
- **Trending projects** in your areas of interest
- **Smart categorization** of projects by type and complexity

### 🎨 Modern UI/UX
- **Responsive design** that works on all devices
- **Dark/light theme** support
- **Smooth animations** and transitions
- **Collapsible filters** for better organization
- **Mobile-first** approach with touch-friendly interactions

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React Context API
- **API Integration**: GitHub REST API

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- GitHub account (for API access)

### Installation

```bash
# Clone the repository
git clone https://github.com/trdp2019/Explore-Github-Insight.git
cd open-source-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env.local` file:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token
VITE_API_BASE_URL=https://api.github.com
```

## 📱 Usage

### Basic Search
1. Enter keywords in the search bar
2. Use filters to narrow down results
3. Browse repository cards with detailed information
4. Click on repositories to view more details

### Advanced Filtering
- **Languages**: Filter by programming languages
- **Stars**: Set minimum star count
- **Date Range**: Filter by creation/update date
- **Sort Options**: Order by stars, forks, or activity

### AI Recommendations
- View similar repositories in the sidebar
- Explore trending projects in your tech stack
- Get personalized contribution suggestions

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── AppLayout.tsx   # Main layout wrapper
│   ├── FilterPanel.tsx # Collapsible filter sidebar
│   ├── Hero.tsx        # Landing page hero section
│   ├── RepoCard.tsx    # Repository display card
│   ├── SearchBar.tsx   # Search input component
│   └── ...             # Other components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## 🎯 Key Components

### FilterPanel
Collapsible sidebar with advanced filtering options:
- Language selection with badges
- Star count slider
- Date range picker
- Sort options dropdown

### RepoCard
Comprehensive repository display with:
- Repository stats (stars, forks, issues)
- Language indicators
- Last update information
- Trending badges
- Quick action buttons

### SearchResults
Organized display of search results with:
- Grid/list view toggle
- Pagination support
- Loading states
- Empty state handling

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Code Style
- ESLint + Prettier for code formatting
- TypeScript for type safety
- Tailwind CSS for styling
- Component-based architecture

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Write TypeScript for all new code
- Follow existing component patterns
- Add proper error handling
- Include responsive design considerations
- Write meaningful commit messages

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for repository data
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling system
- [Lucide](https://lucide.dev/) for icons

## 📞 Support

For support, email tridip@googleit.in

---

**Built with ❤️ for the open source community**
