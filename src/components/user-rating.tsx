import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

type UserRatingProps = {
  rating: number;
  maxRating?: number;
  className?: string;
};

export default function UserRating({ rating, maxRating = 5, className }: UserRatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
      ))}
      {halfStar && <StarHalf className="h-4 w-4 text-yellow-400 fill-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground/50" />
      ))}
    </div>
  );
}
