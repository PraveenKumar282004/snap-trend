import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  TrendingUp, 
  Eye, 
  ShoppingCart, 
  Users, 
  Zap,
  AlertTriangle,
  Database
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

export const Overview = () => {
  const [metrics, setMetrics] = useState({
    totalEvents: 12847,
    activeUsers: 8924,
    trendingProducts: 8,
    alertsCount: 3,
    systemHealth: 99.9,
    eventRate: 214.2
  });

  // Mock data for charts
  const activityData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    events: Math.floor(Math.random() * 500) + 200,
    users: Math.floor(Math.random() * 200) + 100,
    alerts: Math.floor(Math.random() * 5)
  }));

  const trendingData = [
    { product: 'AirPods Pro', spike: 1847, category: 'Electronics' },
    { product: 'Gaming Keyboard', spike: 1623, category: 'Accessories' },
    { product: 'Smart Watch', spike: 1445, category: 'Wearables' },
    { product: 'Wireless Mouse', spike: 1234, category: 'Accessories' },
    { product: 'Phone Case', spike: 987, category: 'Accessories' }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neon-cyan flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Event Stream
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metrics.totalEvents.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-neon-green">+23.4%</span> from last hour
            </div>
            <div className="text-xs text-neon-cyan mt-2">
              {metrics.eventRate}/sec current rate
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-glass border-glass-border backdrop-blur-glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neon-purple flex items-center gap-2">
              <Users className="w-4 h-4" />
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metrics.activeUsers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-neon-green">+18.2%</span> active users
            </div>
            <div className="text-xs text-neon-purple mt-2">
              Avg. session: 4.2 min
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-glass border-glass-border backdrop-blur-glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neon-green flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trending Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metrics.trendingProducts}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-neon-green">+2</span> new detections
            </div>
            <div className="text-xs text-neon-green mt-2">
              Max spike: +1847%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-glass border-glass-border backdrop-blur-glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neon-orange flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metrics.alertsCount}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-neon-orange">1 critical</span>, 2 warnings
            </div>
            <div className="text-xs text-neon-orange mt-2">
              Response time: 0.3s
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Timeline */}
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-glass">
          <CardHeader>
            <CardTitle className="text-neon-cyan flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Real-Time Activity Stream
            </CardTitle>
            <CardDescription>Event processing over the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <XAxis 
                    dataKey="hour" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="events"
                    stroke="hsl(var(--neon-cyan))"
                    fill="hsl(var(--neon-cyan) / 0.2)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(var(--neon-purple))"
                    fill="hsl(var(--neon-purple) / 0.1)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Trending */}
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-glass">
          <CardHeader>
            <CardTitle className="text-neon-green flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top Trending Products
            </CardTitle>
            <CardDescription>Products with highest activity spikes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingData.map((item, index) => (
                <div key={item.product} className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-glass-border">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-gradient-cyber text-white font-bold min-w-[24px] justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium text-sm text-foreground">{item.product}</div>
                      <div className="text-xs text-muted-foreground">{item.category}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-neon-green">+{item.spike}%</div>
                    <div className="text-xs text-muted-foreground">spike</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="bg-gradient-glass border-glass-border backdrop-blur-glass">
        <CardHeader>
          <CardTitle className="text-neon-cyan flex items-center gap-2">
            <Database className="w-5 h-5" />
            System Performance Monitor
          </CardTitle>
          <CardDescription>Real-time infrastructure and processing metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-card/30 border border-glass-border">
              <div className="text-2xl font-bold text-neon-cyan">{metrics.systemHealth}%</div>
              <div className="text-sm text-muted-foreground">System Health</div>
              <Badge className="mt-2 bg-neon-green/20 text-neon-green border-neon-green/50">
                Optimal
              </Badge>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/30 border border-glass-border">
              <div className="text-2xl font-bold text-neon-purple">0.3ms</div>
              <div className="text-sm text-muted-foreground">Avg Latency</div>
              <Badge className="mt-2 bg-neon-green/20 text-neon-green border-neon-green/50">
                Excellent
              </Badge>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/30 border border-glass-border">
              <div className="text-2xl font-bold text-neon-green">99.97%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
              <Badge className="mt-2 bg-neon-green/20 text-neon-green border-neon-green/50">
                Stable
              </Badge>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/30 border border-glass-border">
              <div className="text-2xl font-bold text-neon-orange">23.4GB</div>
              <div className="text-sm text-muted-foreground">Data Processed</div>
              <Badge className="mt-2 bg-neon-green/20 text-neon-green border-neon-green/50">
                Normal
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};