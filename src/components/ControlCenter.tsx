import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AnalyticsSidebar } from './AnalyticsSidebar';
import { ControlHeader } from './ControlHeader';
import { Overview } from './sections/Overview';
import { TrendingMonitor } from './sections/TrendingMonitor';
import { AlertCenter } from './sections/AlertCenter';
import { DataStreams } from './sections/DataStreams';
import { SystemHealth } from './sections/SystemHealth';

export type ActiveSection = 'overview' | 'trending' | 'alerts' | 'streams' | 'health';

const ControlCenter = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'trending':
        return <TrendingMonitor />;
      case 'alerts':
        return <AlertCenter />;
      case 'streams':
        return <DataStreams />;
      case 'health':
        return <SystemHealth />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <AnalyticsSidebar 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          
          <div className="flex-1 flex flex-col">
            <ControlHeader activeSection={activeSection} />
            
            <main className="flex-1 p-6 overflow-auto">
              <div className="animate-slide-in">
                {renderActiveSection()}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ControlCenter;