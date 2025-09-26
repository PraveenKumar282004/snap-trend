import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Bell, 
  Zap,
  Clock,
  X,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

export const AlertCenter = () => {
  const alerts = [
    {
      id: 'alert-1',
      productId: 'p1',
      productName: 'Wireless AirPods Pro Max',
      type: 'critical',
      severity: 9,
      message: 'Extreme activity spike detected: 4102% above baseline (18.8σ)',
      description: 'Product experiencing unprecedented viral trend. Immediate inventory review recommended.',
      timestamp: '2 minutes ago',
      status: 'active',
      actions: ['Notify Inventory', 'Alert Marketing', 'Increase Stock'],
      metrics: {
        currentActivity: 1847,
        baseline: 45,
        spike: 4102,
        confidence: 98.5
      }
    },
    {
      id: 'alert-2',
      productId: 'p2',
      productName: 'Gaming Mechanical RGB Keyboard',
      type: 'critical',
      severity: 8,
      message: 'High-impact trending detected: 5071% increase in user engagement',
      description: 'Strong viral pattern identified. Consider promotional boost campaigns.',
      timestamp: '4 minutes ago',
      status: 'active',
      actions: ['Launch Campaign', 'Social Media Boost', 'Price Optimization'],
      metrics: {
        currentActivity: 1623,
        baseline: 32,
        spike: 5071,
        confidence: 97.2
      }
    },
    {
      id: 'alert-3',
      productId: 'p3',
      productName: 'Smart Home Security Hub',
      type: 'trending',
      severity: 6,
      message: 'Significant trend emergence: 5160% activity boost detected',
      description: 'Consistent upward trajectory. Monitor for potential viral expansion.',
      timestamp: '6 minutes ago',
      status: 'monitoring',
      actions: ['Monitor Trend', 'Prepare Inventory', 'Analyze Competitors'],
      metrics: {
        currentActivity: 1445,
        baseline: 28,
        spike: 5160,
        confidence: 94.8
      }
    },
    {
      id: 'alert-4',
      productId: 'p4',
      productName: 'Ultra-Wide Gaming Monitor',
      type: 'warning',
      severity: 4,
      message: 'Unusual activity pattern: 2407% spike with declining velocity',
      description: 'Peak trend phase detected. Trend may be stabilizing.',
      timestamp: '15 minutes ago',
      status: 'resolved',
      actions: ['Trend Analysis', 'Performance Review'],
      metrics: {
        currentActivity: 987,
        baseline: 41,
        spike: 2407,
        confidence: 89.2
      }
    }
  ];

  const getAlertConfig = (type: string, severity: number) => {
    if (type === 'critical' || severity >= 8) {
      return {
        color: 'bg-gradient-alert text-white border-neon-red/50',
        iconColor: 'text-neon-red',
        glow: 'shadow-glow-orange'
      };
    }
    if (type === 'trending' || severity >= 6) {
      return {
        color: 'bg-gradient-cyber text-white border-neon-cyan/50',
        iconColor: 'text-neon-cyan',
        glow: 'shadow-glow-cyan'
      };
    }
    return {
      color: 'bg-neon-orange/20 text-neon-orange border-neon-orange/50',
      iconColor: 'text-neon-orange',
      glow: ''
    };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertTriangle className="w-4 h-4 text-neon-red animate-pulse-fast" />;
      case 'monitoring':
        return <Bell className="w-4 h-4 text-neon-cyan" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-neon-green" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-neon-cyan">Alert Management Center</h2>
          <p className="text-sm text-muted-foreground">Real-time anomaly notifications and response center</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className="bg-neon-red/20 text-neon-red border-neon-red/50 animate-pulse-fast">
            <AlertTriangle className="w-3 h-3 mr-1" />
            2 Critical
          </Badge>
          <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50">
            <Bell className="w-3 h-3 mr-1" />
            1 Trending
          </Badge>
          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
            <CheckCircle className="w-3 h-3 mr-1" />
            1 Resolved
          </Badge>
        </div>
      </div>

      {/* Alerts List */}
      <div className="grid gap-4">
        {alerts.map((alert) => {
          const config = getAlertConfig(alert.type, alert.severity);
          
          return (
            <Card 
              key={alert.id} 
              className={`bg-gradient-glass border-glass-border backdrop-blur-glass ${config.glow}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Alert Icon & Status */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className={`p-3 rounded-lg ${config.color} ${config.glow}`}>
                      {getStatusIcon(alert.status)}
                    </div>
                    <Badge className={config.color}>
                      Lv.{alert.severity}
                    </Badge>
                  </div>

                  {/* Alert Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground leading-tight">
                          {alert.productName}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Product ID: {alert.productId}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="bg-card/50 border-glass-border">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Product
                        </Button>
                        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Alert Message */}
                    <div className="mb-4 p-4 rounded-lg bg-card/30 border border-glass-border">
                      <h4 className="font-medium text-foreground mb-2">{alert.message}</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="text-center p-2 rounded bg-card/20 border border-glass-border">
                        <div className="font-bold text-neon-cyan">{alert.metrics.currentActivity.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Current</div>
                      </div>
                      <div className="text-center p-2 rounded bg-card/20 border border-glass-border">
                        <div className="font-bold text-foreground">{alert.metrics.baseline}</div>
                        <div className="text-xs text-muted-foreground">Baseline</div>
                      </div>
                      <div className="text-center p-2 rounded bg-card/20 border border-glass-border">
                        <div className="font-bold text-neon-green">+{alert.metrics.spike}%</div>
                        <div className="text-xs text-muted-foreground">Spike</div>
                      </div>
                      <div className="text-center p-2 rounded bg-card/20 border border-glass-border">
                        <div className="font-bold text-neon-purple">{alert.metrics.confidence}%</div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {alert.actions.map((action, index) => (
                          <Button 
                            key={index}
                            size="sm" 
                            variant="outline"
                            className="bg-card/50 border-glass-border hover:border-neon-cyan/50"
                          >
                            {action}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        {alert.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};