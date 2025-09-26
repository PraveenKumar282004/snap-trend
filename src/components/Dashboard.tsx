import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertTriangle, Eye, ShoppingCart, Activity, Zap } from 'lucide-react';
import { TrendingProductsList } from './TrendingProductsList';
import { ActivityChart } from './ActivityChart';
import { AlertsPanel } from './AlertsPanel';
import { MetricsGrid } from './MetricsGrid';

interface TrendingProduct {
  id: string;
  name: string;
  category: string;
  currentActivity: number;
  baseline: number;
  spike: number;
  timestamp: string;
  image: string;
}

interface ActivityData {
  timestamp: string;
  views: number;
  carts: number;
  productId: string;
}

interface Alert {
  id: string;
  productId: string;
  productName: string;
  type: 'spike' | 'trending' | 'critical';
  message: string;
  timestamp: string;
  severity: number;
}

const Dashboard = () => {
  const [trendingProducts, setTrendingProducts] = useState<TrendingProduct[]>([]);
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLive, setIsLive] = useState(true);

  // Mock real-time data simulation
  useEffect(() => {
    const mockProducts: TrendingProduct[] = [
      {
        id: 'p1',
        name: 'Wireless AirPods Pro',
        category: 'Electronics',
        currentActivity: 847,
        baseline: 45,
        spike: 18.8,
        timestamp: new Date().toISOString(),
        image: '/placeholder.svg'
      },
      {
        id: 'p2',
        name: 'Gaming Mechanical Keyboard',
        category: 'Accessories',
        currentActivity: 623,
        baseline: 32,
        spike: 19.5,
        timestamp: new Date().toISOString(),
        image: '/placeholder.svg'
      },
      {
        id: 'p3',
        name: 'Smart Home Hub',
        category: 'Smart Home',
        currentActivity: 445,
        baseline: 28,
        spike: 15.9,
        timestamp: new Date().toISOString(),
        image: '/placeholder.svg'
      }
    ];

    const mockActivityData: ActivityData[] = Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - (29 - i) * 60000).toISOString(),
      views: Math.floor(Math.random() * 500) + 200,
      carts: Math.floor(Math.random() * 50) + 10,
      productId: 'p1'
    }));

    const mockAlerts: Alert[] = [
      {
        id: 'a1',
        productId: 'p1',
        productName: 'Wireless AirPods Pro',
        type: 'critical',
        message: 'Activity spike detected: 1847% above baseline',
        timestamp: new Date().toISOString(),
        severity: 9
      },
      {
        id: 'a2',
        productId: 'p2',
        productName: 'Gaming Mechanical Keyboard',
        type: 'trending',
        message: 'Trending up: 1950% increase in views',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        severity: 7
      }
    ];

    setTrendingProducts(mockProducts);
    setActivityData(mockActivityData);
    setAlerts(mockAlerts);

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (isLive) {
        // Update activity data
        setActivityData(prev => {
          const newData = [...prev.slice(1)];
          newData.push({
            timestamp: new Date().toISOString(),
            views: Math.floor(Math.random() * 500) + 200,
            carts: Math.floor(Math.random() * 50) + 10,
            productId: 'p1'
          });
          return newData;
        });

        // Occasionally add new trending products or alerts
        if (Math.random() > 0.95) {
          const newProduct = {
            id: `p${Date.now()}`,
            name: `Product ${Math.floor(Math.random() * 1000)}`,
            category: 'Electronics',
            currentActivity: Math.floor(Math.random() * 300) + 400,
            baseline: Math.floor(Math.random() * 50) + 20,
            spike: Math.random() * 10 + 10,
            timestamp: new Date().toISOString(),
            image: '/placeholder.svg'
          };
          
          setTrendingProducts(prev => [newProduct, ...prev.slice(0, 4)]);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Real-Time Herd Behavior Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            E-commerce trending products detection system
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant={isLive ? "default" : "secondary"} className="px-3 py-1">
            <Activity className="w-3 h-3 mr-1" />
            {isLive ? 'Live' : 'Paused'}
          </Badge>
          
          <Button
            variant={isLive ? "outline" : "default"}
            size="sm"
            onClick={() => setIsLive(!isLive)}
            className="min-w-[80px]"
          >
            {isLive ? 'Pause' : 'Resume'}
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <MetricsGrid />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Products */}
        <div className="lg:col-span-2">
          <TrendingProductsList products={trendingProducts} />
        </div>

        {/* Alerts Panel */}
        <div>
          <AlertsPanel alerts={alerts} />
        </div>
      </div>

      {/* Activity Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Real-Time Activity Stream
          </CardTitle>
          <CardDescription>
            Live product interaction events (views & cart additions)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityChart data={activityData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;