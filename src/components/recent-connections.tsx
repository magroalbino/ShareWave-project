import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import UserRating from '@/components/user-rating';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import type { Connection } from '@/lib/types';


const mockConnections = [
  {
    user: {
      name: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      avatar: 'https://placehold.co/40x40.png?text=OM'
    },
    dataTransferred: '12.5 GB',
    duration: '3h 45m',
    rating: 4.8,
    status: 'Completed',
  },
  {
    user: {
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      avatar: 'https://placehold.co/40x40.png?text=JL'
    },
    dataTransferred: '5.2 GB',
    duration: '1h 12m',
    rating: 5.0,
    status: 'Completed',
  },
  {
    user: {
      name: 'Isabella Nguyen',
      email: 'isabella.nguyen@email.com',
      avatar: 'https://placehold.co/40x40.png?text=IN'
    },
    dataTransferred: '24.1 GB',
    duration: '8h 2m',
    rating: 4.5,
    status: 'Active',
  },
  {
    user: {
      name: 'William Kim',
      email: 'will@email.com',
      avatar: 'https://placehold.co/40x40.png?text=WK'
    },
    dataTransferred: '2.3 GB',
    duration: '0h 30m',
    rating: 4.9,
    status: 'Completed',
  },
  {
    user: {
      name: 'Sophia Davis',
      email: 'sophia@email.com',
      avatar: 'https://placehold.co/40x40.png?text=SD'
    },
    dataTransferred: '8.9 GB',
    duration: '2h 15m',
    rating: 3.9,
    status: 'Failed',
  },
];

async function getConnections(): Promise<(Partial<Connection> & { user: { name: string; email: string; avatar: string }})[]> {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    console.log("Firebase config not found, using mock data for recent connections.");
    return mockConnections;
  }
  
  try {
    const connectionsCol = collection(db, 'connections');
    const q = query(connectionsCol, orderBy('timestamp', 'desc'), limit(5));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        console.log("No documents in 'connections' collection. Displaying fallback data. Please add some documents to your Firestore database with a 'timestamp' field.");
        return mockConnections;
    }

    const connections = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Connection[];
    
    return connections;
  } catch (e) {
    console.error("Failed to fetch connections from Firestore. Your database might not be set up correctly yet. Falling back to mock data.", e);
    return mockConnections;
  }
}

export default async function RecentConnections() {
  const connections = await getConnections();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Connections</CardTitle>
        <CardDescription>
          {process.env.NEXT_PUBLIC_FIREBASE_API_KEY 
            ? "An overview of your recent sharing activity from Firestore."
            : "An overview of your recent sharing activity (using mock data)."
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Data Transferred</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {connections.map((connection, index) => (
              <TableRow key={connection.id || index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={connection.user.avatar} alt="Avatar" data-ai-hint="user avatar" />
                      <AvatarFallback>{connection.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                      <p className="font-medium">{connection.user.name}</p>
                      <p className="text-sm text-muted-foreground">{connection.user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{connection.dataTransferred}</TableCell>
                <TableCell>{connection.duration}</TableCell>
                <TableCell>
                  <UserRating rating={connection.rating} />
                </TableCell>
                <TableCell className="text-right">
                   <Badge
                    variant={
                      connection.status === 'Completed'
                        ? 'default'
                        : connection.status === 'Active'
                        ? 'outline'
                        : 'destructive'
                    }
                    className={connection.status === 'Active' ? 'text-accent-foreground bg-accent/20 border-accent' : connection.status === 'Completed' ? 'bg-primary/20 text-primary-foreground border-primary/20 hover:bg-primary/30' : ''}
                  >
                    {connection.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
