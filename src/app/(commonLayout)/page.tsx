import Head from "next/head";
import Hero from "@/components/modules/Home/Hero";
import TravelerRecomendedCarousel from "@/components/modules/Home/Recomended";
import PopularTripsTextGrid from "@/components/modules/Home/PopularTrips";
import TravelCategories from "@/components/modules/Home/Categories";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";
import FancySubscriptionSection from "@/components/modules/Home/Subscription";
import HowItWorksPage from "@/components/modules/Home/HowItWork";
import TestimonialCarousel from "@/components/modules/Home/testiminal";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Travel Buddy Powered - Find Your Best Destination With Perfect Person
        </title>
        <meta
          name="description"
          content="Discover top-rated destinations tailored to your needs with our AI-powered Travel Buddy platform. Get personalized recommendations and book Subscription effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col gap-8">
        {/* Hero Section */}
        <section className="pt-5">
          <Hero />
        </section>

        {/* Recommended Travelers Carousel */}
        <section className="pt-5">
          <TravelerRecomendedCarousel />
        </section>

        {/* Popular Trips */}
        <section className="pt-5">
          <PopularTripsTextGrid />
        </section>

        {/* Travel Categories */}
        <section className="pt-5">
          <TravelCategories />
        </section>

        {/* Why Choose Us */}
        <section className="pt-5">
          <WhyChooseUs />
        </section>

        {/* Subscription Section */}
        <section className="pt-5">
          <FancySubscriptionSection />
        </section>

        {/* How It Works */}
        <section className="pt-5">
          <HowItWorksPage />
        </section>

        {/* Testimonials */}
        <section className="pt-5 pb-5">
          <TestimonialCarousel />
        </section>
      </main>
    </>
  );
}
