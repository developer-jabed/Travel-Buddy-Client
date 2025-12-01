import { Card, CardContent, CardTitle } from "@/components/ui/card";

const featuredDestinations = [
  { name: "Cox's Bazar", img: "/images/cox-bazar.jpg" },
  { name: "Bandarban", img: "/images/bandarban.jpg" },
  { name: "Sylhet", img: "/images/sylhet.jpg" },
  { name: "Kathmandu", img: "/images/kathmandu.jpg" },
];

export function FeaturedDestinations() {
  return (
    <section className="py-16 px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {featuredDestinations.map((dest) => (
          <Card key={dest.name} className="overflow-hidden">
            <img src={dest.img} alt={dest.name} className="h-48 w-full object-cover" />
            <CardContent>
              <CardTitle>{dest.name}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
