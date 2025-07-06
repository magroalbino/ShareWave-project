'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownUp, DollarSign, Wifi, Zap } from 'lucide-react';
import AppHeader from '@/components/header';
import StatsCard from '@/components/stats-card';
import BandwidthConfigurator from '@/components/bandwidth-configurator';
import SmartPricingForm from '@/components/smart-pricing-form';
import RecentConnections from '@/components/recent-connections';
import Image from 'next/image';
import { useState } from 'react';

const hotspots = [
  { top: '20%', left: '15%' },
  { top: '50%', left: '30%' },
  { top: '35%', left: '55%' },
  { top: '60%', left: '80%' },
  { top: '80%', left: '45%' },
];

export default function Dashboard() {
  const [price, setPrice] = useState(0.5);
  
  return (
    <div className="flex-1 space-y-4 bg-background">
      <AppHeader />
      <main className="p-4 md:p-8 pt-4 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Data Shared" value="1.2 TB" icon={<ArrowDownUp className="h-4 w-4 text-muted-foreground" />} description="+20.1% from last month" />
          <StatsCard title="Earnings" value="$2,315.60" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} description="+180.1% from last month" />
          <StatsCard title="Uptime" value="99.8%" icon={<Zap className="h-4 w-4 text-muted-foreground" />} description="Last 24 hours" />
          <StatsCard title="Connections" value="32" icon={<Wifi className="h-4 w-4 text-muted-foreground" />} description="+12 since last hour" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Bandwidth Hotspots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image
                  src="https://placehold.co/1200x675.png"
                  alt="World map with network connections"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-70"
                  data-ai-hint="network world map"
                />
                {hotspots.map((hotspot, index) => (
                  <div
                    key={index}
                    className="absolute w-4 h-4 rounded-full bg-accent/80 border-2 border-background shadow-lg"
                    style={{ top: hotspot.top, left: hotspot.left, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className="absolute inset-0 rounded-full bg-accent animate-ping"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <BandwidthConfigurator id="bandwidth-configurator" price={price} onPriceChange={setPrice} />
            <SmartPricingForm onApplyRecommendation={setPrice} />
          </div>
        </div>

        <RecentConnections />
      </main>
    </div>
  );
}
