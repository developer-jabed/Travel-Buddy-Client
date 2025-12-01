import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const topTravelers = [
  { name: "Alice", age: 25, city: "Dhaka", rating: 4.8 },
  { name: "Bob", age: 28, city: "Sylhet", rating: 4.7 },
  { name: "Charlie", age: 22, city: "Bandarban", rating: 4.9 },
];

export function TopTravelers() {
  return (
    <section className="py-16 px-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">Top Travel Buddies</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topTravelers.map((traveler) => (
          <Card key={traveler.name} className="p-4">
            <CardHeader>
              <CardTitle>{traveler.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Age: {traveler.age}</p>
              <p>City: {traveler.city}</p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                {traveler.rating}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
