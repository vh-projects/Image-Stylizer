import HeroSection from "./HeroSection";
import ImageCarousel from "./ImageCarousel";
import ArtShowcase from "./ArtShowcase";

const HomePage = () => {
  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Carousel Section */}
      <section className="relative z-20 w-full flex items-center justify-center from-black via-gray-900 to-black">
        <ImageCarousel />
      </section>

      <section className="relative w-full items-center justify-center from-black via-gray-900 to-black">
        <ArtShowcase />
        
      </section>
    </main>
  );
};

export default HomePage;
