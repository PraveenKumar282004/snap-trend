import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  Database, 
  Shield,
  Zap,
  BarChart3,
  Eye
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { ActiveSection } from './ControlCenter';

interface AnalyticsSidebarProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

const menuItems = [
  {
    id: 'overview' as ActiveSection,
    title: 'Command Center',
    icon: BarChart3,
    badge: null,
    description: 'System Overview'
  },
  {
    id: 'trending' as ActiveSection,
    title: 'Trend Monitor',
    icon: TrendingUp,
    badge: { count: 8, type: 'neon-green' },
    description: 'Live Product Analysis'
  },
  {
    id: 'alerts' as ActiveSection,
    title: 'Alert Center',
    icon: AlertTriangle,
    badge: { count: 3, type: 'neon-orange' },
    description: 'Critical Notifications'
  },
  {
    id: 'streams' as ActiveSection,
    title: 'Data Streams',
    icon: Database,
    badge: null,
    description: 'Real-time Pipelines'
  },
  {
    id: 'health' as ActiveSection,
    title: 'System Health',
    icon: Shield,
    badge: { count: 99.9, type: 'neon-cyan', suffix: '%' },
    description: 'Infrastructure Status'
  }
];

export const AnalyticsSidebar = ({ activeSection, onSectionChange }: AnalyticsSidebarProps) => {
  return (
    <Sidebar className="border-r border-glass-border bg-gradient-glass backdrop-blur-glass">
      <SidebarHeader className="border-b border-glass-border p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-cyber">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-neon-cyan">HERD</h2>
            <p className="text-xs text-muted-foreground">Analytics Control</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-neon-cyan font-semibold mb-4">
            CONTROL MODULES
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSectionChange(item.id)}
                      className={`
                        w-full p-4 rounded-lg border transition-all duration-300 group
                        ${isActive 
                          ? 'bg-gradient-cyber border-neon-cyan shadow-glow-cyan text-white' 
                          : 'bg-card/50 border-glass-border hover:border-neon-cyan/50 hover:bg-card/80'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <Icon 
                            className={`w-5 h-5 transition-all duration-300 ${
                              isActive ? 'text-white' : 'text-neon-cyan group-hover:text-neon-cyan'
                            }`}
                          />
                          <div className="text-left">
                            <div className={`font-medium text-sm ${
                              isActive ? 'text-white' : 'text-foreground'
                            }`}>
                              {item.title}
                            </div>
                            <div className={`text-xs ${
                              isActive ? 'text-white/70' : 'text-muted-foreground'
                            }`}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                        
                        {item.badge && (
                          <Badge 
                            className={`
                              text-xs px-2 py-1 font-bold
                              ${item.badge.type === 'neon-green' 
                                ? 'bg-neon-green/20 text-neon-green border-neon-green/50' 
                                : item.badge.type === 'neon-orange'
                                ? 'bg-neon-orange/20 text-neon-orange border-neon-orange/50'
                                : 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50'
                              }
                            `}
                          >
                            {item.badge.count}{item.badge.suffix || ''}
                          </Badge>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        <div className="mt-8 p-4 rounded-lg bg-card/30 border border-glass-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse-fast"></div>
            <span className="text-sm font-medium text-neon-green">SYSTEM ONLINE</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Processing 12.8K events/min
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};