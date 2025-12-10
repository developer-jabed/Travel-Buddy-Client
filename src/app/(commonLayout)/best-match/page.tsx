import RecommendedTravelersPage from "@/components/modules/Best-match/BestMatch";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BestMatch({ searchParams }: any) {
  return (
    <div className="space-y-8 container mx-auto px-4 py-8">
      <RecommendedTravelersPage />
    </div>
  );
}
