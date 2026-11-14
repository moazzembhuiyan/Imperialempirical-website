import ArticlesSection from '@/component/Home/ArticleSection';
import CreativeGallery from '@/component/Home/CreativeGallery';
import Hero from '@/component/Home/Hero';
import PhilosophySection from '@/component/Home/Philosophy-section';
import EventsSection from '@/component/Home/RecentEventSection';
import ProductsSection from '@/component/Home/RecentThreeProduct';

export const metadata = {
  title: 'Empirical - Website | Home',
  description:
    'Empirical is a cutting-edge platform that leverages advanced technologies to provide innovative solutions for data analysis, visualization, and decision-making. Our mission is to empower businesses and individuals with the tools they need to harness the power of their data effectively.',
};

export default function Home() {
  return (
    <div className="z-10 min-h-screen overflow-hidden !px-3 sm:!px-6 md:!px-10 lg:!mx-auto lg:w-[94%] !w-full 2xl:!max-w-[1920px] !space-y-12 md:!space-y-24 !pt-4">
      <Hero />
      <ProductsSection />
      <PhilosophySection />
      <EventsSection />
      <CreativeGallery />
      <ArticlesSection />
    </div>
  );
}
