const travelCategories = [
  { name: "Adventure", emoji: "🌄" },
  { name: "Beach", emoji: "🏝" },
  { name: "Culture", emoji: "🕌" },
  { name: "Hiking", emoji: "🥾" },
  { name: "Festival", emoji: "🎵" },
  { name: "Wellness", emoji: "🧘" },
];

export function TravelCategories() {
  return (
    <section className="py-16 px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Travel Styles</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
        {travelCategories.map((category) => (
          <div key={category.name} className="p-6 border rounded-lg hover:shadow-lg transition">
            <span className="text-3xl block mb-2">{category.emoji}</span>
            <span className="font-semibold">{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
