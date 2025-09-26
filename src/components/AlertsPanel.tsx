import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Bell, Clock, X } from 'lucide-react';

interface Alert {
  id: string;
  productId: string;
  productName: string;
  type: 'spike' | 'trending' | 'critical';
  message: string;
  timestamp: string;
  severity: number;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

export const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  const getAlertVariant = (type: string, severity: number) => {
    if (type === 'critical' || severity >= 8) return 'destructive';
    if (type === 'trending' || severity >= 6) return 'default';
    return 'secondary';
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4" />;
      case 'trending':
        return <Bell className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Card className="shadow-card h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          Live Alerts
          {alerts.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {alerts.length}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Real-time anomaly detection alerts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Bell className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No active alerts</p>
            <p className="text-xs">System monitoring normally</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                alert.type === 'critical' 
                  ? 'bg-destructive/5 border-destructive/20 shadow-alert' 
                  : 'bg-card border-border'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-1 rounded ${
                  alert.type === 'critical' 
                    ? 'bg-destructive/10 text-destructive' 
                    : alert.type === 'trending'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {getAlertIcon(alert.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-sm leading-tight">
                        {alert.productName}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.message}
                      </p>
                    </div>
                    
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 opacity-60 hover:opacity-100">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <Badge variant={getAlertVariant(alert.type, alert.severity)} className="text-xs">
                      {alert.type.toUpperCase()}
                    </Badge>
                    
                    <span className="text-xs text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};