import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Server, Database, Cpu, HardDrive, Wifi, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';

export const SystemHealth = () => {
  // Mock system metrics
  const systemMetrics = [
    {
      id: 'cpu',
      name: 'CPU Usage',
      value: 45.2,
      status: 'healthy',
      icon: Cpu,
      unit: '%',
      threshold: 80
    },
    {
      id: 'memory',
      name: 'Memory Usage',
      value: 62.8,
      status: 'healthy',
      icon: HardDrive,
      unit: '%',
      threshold: 85
    },
    {
      id: 'disk',
      name: 'Disk I/O',
      value: 23.4,
      status: 'healthy',
      icon: Database,
      unit: 'MB/s',
      threshold: 100
    },
    {
      id: 'network',
      name: 'Network',
      value: 1.2,
      status: 'healthy',
      icon: Wifi,
      unit: 'GB/s',
      threshold: 5
    }
  ];

  const uptimeData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    uptime: 99.5 + Math.random() * 0.5,
    response: 200 + Math.random() * 50,
    throughput: 10000 + Math.random() * 3000
  }));

  const performanceData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    cpu: 30 + Math.random() * 40,
    memory: 50 + Math.random() * 30,
    latency: 100 + Math.random() * 100
  }));

  const getStatusColor = (status: string, value: number, threshold: number) => {
    if (status === 'error' || value > threshold * 0.9) {
      return 'text-neon-red';
    }
    if (status === 'warning' || value > threshold * 0.7) {
      return 'text-neon-orange';
    }
    return 'text-neon-green';
  };

  const getStatusBadge = (status: string, value: number, threshold: number) => {
    if (status === 'error' || value > threshold * 0.9) {
      return 'bg-neon-red/20 text-neon-red border-neon-red/50';
    }
    if (status === 'warning' || value > threshold * 0.7) {
      return 'bg-neon-orange/20 text-neon-orange border-neon-orange/50';
    }
    return 'bg-neon-green/20 text-neon-green border-neon-green/50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-neon-cyan">System Health Monitor</h2>
          <p className="text-sm text-muted-foreground">Infrastructure performance and reliability metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 animate-pulse-fast">
            <Shield className="w-3 h-3 mr-1" />
            99.97% Uptime
          </Badge>
          <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50">
            <Activity className="w-3 h-3 mr-1" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* System Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric) => {
          const Icon = metric.icon;
          const statusColor = getStatusColor(metric.status, metric.value, metric.threshold);
          const statusBadge = getStatusBadge(metric.status, metric.value, metric.threshold);
          
          return (
            <Card key={metric.id} className="bg-gradient-glass border-glass-border backdrop-blur-glass">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Icon className={`w-5 h-5 ${statusColor}`} />
                  <Badge className={statusBadge}>
                    {metric.status.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${statusColor}`}>
                  {metric.value.toFixed(1)}{metric.unit}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Threshold: {metric.threshold}{metric.unit}
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-card/30 rounded-full h-2 mt-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      metric.value > metric.threshold * 0.9 
                        ? 'bg-neon-red' 
                        : metric.value > metric.threshold * 0.7
                        ? 'bg-neon-orange'
                        : 'bg-neon-green'
                    }`}
                    style={{ width: `${(metric.value / metric.threshold) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Performance */}
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-glass">
          <CardHeader>
            <CardTitle className="text-neon-cyan flex items-center gap-2">
              <Server className="w-5 h-5" />
              System Performance (24h)
            </CardTitle>
            <CardDescription>CPU and Memory utilization trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
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
                  <Line
                    type="monotone"
                    dataKey="cpu"
                    stroke="hsl(var(--neon-cyan))"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="memory"
                    stroke="hsl(var(--neon-purple))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Uptime & Reliability */}
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-glass">
          <CardHeader>
            <CardTitle className="text-neon-green flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Uptime & Reliability (30d)
            </CardTitle>
            <CardDescription>System availability and response times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={uptimeData}>
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[99, 100]}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="uptime"
                    stroke="hsl(var(--neon-green))"
                    fill="hsl(var(--neon-green) / 0.2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Status */}
      <Card className="bg-gradient-glass border-glass-border backdrop-blur-glass">
        <CardHeader>
          <CardTitle className="text-neon-cyan flex items-center gap-2">
            <Database className="w-5 h-5" />
            Service Health Status
          </CardTitle>
          <CardDescription>Individual component health and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Kafka Cluster', status: 'operational', latency: '0.3ms', uptime: '99.99%' },
              { name: 'Faust Processors', status: 'operational', latency: '1.2ms', uptime: '99.95%' },
              { name: 'WebSocket Server', status: 'operational', latency: '45ms', uptime: '99.97%' },
              { name: 'Database', status: 'operational', latency: '2.1ms', uptime: '99.98%' },
              { name: 'Load Balancer', status: 'operational', latency: '0.8ms', uptime: '99.99%' },
              { name: 'Monitoring', status: 'operational', latency: '5.2ms', uptime: '99.94%' }
            ].map((service, index) => (
              <div key={index} className="p-4 rounded-lg bg-card/30 border border-glass-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{service.name}</h4>
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
                    {service.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latency:</span>
                    <span className="text-neon-cyan">{service.latency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uptime:</span>
                    <span className="text-neon-green">{service.uptime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};