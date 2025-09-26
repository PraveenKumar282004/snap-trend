import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Settings, 
  Filter, 
  Calendar, 
  Download, 
  Pause, 
  Play,
  ChevronDown,
  Clock,
  Users,
  Globe
} from 'lucide-react';
import { ActiveSection } from './ControlCenter';

interface ControlHeaderProps {
  activeSection: ActiveSection;
}

const sectionTitles = {
  overview: 'Command Center Overview',
  trending: 'Trend Monitoring Station',
  alerts: 'Alert Management Center',
  streams: 'Data Stream Control',
  health: 'System Health Monitor'
};

export const ControlHeader = ({ activeSection }: ControlHeaderProps) => {
  const [isLive, setIsLive] = useState(true);
  const [timeRange, setTimeRange] = useState('Last 1 Hour');
  const [dataSource, setDataSource] = useState('All Sources');

  return (
    <header className="border-b border-glass-border bg-gradient-glass backdrop-blur-glass p-6">
      <div className="flex items-center justify-between">
        {/* Title Section */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neon-cyan">
              {sectionTitles[activeSection]}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
                <Clock className="w-3 h-3 mr-1" />
                Live
              </Badge>
              <span className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex items-center gap-3">
          {/* Time Range Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-card/50 border-glass-border hover:border-neon-cyan/50"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {timeRange}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="bg-card/90 backdrop-blur-md border-glass-border"
              align="end"
            >
              <DropdownMenuLabel>Time Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTimeRange('Last 15 Minutes')}>
                Last 15 Minutes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange('Last 1 Hour')}>
                Last 1 Hour
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange('Last 6 Hours')}>
                Last 6 Hours
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange('Last 24 Hours')}>
                Last 24 Hours
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Data Source Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-card/50 border-glass-border hover:border-neon-cyan/50"
              >
                <Filter className="w-4 h-4 mr-2" />
                {dataSource}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="bg-card/90 backdrop-blur-md border-glass-border"
              align="end"
            >
              <DropdownMenuLabel>Data Sources</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDataSource('All Sources')}>
                <Globe className="w-4 h-4 mr-2" />
                All Sources
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDataSource('Web Tracker')}>
                <Users className="w-4 h-4 mr-2" />
                Web Tracker
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDataSource('Mobile App')}>
                <Users className="w-4 h-4 mr-2" />
                Mobile App
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDataSource('API Events')}>
                <Users className="w-4 h-4 mr-2" />
                API Events
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Live Control */}
          <Button
            variant={isLive ? "default" : "outline"}
            size="sm"
            onClick={() => setIsLive(!isLive)}
            className={`
              ${isLive 
                ? 'bg-gradient-cyber border-neon-cyan shadow-glow-cyan' 
                : 'bg-card/50 border-glass-border hover:border-neon-orange/50'
              }
            `}
          >
            {isLive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isLive ? 'Pause' : 'Resume'}
          </Button>

          {/* Export Data */}
          <Button 
            variant="outline" 
            size="sm"
            className="bg-card/50 border-glass-border hover:border-neon-green/50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          {/* Settings */}
          <Button 
            variant="outline" 
            size="sm"
            className="bg-card/50 border-glass-border hover:border-neon-purple/50"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};