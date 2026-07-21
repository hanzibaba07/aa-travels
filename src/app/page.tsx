import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { FeaturedHotels } from "@/components/sections/featured-hotels";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <FeaturedHotels />
      <Stats />
      <Testimonials />
      <Newsletter />
    </>
  );
}
