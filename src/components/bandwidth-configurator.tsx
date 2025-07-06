'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Loader2, Zap } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';


export default function BandwidthConfigurator({ id, price, onPriceChange }: { id?: string; price: number, onPriceChange: (price: number) => void }) {
  const [download, setDownload] = useState(50);
  const [upload, setUpload] = useState(20);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleStartSharing = async () => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      toast({
        variant: 'destructive',
        title: 'Firebase Not Configured',
        description: 'Please configure Firebase in your .env file to start sharing.',
      });
      return;
    }
    setLoading(true);

    const mockUsers = [
      { name: 'Alex Johnson', email: 'alex@email.com', avatar: 'https://placehold.co/40x40.png?text=AJ' },
      { name: 'Ben Carter', email: 'ben.c@email.com', avatar: 'https://placehold.co/40x40.png?text=BC' },
      { name: 'Casey Day', email: 'casey.day@email.com', avatar: 'https://placehold.co/40x40.png?text=CD' },
    ];
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];

    try {
      await addDoc(collection(db, 'connections'), {
        downloadSpeed: download,
        uploadSpeed: upload,
        pricePerGB: price,
        status: 'Active',
        timestamp: serverTimestamp(),
        user: randomUser,
        dataTransferred: `${(Math.random() * 5).toFixed(1)} GB`,
        duration: `0h ${Math.floor(Math.random() * 30 + 5)}m`,
        rating: +(Math.random() * (5 - 4) + 4).toFixed(1),
      });
      toast({
        title: 'Success!',
        description: 'New connection is active. Check the "Recent Connections" table.',
      });
    } catch (error) {
      console.error('Error starting sharing session:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not start sharing session. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card id={id}>
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
            <Input id="price" type="number" value={price} onChange={(e) => onPriceChange(parseFloat(e.target.value) || 0)} placeholder="0.50" className="pl-7" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleStartSharing} disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Zap className="mr-2 h-4 w-4" />
          )}
          Start Sharing
        </Button>
      </CardFooter>
    </Card>
  );
}
