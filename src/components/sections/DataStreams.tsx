import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Activity, Zap, Wifi, Server, Globe } from 'lucide-react';

export const DataStreams = () => {
  const streamSources = [
    {
      id: 'kafka-main',
      name: 'Apache Kafka Cluster',
      type: 'Event Streaming',
      status: 'active',
      throughput: '12.8K/sec',
      latency: '0.3ms',
      topics: ['user-events', 'product-views', 'cart-actions'],
      partitions: 12,
      consumers: 4
    },
    {
      id: 'web-tracker',
      name: 'JavaScript Web Tracker',
      type: 'Frontend Collection',
      status: 'active',
      throughput: '8.9K/sec',
      latency: '45ms',
      events: ['page_view', 'product_view', 'add_to_cart', 'search'],
      sessions: 8924,
      browsers: ['Chrome', 'Safari', 'Firefox']
    },
    {
      id: 'mobile-sdk',
      name: 'Mobile App SDK',
      type: 'Mobile Collection',
      status: 'active',
      throughput: '3.2K/sec',
      latency: '120ms',
      events: ['app_open', 'product_tap', 'purchase_intent'],
      sessions: 2156,
      platforms: ['iOS', 'Android']
    },
    {
      id: 'faust-processor',
      name: 'Faust Stream Processor',
      type: 'Real-time Processing',
      status: 'active',
      throughput: '12.1K/sec',
      latency: '15ms',
      workers: 8,
      memory: '2.1GB',
      cpu: '45%'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-neon-green/20 text-neon-green border-neon-green/50';
      case 'warning': return 'bg-neon-orange/20 text-neon-orange border-neon-orange/50';
      case 'error': return 'bg-neon-red/20 text-neon-red border-neon-red/50';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'Event Streaming': return <Database className="w-5 h-5 text-neon-purple" />;
      case 'Frontend Collection': return <Globe className="w-5 h-5 text-neon-cyan" />;
      case 'Mobile Collection': return <Wifi className="w-5 h-5 text-neon-green" />;
      case 'Real-time Processing': return <Server className="w-5 h-5 text-neon-orange" />;
      default: return <Activity className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-neon-cyan">Data Stream Control Center</h2>
        <p className="text-sm text-muted-foreground">Real-time monitoring of data pipelines and processing streams</p>
      </div>

      {/* Stream Sources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {streamSources.map((source) => (
          <Card key={source.id} className="bg-gradient-glass border-glass-border backdrop-blur-glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getSourceIcon(source.type)}
                  <div>
                    <CardTitle className="text-lg text-foreground">{source.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{source.type}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(source.status)}>
                  {source.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-card/30 border border-glass-border">
                  <div className="font-bold text-lg text-neon-cyan">{source.throughput}</div>
                  <div className="text-xs text-muted-foreground">Throughput</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-card/30 border border-glass-border">
                  <div className="font-bold text-lg text-neon-purple">{source.latency}</div>
                  <div className="text-xs text-muted-foreground">Latency</div>
                </div>
              </div>

              {/* Source-Specific Details */}
              {source.id === 'kafka-main' && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Topics:</span>
                    <span className="text-foreground">{source.topics?.join(', ')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Partitions:</span>
                    <span className="text-foreground">{source.partitions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Consumers:</span>
                    <span className="text-foreground">{source.consumers}</span>
                  </div>
                </div>
              )}

              {source.id === 'web-tracker' && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Sessions:</span>
                    <span className="text-foreground">{source.sessions?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Event Types:</span>
                    <span className="text-foreground">{source.events?.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Browsers:</span>
                    <span className="text-foreground">{source.browsers?.join(', ')}</span>
                  </div>
                </div>
              )}

              {source.id === 'mobile-sdk' && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Sessions:</span>
                    <span className="text-foreground">{source.sessions?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Platforms:</span>
                    <span className="text-foreground">{source.platforms?.join(', ')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Event Types:</span>
                    <span className="text-foreground">{source.events?.length}</span>
                  </div>
                </div>
              )}

              {source.id === 'faust-processor' && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Workers:</span>
                    <span className="text-foreground">{source.workers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Memory Usage:</span>
                    <span className="text-foreground">{source.memory}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">CPU Usage:</span>
                    <span className="text-foreground">{source.cpu}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Flow Visualization */}
      <Card className="bg-gradient-glass border-glass-border backdrop-blur-glass">
        <CardHeader>
          <CardTitle className="text-neon-cyan flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Data Pipeline Flow
          </CardTitle>
          <CardDescription>Real-time event processing architecture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-6 bg-card/20 rounded-lg border border-glass-border">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-cyber flex items-center justify-center mb-2">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="font-medium text-sm text-foreground">E-commerce Site</div>
              <div className="text-xs text-muted-foreground">User Events</div>
            </div>
            
            <div className="flex-1 h-px bg-gradient-to-r from-neon-cyan to-neon-purple mx-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple animate-pulse opacity-50"></div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-alert flex items-center justify-center mb-2">
                <Database className="w-8 h-8 text-white" />
              </div>
              <div className="font-medium text-sm text-foreground">Kafka Cluster</div>
              <div className="text-xs text-muted-foreground">Event Streaming</div>
            </div>
            
            <div className="flex-1 h-px bg-gradient-to-r from-neon-purple to-neon-green mx-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-green animate-pulse opacity-50"></div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-success flex items-center justify-center mb-2">
                <Server className="w-8 h-8 text-white" />
              </div>
              <div className="font-medium text-sm text-foreground">Faust Processor</div>
              <div className="text-xs text-muted-foreground">Anomaly Detection</div>
            </div>
            
            <div className="flex-1 h-px bg-gradient-to-r from-neon-green to-neon-cyan mx-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-cyan animate-pulse opacity-50"></div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-cyber flex items-center justify-center mb-2">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="font-medium text-sm text-foreground">Dashboard</div>
              <div className="text-xs text-muted-foreground">Live Visualization</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};