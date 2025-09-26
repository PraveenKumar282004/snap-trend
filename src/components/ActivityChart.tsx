import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface ActivityData {
  timestamp: string;
  views: number;
  carts: number;
  productId: string;
}

interface ActivityChartProps {
  data: ActivityData[];
}

export const ActivityChart = ({ data }: ActivityChartProps) => {
  const chartData = data.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    views: item.views,
    carts: item.carts,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{`Time: ${label}`}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-muted-foreground">{entry.dataKey}:</span>
                <span className="font-semibold">{entry.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="views" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="carts" 
            stroke="hsl(var(--accent))" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, stroke: "hsl(var(--accent))", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};