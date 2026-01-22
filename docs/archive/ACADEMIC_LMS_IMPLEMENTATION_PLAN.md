# 🎓 ACADEMIC LMS IMPLEMENTATION PLAN
## NewTIFI Learning Management System for Professors & Article Reviewers

---

## 🎯 **EXECUTIVE SUMMARY**

This plan transforms the NewTIFI website into a comprehensive Learning Management System (LMS) with role-based access control, article management, KPI tracking, and academic collaboration tools. The system will support professors, article reviewers, authors, and members with distinct interfaces and capabilities.

---

## 🏗️ **SYSTEM ARCHITECTURE**

### **1. User Role Hierarchy**

```typescript
// User Role System
enum UserRole {
  ADMIN = 'admin',
  PROFESSOR = 'professor',
  REVIEWER = 'reviewer',
  AUTHOR = 'author',
  MEMBER = 'member'
}

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  profile: UserProfile;
  kpis: UserKPI;
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
}

interface Permission {
  resource: string;
  actions: string[];
}

interface UserProfile {
  avatar?: string;
  bio?: string;
  institution?: string;
  department?: string;
  researchInterests: string[];
  publications: Publication[];
  socialLinks: SocialLink[];
}

interface UserKPI {
  articlesPublished: number;
  articlesReviewed: number;
  reviewScore: number;
  responseTime: number;
  collaborationScore: number;
  lastUpdated: Date;
}
```

### **2. Article Management System**

```typescript
// Article Management
interface Article {
  id: string;
  title: string;
  abstract: string;
  content: string;
  authors: Author[];
  status: ArticleStatus;
  type: ArticleType;
  journal: Journal;
  metadata: ArticleMetadata;
  files: ArticleFile[];
  reviews: Review[];
  kpis: ArticleKPI;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

enum ArticleStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  REVISION_REQUESTED = 'revision_requested',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  PUBLISHED = 'published'
}

enum ArticleType {
  RESEARCH = 'research',
  REVIEW = 'review',
  CASE_STUDY = 'case_study',
  COMMENTARY = 'commentary',
  BOOK_REVIEW = 'book_review'
}

interface Author {
  id: string;
  name: string;
  email: string;
  institution: string;
  orcid?: string;
  isCorresponding: boolean;
}

interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  score: number;
  comments: string;
  recommendations: string[];
  status: ReviewStatus;
  submittedAt: Date;
  deadline: Date;
}

interface ArticleKPI {
  views: number;
  downloads: number;
  citations: number;
  socialShares: number;
  reviewScore: number;
  publicationTime: number;
  lastUpdated: Date;
}
```

---

## 🎨 **USER INTERFACE DESIGN**

### **1. Professor Dashboard**

```typescript
// Professor Dashboard Component
const ProfessorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [kpis, setKpis] = useState<UserKPI | null>(null);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  return (
    <div className="professor-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Professor Dashboard</h1>
        <div className="user-info">
          <img src={user.profile.avatar} alt={user.name} />
          <span>{user.name}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-cards">
        <KPICard
          title="Articles Published"
          value={kpis?.articlesPublished || 0}
          trend="+12%"
          icon={<FileText />}
        />
        <KPICard
          title="Articles Reviewed"
          value={kpis?.articlesReviewed || 0}
          trend="+8%"
          icon={<Eye />}
        />
        <KPICard
          title="Review Score"
          value={kpis?.reviewScore || 0}
          trend="+5%"
          icon={<Star />}
        />
        <KPICard
          title="Response Time"
          value={`${kpis?.responseTime || 0}h`}
          trend="-15%"
          icon={<Clock />}
        />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <ActionCard
          title="Submit New Article"
          description="Upload and submit a new research article"
          icon={<Upload />}
          onClick={() => navigate('/articles/submit')}
        />
        <ActionCard
          title="Review Articles"
          description="Review pending articles"
          icon={<CheckCircle />}
          onClick={() => navigate('/reviews')}
        />
        <ActionCard
          title="Manage Documents"
          description="Organize your research documents"
          icon={<Folder />}
          onClick={() => navigate('/documents')}
        />
        <ActionCard
          title="View Analytics"
          description="Track your performance metrics"
          icon={<BarChart />}
          onClick={() => navigate('/analytics')}
        />
      </div>

      {/* Recent Articles */}
      <div className="recent-articles">
        <h2>Recent Articles</h2>
        <ArticleTable articles={articles} />
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ActivityFeed activities={recentActivity} />
      </div>
    </div>
  );
};
```

### **2. Article Submission Interface**

```typescript
// Article Submission Form
const ArticleSubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    abstract: '',
    content: '',
    authors: [],
    type: ArticleType.RESEARCH,
    journal: '',
    keywords: [],
    files: []
  });

  const handleSubmit = async (data: ArticleFormData) => {
    try {
      const article = await articleService.createArticle(data);
      toast.success('Article submitted successfully');
      navigate(`/articles/${article.id}`);
    } catch (error) {
      toast.error('Failed to submit article');
    }
  };

  return (
    <div className="article-submission">
      <h1>Submit New Article</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Abstract *</label>
            <textarea
              value={formData.abstract}
              onChange={(e) => setFormData({...formData, abstract: e.target.value})}
              rows={6}
              required
            />
          </div>
        </div>

        {/* Authors */}
        <div className="form-section">
          <h2>Authors</h2>
          <AuthorManager
            authors={formData.authors}
            onChange={(authors) => setFormData({...formData, authors})}
          />
        </div>

        {/* Article Type & Journal */}
        <div className="form-section">
          <h2>Classification</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Article Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as ArticleType})}
              >
                <option value={ArticleType.RESEARCH}>Research Article</option>
                <option value={ArticleType.REVIEW}>Review Article</option>
                <option value={ArticleType.CASE_STUDY}>Case Study</option>
                <option value={ArticleType.COMMENTARY}>Commentary</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Target Journal *</label>
              <select
                value={formData.journal}
                onChange={(e) => setFormData({...formData, journal: e.target.value})}
              >
                <option value="">Select Journal</option>
                <option value="investment-management">Investment Management Journal</option>
                <option value="fintech-innovation">FinTech Innovation Journal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Keywords */}
        <div className="form-section">
          <h2>Keywords</h2>
          <KeywordInput
            keywords={formData.keywords}
            onChange={(keywords) => setFormData({...formData, keywords})}
          />
        </div>

        {/* File Upload */}
        <div className="form-section">
          <h2>Attachments</h2>
          <FileUpload
            files={formData.files}
            onChange={(files) => setFormData({...formData, files})}
            accept=".pdf,.doc,.docx"
          />
        </div>

        {/* Content Editor */}
        <div className="form-section">
          <h2>Article Content</h2>
          <RichTextEditor
            value={formData.content}
            onChange={(content) => setFormData({...formData, content})}
          />
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="button" className="btn-secondary">Save Draft</button>
          <button type="submit" className="btn-primary">Submit Article</button>
        </div>
      </form>
    </div>
  );
};
```

### **3. Review Interface**

```typescript
// Article Review Interface
const ArticleReviewInterface: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  return (
    <div className="review-interface">
      <div className="review-sidebar">
        <h2>Pending Reviews</h2>
        <ReviewList
          reviews={reviews}
          onSelect={setSelectedReview}
        />
      </div>
      
      <div className="review-main">
        {selectedReview ? (
          <ReviewForm
            review={selectedReview}
            onSubmit={handleReviewSubmit}
          />
        ) : (
          <div className="no-selection">
            <p>Select a review to begin</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Review Form Component
const ReviewForm: React.FC<{ review: Review; onSubmit: (review: Review) => void }> = ({
  review,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    score: review.score,
    comments: review.comments,
    recommendations: review.recommendations
  });

  return (
    <div className="review-form">
      <div className="article-preview">
        <h2>{review.article.title}</h2>
        <p>{review.article.abstract}</p>
        <div className="article-meta">
          <span>Authors: {review.article.authors.map(a => a.name).join(', ')}</span>
          <span>Submitted: {new Date(review.article.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit({...review, ...formData}); }}>
        <div className="form-group">
          <label>Overall Score (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.score}
            onChange={(e) => setFormData({...formData, score: parseInt(e.target.value)})}
            required
          />
        </div>

        <div className="form-group">
          <label>Comments</label>
          <textarea
            value={formData.comments}
            onChange={(e) => setFormData({...formData, comments: e.target.value})}
            rows={8}
            placeholder="Provide detailed feedback on the article..."
          />
        </div>

        <div className="form-group">
          <label>Recommendations</label>
          <RecommendationInput
            recommendations={formData.recommendations}
            onChange={(recommendations) => setFormData({...formData, recommendations})}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary">Save Draft</button>
          <button type="submit" className="btn-primary">Submit Review</button>
        </div>
      </form>
    </div>
  );
};
```

---

## 🔐 **AUTHENTICATION & AUTHORIZATION**

### **1. Google OAuth Integration**

```typescript
// Google OAuth Service
class GoogleAuthService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor() {
    this.clientId = process.env.GOOGLE_CLIENT_ID!;
    this.clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
    this.redirectUri = process.env.GOOGLE_REDIRECT_URI!;
  }

  async authenticateUser(googleToken: string): Promise<User> {
    try {
      // Verify Google token
      const googleUser = await this.verifyGoogleToken(googleToken);
      
      // Check if user exists in database
      let user = await this.findUserByEmail(googleUser.email);
      
      if (!user) {
        // Create new user with MEMBER role
        user = await this.createUser({
          email: googleUser.email,
          name: googleUser.name,
          role: UserRole.MEMBER,
          profile: {
            avatar: googleUser.picture,
            researchInterests: [],
            publications: [],
            socialLinks: []
          }
        });
      } else {
        // Update last login
        await this.updateLastLogin(user.id);
      }
      
      return user;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }

  async verifyGoogleToken(token: string): Promise<GoogleUser> {
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`);
    if (!response.ok) {
      throw new Error('Invalid Google token');
    }
    return response.json();
  }
}
```

### **2. Role-Based Access Control**

```typescript
// Permission System
class PermissionService {
  private permissions: Map<UserRole, Permission[]> = new Map();

  constructor() {
    this.initializePermissions();
  }

  private initializePermissions() {
    // Admin permissions
    this.permissions.set(UserRole.ADMIN, [
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'articles', actions: ['create', 'read', 'update', 'delete', 'publish'] },
      { resource: 'reviews', actions: ['create', 'read', 'update', 'delete', 'assign'] },
      { resource: 'analytics', actions: ['read'] },
      { resource: 'settings', actions: ['read', 'update'] }
    ]);

    // Professor permissions
    this.permissions.set(UserRole.PROFESSOR, [
      { resource: 'articles', actions: ['create', 'read', 'update', 'publish'] },
      { resource: 'reviews', actions: ['create', 'read', 'update'] },
      { resource: 'documents', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'analytics', actions: ['read'] }
    ]);

    // Reviewer permissions
    this.permissions.set(UserRole.REVIEWER, [
      { resource: 'articles', actions: ['read'] },
      { resource: 'reviews', actions: ['create', 'read', 'update'] }
    ]);

    // Author permissions
    this.permissions.set(UserRole.AUTHOR, [
      { resource: 'articles', actions: ['create', 'read', 'update'] },
      { resource: 'documents', actions: ['create', 'read', 'update', 'delete'] }
    ]);

    // Member permissions
    this.permissions.set(UserRole.MEMBER, [
      { resource: 'articles', actions: ['read'] }
    ]);
  }

  hasPermission(user: User, resource: string, action: string): boolean {
    const userPermissions = this.permissions.get(user.role) || [];
    return userPermissions.some(permission => 
      permission.resource === resource && 
      permission.actions.includes(action)
    );
  }

  canAccessRoute(user: User, route: string): boolean {
    const routePermissions: Map<string, { resource: string; action: string }> = new Map([
      ['/admin', { resource: 'users', action: 'read' }],
      ['/articles/submit', { resource: 'articles', action: 'create' }],
      ['/reviews', { resource: 'reviews', action: 'read' }],
      ['/documents', { resource: 'documents', action: 'read' }],
      ['/analytics', { resource: 'analytics', action: 'read' }]
    ]);

    const permission = routePermissions.get(route);
    if (!permission) return true; // Public routes

    return this.hasPermission(user, permission.resource, permission.action);
  }
}
```

### **3. Admin Authentication**

```typescript
// Admin Authentication
class AdminAuthService {
  private adminCredentials = {
    username: 'admin',
    password: 'B1950'
  };

  async authenticateAdmin(username: string, password: string): Promise<User | null> {
    if (username === this.adminCredentials.username && 
        password === this.adminCredentials.password) {
      
      // Create or get admin user
      let adminUser = await this.findAdminUser();
      if (!adminUser) {
        adminUser = await this.createAdminUser();
      }
      
      return adminUser;
    }
    
    return null;
  }

  private async createAdminUser(): Promise<User> {
    return {
      id: 'admin-001',
      email: 'admin@newtifi.com',
      name: 'System Administrator',
      role: UserRole.ADMIN,
      permissions: this.getAdminPermissions(),
      profile: {
        researchInterests: [],
        publications: [],
        socialLinks: []
      },
      kpis: {
        articlesPublished: 0,
        articlesReviewed: 0,
        reviewScore: 0,
        responseTime: 0,
        collaborationScore: 0,
        lastUpdated: new Date()
      },
      createdAt: new Date(),
      lastLogin: new Date(),
      isActive: true
    };
  }
}
```

---

## 📊 **KPI TRACKING SYSTEM**

### **1. User KPI Dashboard**

```typescript
// KPI Dashboard Component
const KPIDashboard: React.FC = () => {
  const { user } = useAuth();
  const [kpis, setKpis] = useState<UserKPI | null>(null);
  const [trends, setTrends] = useState<KPITrend[]>([]);

  return (
    <div className="kpi-dashboard">
      <h1>Performance Dashboard</h1>
      
      {/* KPI Cards */}
      <div className="kpi-grid">
        <KPICard
          title="Articles Published"
          value={kpis?.articlesPublished || 0}
          target={10}
          trend={trends.find(t => t.metric === 'articlesPublished')?.trend || 0}
          icon={<FileText />}
        />
        <KPICard
          title="Articles Reviewed"
          value={kpis?.articlesReviewed || 0}
          target={20}
          trend={trends.find(t => t.metric === 'articlesReviewed')?.trend || 0}
          icon={<Eye />}
        />
        <KPICard
          title="Review Score"
          value={kpis?.reviewScore || 0}
          target={8.5}
          trend={trends.find(t => t.metric === 'reviewScore')?.trend || 0}
          icon={<Star />}
        />
        <KPICard
          title="Response Time"
          value={`${kpis?.responseTime || 0}h`}
          target={24}
          trend={trends.find(t => t.metric === 'responseTime')?.trend || 0}
          icon={<Clock />}
        />
      </div>

      {/* Charts */}
      <div className="charts-section">
        <div className="chart-container">
          <h3>Publication Trends</h3>
          <LineChart data={trends} />
        </div>
        <div className="chart-container">
          <h3>Review Performance</h3>
          <BarChart data={trends} />
        </div>
      </div>

      {/* Achievements */}
      <div className="achievements-section">
        <h3>Achievements</h3>
        <AchievementList user={user} />
      </div>
    </div>
  );
};
```

### **2. Article Analytics**

```typescript
// Article Analytics Component
const ArticleAnalytics: React.FC<{ articleId: string }> = ({ articleId }) => {
  const [analytics, setAnalytics] = useState<ArticleKPI | null>(null);
  const [views, setViews] = useState<ViewData[]>([]);
  const [downloads, setDownloads] = useState<DownloadData[]>([]);

  return (
    <div className="article-analytics">
      <h2>Article Analytics</h2>
      
      {/* Metrics Overview */}
      <div className="metrics-overview">
        <MetricCard
          title="Total Views"
          value={analytics?.views || 0}
          change={+12}
          icon={<Eye />}
        />
        <MetricCard
          title="Downloads"
          value={analytics?.downloads || 0}
          change={+8}
          icon={<Download />}
        />
        <MetricCard
          title="Citations"
          value={analytics?.citations || 0}
          change={+3}
          icon={<Quote />}
        />
        <MetricCard
          title="Social Shares"
          value={analytics?.socialShares || 0}
          change={+15}
          icon={<Share />}
        />
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Views Over Time</h3>
          <LineChart data={views} />
        </div>
        <div className="chart-card">
          <h3>Download Sources</h3>
          <PieChart data={downloads} />
        </div>
        <div className="chart-card">
          <h3>Geographic Distribution</h3>
          <MapChart data={views} />
        </div>
      </div>
    </div>
  );
};
```

---

## 🚀 **IMPLEMENTATION EXECUTION**

Now I'll execute the implementation across all phases. Let me start with Phase 1:
<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
todo_write
