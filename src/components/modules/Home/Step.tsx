const steps = [
  { title: "Create Profile", desc: "Sign up and set up your traveler profile." },
  { title: "Find a Travel Buddy", desc: "Browse trips and connect with like-minded travelers." },
  { title: "Start Exploring", desc: "Go on adventures together and make memories." },
];

export function HowItWorks() {
  return (
    <section className="py-16 px-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">How Travel Buddy Works</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {steps.map((step, i) => (
          <div key={i} className="p-6 border rounded-lg max-w-xs text-center hover:shadow-lg transition">
            <div className="text-4xl font-bold mb-4">{i + 1}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
