import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RecommendationSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-pulse">
      <div className="text-center mb-6">
        <Skeleton className="h-8 w-64 mx-auto mb-2 bg-purple-800/30" />
        <Skeleton className="h-4 w-96 mx-auto bg-purple-800/20" />
      </div>
      
      {/* Three recommendation cards */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="tubi-card border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-gray-800/20">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Skeleton className="w-16 h-24 rounded-lg bg-purple-800/40" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-48 bg-purple-800/30" />
                <Skeleton className="h-4 w-full bg-purple-800/20" />
                <Skeleton className="h-4 w-3/4 bg-purple-800/20" />
                <div className="flex gap-2 mt-3">
                  <Skeleton className="h-6 w-16 rounded-full bg-purple-800/30" />
                  <Skeleton className="h-6 w-20 rounded-full bg-purple-800/30" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}