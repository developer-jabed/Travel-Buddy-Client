import { FeaturedDestinations } from "@/components/modules/Home/BestDestination";
import { TravelCategories } from "@/components/modules/Home/Categories";
import Hero from "@/components/modules/Home/Hero";
import { HowItWorks } from "@/components/modules/Home/Step";
import { TopTravelers } from "@/components/modules/Home/topTravelers";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Travel Buddy Powered - Find Your Best  Destination With  Perfect Person</title>
        <meta
          name="description"
          content="Discover top-rated destination tailored to your needs with our AI-powered Travel Buddy platform. Get personalized recommendations and book Subscription effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        {/* <FeaturedDestinations />
        <TravelCategories />
        <TopTravelers />
        <HowItWorks /> */}
      </main>
    </>
  );
}
