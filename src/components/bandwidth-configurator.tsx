'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Zap } from 'lucide-react';

export default function BandwidthConfigurator() {
  const [download, setDownload] = useState(50);
  const [upload, setUpload] = useState(20);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bandwidth Allocation</CardTitle>
        <CardDescription>Specify the bandwidth you want to share.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="download-speed">Download Speed: {download} Mbps</Label>
          <Slider
            id="download-speed"
            defaultValue={[download]}
            max={100}
            step={1}
            onValueChange={(value) => setDownload(value[0])}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="upload-speed">Upload Speed: {upload} Mbps</Label>
          <Slider
            id="upload-speed"
            defaultValue={[upload]}
            max={100}
            step={1}
            onValueChange={(value) => setUpload(value[0])}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price per GB</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
            <Input id="price" type="number" placeholder="0.50" className="pl-7" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Zap className="mr-2 h-4 w-4" />
          Start Sharing
        </Button>
      </CardFooter>
    </Card>
  );
}
