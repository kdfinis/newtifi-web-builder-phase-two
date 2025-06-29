# NewTIFI Web Builder

A comprehensive web platform for the New Technologies and Investment Funds Institute, featuring academic publishing, article management, and dynamic content delivery.

## 🚀 Quick Start

### Option 1: Use the startup script (Recommended)
```bash
./start-servers.sh
```

### Option 2: Manual startup
```bash
# Terminal 1: Start backend server
node simple-admin-server.js

# Terminal 2: Start frontend server
npm run dev
```

## 📱 Access Points

- **Main Website**: http://localhost:8080
- **Admin Panel**: http://localhost:8080/admin
- **Backend API**: http://localhost:3001
- **Publishing Platform**: http://localhost:8080/publishing/journals/investment-management

## 🔧 Features

### Homepage Hero Section
- **Featured Articles**: Displays the 2 most recent featured articles
- **Dynamic Content**: Articles are fetched from the backend API
- **Real-time Updates**: Changes in admin panel reflect immediately

### Publishing Platform
- **Latest Publications**: Shows the 10 most recent articles
- **Article Management**: Full CRUD operations via admin panel
- **PDF Integration**: Direct PDF viewing and downloading
- **ISSN Compliance**: Academic publishing standards

### Admin Panel
- **Article Management**: Add, edit, delete articles
- **Featured Articles**: Mark articles as featured for homepage display
- **Analytics**: View tracking and download statistics
- **User Authentication**: Secure admin access

## 📊 Article Database

The system includes 12 sample articles covering:
- Investment Management
- Regulatory Compliance
- Digital Assets
- Sustainable Finance
- Fintech Innovation
- Risk Management

### Featured Articles (Latest 2)
1. **Machine Learning Applications in Investment Management: Regulatory Considerations**
2. **Climate Risk Assessment in Investment Portfolios: A Luxembourg Perspective**

## 🛠 Technical Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js (HTTP server)
- **Styling**: Tailwind CSS
- **Data Storage**: JSON files
- **PDF Handling**: Direct file serving

## 📁 Key Files

- `simple-admin-server.js` - Backend API server
- `src/pages/Home.tsx` - Homepage with featured articles
- `src/pages/Admin.tsx` - Admin panel interface
- `src/pages/publishing/journals/investment-management.tsx` - Publishing platform
- `data/admin_articles.json` - Article database

## 🔄 Data Flow

1. **Admin Panel** → Updates `data/admin_articles.json`
2. **Backend API** → Serves articles from JSON file
3. **Frontend** → Fetches articles via `/api/articles`
4. **Homepage** → Displays featured articles in hero section
5. **Publishing Page** → Shows latest 10 articles

## 🎯 Key Features

### Dynamic Article Display
- Homepage shows 2 most recent featured articles
- Publishing page shows latest 10 articles
- All content updates automatically when articles are added/edited

### Admin Management
- Login: `karlodefinis@newtifi.com` / `mistamoney`
- Full article CRUD operations
- Featured article management
- View/download tracking

### Responsive Design
- Mobile-friendly interface
- Modern NewTIFI branding
- Smooth animations and transitions

## 🚨 Troubleshooting

### Port Conflicts
If you get port conflicts:
```bash
# Kill processes on ports 8080 and 3001
lsof -ti:8080 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Backend Issues
- Ensure `simple-admin-server.js` is running
- Check that `data/admin_articles.json` exists and is valid JSON
- Verify port 3001 is available

### Frontend Issues
- Ensure all dependencies are installed: `npm install`
- Check that port 8080 is available
- Verify Vite configuration in `vite.config.ts`

## 📈 Future Enhancements

- User registration and authentication
- Advanced analytics dashboard
- Email notifications
- Multi-journal support
- Advanced search and filtering
- Citation tracking
- DOI integration

---

**NewTIFI Web Builder** - Shaping the Future of Technology and Investment Management
