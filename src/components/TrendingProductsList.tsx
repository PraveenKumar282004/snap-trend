import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Eye, ShoppingCart, ExternalLink, Zap } from 'lucide-react';

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

interface TrendingProductsListProps {
  products: TrendingProduct[];
}

export const TrendingProductsList = ({ products }: TrendingProductsListProps) => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-trending" />
          Trending Now
        </CardTitle>
        <CardDescription>
          Products experiencing abnormal activity spikes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No trending products detected</p>
            <p className="text-sm">Monitoring for activity spikes...</p>
          </div>
        ) : (
          products.map((product, index) => (
            <div
              key={product.id}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                index === 0 
                  ? 'bg-gradient-trending border-trending/20 shadow-glow' 
                  : 'bg-card border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-sm leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {product.category}
                      </p>
                    </div>
                    
                    {index === 0 && (
                      <Badge className="bg-trending text-trending-foreground shadow-sm">
                        <Zap className="w-3 h-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
                    <div className="text-center">
                      <div className="font-semibold text-lg">
                        {product.currentActivity.toLocaleString()}
                      </div>
                      <div className="text-muted-foreground">Current</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-semibold text-lg">
                        {product.baseline}
                      </div>
                      <div className="text-muted-foreground">Baseline</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-semibold text-lg text-trending">
                        +{product.spike.toFixed(1)}σ
                      </div>
                      <div className="text-muted-foreground">Deviation</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="text-xs text-muted-foreground">
                      {new Date(product.timestamp).toLocaleTimeString()}
                    </div>
                    
                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </Button>
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