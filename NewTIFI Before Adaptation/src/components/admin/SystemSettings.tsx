import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  Globe, 
  Shield, 
  Mail, 
  Database, 
  Server, 
  Key, 
  Bell, 
  Eye, 
  Lock, 
  Unlock,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Upload,
  Download,
  Trash2,
  Plus,
  Edit,
  Copy,
  ExternalLink
} from "lucide-react";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'NewTIFI',
    siteDescription: 'Shaping the Future of Technology through Innovation and Regulation',
    siteUrl: 'https://newtifi.com',
    adminEmail: 'admin@newtifi.com',
    timezone: 'UTC',
    language: 'en',
    
    // Security Settings
    enable2FA: true,
    passwordMinLength: 8,
    sessionTimeout: 30,
    enableAuditLogs: true,
    enableRateLimiting: true,
    maxLoginAttempts: 5,
    
    // Email Settings
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: 'noreply@newtifi.com',
    smtpPassword: '********',
    enableEmailNotifications: true,
    
    // Database Settings
    dbHost: 'localhost',
    dbPort: 5432,
    dbName: 'newtifi',
    dbUser: 'newtifi_user',
    backupFrequency: 'daily',
    backupRetention: 30,
    
    // OAuth Settings
    googleClientId: 'your-google-client-id',
    googleClientSecret: '********',
    linkedinClientId: 'your-linkedin-client-id',
    linkedinClientSecret: '********',
    
    // Feature Flags
    enableUserRegistration: true,
    enableOAuth: true,
    enableComments: true,
    enableNotifications: true,
    enableAnalytics: true,
    enableMaintenanceMode: false
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setLoading(true);
    try {
      // API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      toast({
        title: "Settings saved",
        description: "All settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset to default values
      toast({
        title: "Settings reset",
        description: "All settings have been reset to default values.",
      });
    }
  };

  const handleTestConnection = async (type: string) => {
    setLoading(true);
    try {
      // API call to test connection
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      toast({
        title: "Connection successful",
        description: `${type} connection test passed.`,
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: `${type} connection test failed.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
          <p className="text-gray-600">Configure system-wide settings and preferences</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="oauth">OAuth</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic site configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={settings.siteUrl}
                    onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="CET">Central European Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security policies and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable2FA">Enable Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
                </div>
                <Switch
                  id="enable2FA"
                  checked={settings.enable2FA}
                  onCheckedChange={(checked) => setSettings({...settings, enable2FA: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableAuditLogs">Enable Audit Logs</Label>
                  <p className="text-sm text-gray-600">Log all administrative actions</p>
                </div>
                <Switch
                  id="enableAuditLogs"
                  checked={settings.enableAuditLogs}
                  onCheckedChange={(checked) => setSettings({...settings, enableAuditLogs: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableRateLimiting">Enable Rate Limiting</Label>
                  <p className="text-sm text-gray-600">Prevent brute force attacks</p>
                </div>
                <Switch
                  id="enableRateLimiting"
                  checked={settings.enableRateLimiting}
                  onCheckedChange={(checked) => setSettings({...settings, enableRateLimiting: checked})}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => setSettings({...settings, passwordMinLength: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => setSettings({...settings, maxLoginAttempts: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Configure SMTP settings for email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableEmailNotifications">Enable Email Notifications</Label>
                  <p className="text-sm text-gray-600">Send email notifications to users</p>
                </div>
                <Switch
                  id="enableEmailNotifications"
                  checked={settings.enableEmailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, enableEmailNotifications: checked})}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtpHost}
                    onChange={(e) => setSettings({...settings, smtpHost: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) => setSettings({...settings, smtpPort: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input
                    id="smtpUser"
                    value={settings.smtpUser}
                    onChange={(e) => setSettings({...settings, smtpUser: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => setSettings({...settings, smtpPassword: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => handleTestConnection('SMTP')}>
                  <Bell className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database Settings */}
        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Configuration</CardTitle>
              <CardDescription>Database connection and backup settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dbHost">Database Host</Label>
                  <Input
                    id="dbHost"
                    value={settings.dbHost}
                    onChange={(e) => setSettings({...settings, dbHost: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="dbPort">Database Port</Label>
                  <Input
                    id="dbPort"
                    type="number"
                    value={settings.dbPort}
                    onChange={(e) => setSettings({...settings, dbPort: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dbName">Database Name</Label>
                  <Input
                    id="dbName"
                    value={settings.dbName}
                    onChange={(e) => setSettings({...settings, dbName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="dbUser">Database User</Label>
                  <Input
                    id="dbUser"
                    value={settings.dbUser}
                    onChange={(e) => setSettings({...settings, dbUser: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select value={settings.backupFrequency} onValueChange={(value) => setSettings({...settings, backupFrequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="backupRetention">Backup Retention (days)</Label>
                  <Input
                    id="backupRetention"
                    type="number"
                    value={settings.backupRetention}
                    onChange={(e) => setSettings({...settings, backupRetention: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => handleTestConnection('Database')}>
                  <Database className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* OAuth Settings */}
        <TabsContent value="oauth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>OAuth Configuration</CardTitle>
              <CardDescription>Configure OAuth providers for user authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Google OAuth */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Google OAuth</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="googleClientId">Google Client ID</Label>
                    <Input
                      id="googleClientId"
                      value={settings.googleClientId}
                      onChange={(e) => setSettings({...settings, googleClientId: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="googleClientSecret">Google Client Secret</Label>
                    <Input
                      id="googleClientSecret"
                      type="password"
                      value={settings.googleClientSecret}
                      onChange={(e) => setSettings({...settings, googleClientSecret: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* LinkedIn OAuth */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium">LinkedIn OAuth</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkedinClientId">LinkedIn Client ID</Label>
                    <Input
                      id="linkedinClientId"
                      value={settings.linkedinClientId}
                      onChange={(e) => setSettings({...settings, linkedinClientId: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedinClientSecret">LinkedIn Client Secret</Label>
                    <Input
                      id="linkedinClientSecret"
                      type="password"
                      value={settings.linkedinClientSecret}
                      onChange={(e) => setSettings({...settings, linkedinClientSecret: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feature Flags */}
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
              <CardDescription>Enable or disable system features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableUserRegistration">Enable User Registration</Label>
                  <p className="text-sm text-gray-600">Allow new users to register</p>
                </div>
                <Switch
                  id="enableUserRegistration"
                  checked={settings.enableUserRegistration}
                  onCheckedChange={(checked) => setSettings({...settings, enableUserRegistration: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableOAuth">Enable OAuth Login</Label>
                  <p className="text-sm text-gray-600">Allow Google and LinkedIn login</p>
                </div>
                <Switch
                  id="enableOAuth"
                  checked={settings.enableOAuth}
                  onCheckedChange={(checked) => setSettings({...settings, enableOAuth: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableComments">Enable Comments</Label>
                  <p className="text-sm text-gray-600">Allow users to comment on articles</p>
                </div>
                <Switch
                  id="enableComments"
                  checked={settings.enableComments}
                  onCheckedChange={(checked) => setSettings({...settings, enableComments: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableNotifications">Enable Notifications</Label>
                  <p className="text-sm text-gray-600">Send push notifications to users</p>
                </div>
                <Switch
                  id="enableNotifications"
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableAnalytics">Enable Analytics</Label>
                  <p className="text-sm text-gray-600">Track user behavior and metrics</p>
                </div>
                <Switch
                  id="enableAnalytics"
                  checked={settings.enableAnalytics}
                  onCheckedChange={(checked) => setSettings({...settings, enableAnalytics: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableMaintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-gray-600">Put the site in maintenance mode</p>
                </div>
                <Switch
                  id="enableMaintenanceMode"
                  checked={settings.enableMaintenanceMode}
                  onCheckedChange={(checked) => setSettings({...settings, enableMaintenanceMode: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
