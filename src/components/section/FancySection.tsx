import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FancySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Fancy Section</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white rounded-lg shadow-lg">
          Content 1
        </div>
        <div className="p-6 bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 text-white rounded-lg shadow-lg">
          Content 2
        </div>
        <div className="p-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white rounded-lg shadow-lg">
          Content 3
        </div>
      </div>
    </section>
  );
}
