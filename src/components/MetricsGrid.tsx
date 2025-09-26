import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, ShoppingCart, TrendingUp, Activity, Users, Zap } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  description: string;
}

const MetricCard = ({ title, value, change, changeType, icon, description }: MetricCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="shadow-card transition-all duration-300 hover:shadow-glow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs font-medium ${getChangeColor()}`}>
            {change}
          </span>
          <span className="text-xs text-muted-foreground">
            {description}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Events/min"
        value="12,847"
        change="+23%"
        changeType="positive"
        icon={<Activity className="h-4 w-4" />}
        description="from last hour"
      />
      
      <MetricCard
        title="Product Views"
        value="8,924"
        change="+18%"
        changeType="positive"
        icon={<Eye className="h-4 w-4" />}
        description="active sessions"
      />
      
      <MetricCard
        title="Cart Additions"
        value="1,234"
        change="+45%"
        changeType="positive"
        icon={<ShoppingCart className="h-4 w-4" />}
        description="conversion rate"
      />
      
      <MetricCard
        title="Trending Products"
        value="8"
        change="+2"
        changeType="positive"
        icon={<TrendingUp className="h-4 w-4" />}
        description="detected spikes"
      />
    </div>
  );
};