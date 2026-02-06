import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Users, 
  FileText, 
  BarChart3, 
  Shield, 
  Settings, 
  Globe, 
  Database,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Upload,
  Mail,
  Bell,
  Search,
  Filter,
  Calendar,
  UserCheck,
  ShieldCheck,
  Globe2,
  Server,
  Database2,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Lock,
  Unlock,
  Key,
  EyeOff
} from "lucide-react";

interface Analytics {
  totalViews: number;
  totalArticles: number;
  totalJournals: number;
  monthlyViews: number[];
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  uptime: number;
  responseTime: number;
  errorRate: number;
}

interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: 'success' | 'error' | 'warning';
  details: string;
}

const AdminDashboard = ({ analytics, activityLog }: { analytics: Analytics; activityLog: ActivityLog[] }) => {
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 45,
    memory: 67,
    disk: 23,
    network: 89
  });

  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([
    {
      id: '1',
      timestamp: '2024-01-15T10:30:00Z',
      user: 'admin@newtifi.com',
      action: 'User Created',
      resource: 'john.doe@example.com',
      status: 'success',
      details: 'New user account created with MEMBER role'
    },
    {
      id: '2',
      timestamp: '2024-01-15T09:15:00Z',
      user: 'system',
      action: 'Backup Completed',
      resource: 'Database',
      status: 'success',
      details: 'Daily backup completed successfully'
    },
    {
      id: '3',
      timestamp: '2024-01-15T08:45:00Z',
      user: 'contributor@example.com',
      action: 'Article Published',
      resource: 'Financial Technology Trends',
      status: 'success',
      details: 'New article published to Investment Management journal'
    },
    {
      id: '4',
      timestamp: '2024-01-15T07:20:00Z',
      user: 'system',
      action: 'Security Alert',
      resource: 'Authentication',
      status: 'warning',
      details: 'Multiple failed login attempts detected'
    }
  ]);

  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'warning',
      title: 'High CPU Usage',
      message: 'CPU usage is above 80% for the last 5 minutes',
      timestamp: '2024-01-15T10:25:00Z'
    },
    {
      id: '2',
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for tonight at 2:00 AM',
      timestamp: '2024-01-15T09:00:00Z'
    },
    {
      id: '3',
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily backup completed successfully',
      timestamp: '2024-01-15T08:00:00Z'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'info':
        return <Bell className="h-4 w-4 text-blue-600" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-600">Overview of system status and activity</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* System Health Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={systemMetrics.cpu > 80 ? 'border-red-200 bg-red-50' : systemMetrics.cpu > 60 ? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50'}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CPU Usage</p>
                <p className="text-2xl font-bold">{systemMetrics.cpu}%</p>
              </div>
              <Cpu className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card className={systemMetrics.memory > 80 ? 'border-red-200 bg-red-50' : systemMetrics.memory > 60 ? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50'}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Memory</p>
                <p className="text-2xl font-bold">{systemMetrics.memory}%</p>
              </div>
              <MemoryStick className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card className={systemMetrics.disk > 80 ? 'border-red-200 bg-red-50' : systemMetrics.disk > 60 ? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50'}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disk Space</p>
                <p className="text-2xl font-bold">{systemMetrics.disk}%</p>
              </div>
              <HardDrive className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card className={systemMetrics.network > 80 ? 'border-red-200 bg-red-50' : systemMetrics.network > 60 ? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50'}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Network</p>
                <p className="text-2xl font-bold">{systemMetrics.network}%</p>
              </div>
              <Network className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers}</p>
                    <p className="text-xs text-green-600">+{analytics.newUsers} this week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Articles</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalArticles}</p>
                    <p className="text-xs text-green-600">+12 this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalViews.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+15% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.activeUsers}</p>
                    <p className="text-xs text-green-600">+8% this week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system and user activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{activity.action}</span>
                        <span className="text-gray-500">by</span>
                        <span className="text-blue-600">{activity.user}</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                    </div>
                    <Badge variant={activity.status === 'success' ? 'default' : activity.status === 'error' ? 'destructive' : 'secondary'}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <UserCheck className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.activeUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Admins</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Globe className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Contributors</p>
                    <p className="text-2xl font-bold text-gray-900">15</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>User engagement and activity metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">User activity charts will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Real-time system metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-sm text-gray-600">{systemMetrics.cpu}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${systemMetrics.cpu > 80 ? 'bg-red-500' : systemMetrics.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${systemMetrics.cpu}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm text-gray-600">{systemMetrics.memory}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${systemMetrics.memory > 80 ? 'bg-red-500' : systemMetrics.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${systemMetrics.memory}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Disk Usage</span>
                    <span className="text-sm text-gray-600">{systemMetrics.disk}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${systemMetrics.disk > 80 ? 'bg-red-500' : systemMetrics.disk > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${systemMetrics.disk}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>Server and application details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Uptime</span>
                    <span className="text-sm text-gray-600">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Response Time</span>
                    <span className="text-sm text-gray-600">120ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Error Rate</span>
                    <span className="text-sm text-gray-600">0.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Database Status</span>
                    <span className="text-sm text-green-600">Healthy</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">SSL Certificate</span>
                    <span className="text-sm text-green-600">Valid</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Status</CardTitle>
                <CardDescription>Current security posture</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">Firewall</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">SSL/TLS</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Key className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">2FA</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Required</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">Audit Logs</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Alerts</CardTitle>
                <CardDescription>Recent security events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.title}</p>
                        <p className="text-xs text-gray-600">{alert.message}</p>
                        <p className="text-xs text-gray-500">{formatDate(alert.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;