import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Zap, 
  Eye, 
  ShoppingCart, 
  ExternalLink,
  Filter,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const TrendingMonitor = () => {
  const [sortBy, setSortBy] = useState('spike');
  const [filterCategory, setFilterCategory] = useState('all');

  const trendingProducts = [
    {
      id: 'p1',
      name: 'Wireless AirPods Pro Max',
      category: 'Electronics',
      image: '/placeholder.svg',
      currentActivity: 1847,
      baseline: 45,
      spike: 4102.2,
      sigma: 18.8,
      trend: 'up',
      velocity: '+234/min',
      confidence: 98.5,
      timestamp: '2 min ago',
      status: 'critical'
    },
    {
      id: 'p2',
      name: 'Gaming Mechanical RGB Keyboard',
      category: 'Accessories',
      image: '/placeholder.svg',
      currentActivity: 1623,
      baseline: 32,
      spike: 5071.9,
      sigma: 19.5,
      trend: 'up',
      velocity: '+198/min',
      confidence: 97.2,
      timestamp: '4 min ago',
      status: 'critical'
    },
    {
      id: 'p3',
      name: 'Smart Home Security Hub',
      category: 'Smart Home',
      image: '/placeholder.svg',
      currentActivity: 1445,
      baseline: 28,
      spike: 5160.7,
      sigma: 15.9,
      trend: 'up',
      velocity: '+167/min',
      confidence: 94.8,
      timestamp: '6 min ago',
      status: 'trending'
    },
    {
      id: 'p4',
      name: 'Ultra-Wide Gaming Monitor',
      category: 'Electronics',
      image: '/placeholder.svg',
      currentActivity: 987,
      baseline: 41,
      spike: 2407.3,
      sigma: 12.3,
      trend: 'up',
      velocity: '+89/min',
      confidence: 89.2,
      timestamp: '8 min ago',
      status: 'trending'
    },
    {
      id: 'p5',
      name: 'Ergonomic Office Chair',
      category: 'Furniture',
      image: '/placeholder.svg',
      currentActivity: 756,
      baseline: 67,
      spike: 1128.4,
      sigma: 8.9,
      trend: 'down',
      velocity: '-12/min',
      confidence: 76.5,
      timestamp: '12 min ago',
      status: 'cooling'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-gradient-alert text-white';
      case 'trending': return 'bg-gradient-cyber text-white';
      case 'cooling': return 'bg-neon-orange/20 text-neon-orange border-neon-orange/50';
      default: return 'bg-card/50 text-muted-foreground';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-neon-green';
    if (confidence >= 85) return 'text-neon-cyan';
    if (confidence >= 75) return 'text-neon-orange';
    return 'text-neon-red';
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-neon-cyan">Live Trending Analysis</h2>
          <p className="text-sm text-muted-foreground">Real-time product behavior anomaly detection</p>
        </div>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-card/50 border-glass-border">
                <Filter className="w-4 h-4 mr-2" />
                Category: {filterCategory === 'all' ? 'All' : filterCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card/90 backdrop-blur-md border-glass-border">
              <DropdownMenuItem onClick={() => setFilterCategory('all')}>All Categories</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterCategory('Electronics')}>Electronics</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterCategory('Accessories')}>Accessories</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterCategory('Smart Home')}>Smart Home</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterCategory('Furniture')}>Furniture</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-card/50 border-glass-border">
                Sort: {sortBy === 'spike' ? 'Spike %' : sortBy === 'sigma' ? 'Sigma' : 'Activity'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card/90 backdrop-blur-md border-glass-border">
              <DropdownMenuItem onClick={() => setSortBy('spike')}>By Spike %</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('sigma')}>By Sigma Value</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('activity')}>By Current Activity</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Trending Products List */}
      <div className="grid gap-4">
        {trendingProducts.map((product, index) => (
          <Card key={product.id} className="bg-gradient-glass border-glass-border backdrop-blur-glass">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Product Image */}
                <div className="w-20 h-20 rounded-lg bg-card/50 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <Badge className={`text-xs font-bold ${getStatusColor(product.status)}`}>
                          {product.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline" className="bg-card/50 border-glass-border">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                    <div className="text-center p-3 rounded-lg bg-card/30 border border-glass-border">
                      <div className="font-bold text-lg text-neon-cyan">
                        {product.currentActivity.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Current Activity</div>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-card/30 border border-glass-border">
                      <div className="font-bold text-lg text-foreground">
                        {product.baseline}
                      </div>
                      <div className="text-xs text-muted-foreground">Baseline</div>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-card/30 border border-glass-border">
                      <div className="font-bold text-lg text-neon-green">
                        +{product.spike.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Spike</div>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-card/30 border border-glass-border">
                      <div className="font-bold text-lg text-neon-purple">
                        {product.sigma.toFixed(1)}σ
                      </div>
                      <div className="text-xs text-muted-foreground">Standard Dev</div>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-card/30 border border-glass-border">
                      <div className={`font-bold text-lg ${getConfidenceColor(product.confidence)}`}>
                        {product.confidence.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Confidence</div>
                    </div>
                  </div>

                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        {product.trend === 'up' ? (
                          <ArrowUp className="w-4 h-4 text-neon-green" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-neon-orange" />
                        )}
                        <span className={product.trend === 'up' ? 'text-neon-green' : 'text-neon-orange'}>
                          {product.velocity}
                        </span>
                      </div>
                      
                      <div className="text-muted-foreground">
                        Detected {product.timestamp}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {index === 0 && (
                        <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 animate-pulse-fast">
                          <Zap className="w-3 h-3 mr-1" />
                          HOTTEST
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};