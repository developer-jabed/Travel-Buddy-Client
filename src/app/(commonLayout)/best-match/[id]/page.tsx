import TravelerDetailsClient from "@/components/modules/Best-match/traveler-details/travelerdetails";
import { getTravelerById } from "@/services/Traveler/RecomendedTraveler";
export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function TravelerDetailsPage({ params }: any) {
  const { id } = await params; // Required for Next.js 15 server handling

  const traveler = await getTravelerById(id);
  // console.log("Traveler:",traveler)

  if (!traveler?.success || !traveler?.data) {
    return (
      <p className="text-red-500 text-center mt-10">
        {traveler?.message || "Traveler not found."}
      </p>
    );
  }

  // Pass traveler data to client component
  return <TravelerDetailsClient traveler={traveler.data} />;
}
