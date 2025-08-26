import Hero from '@/components/hero';
import { Experience } from './experience';
import { FeaturedProduct } from './featuredProduct';
import { Testimonial } from './testimonial';
const PORT = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export default async function Home() {
    const apiData = await fetch(`${PORT}/api/home-page?populate[featuredProducts][populate]=*&populate[heroSlider][populate]=*&populate[experiences][populate]=*&populate[featuredCategories][populate]=*&populate[testimonials][populate]=*`);
    const jsonData = await apiData.json();
    const data = jsonData.data;

    return (
        <div>
            <Hero slider={data.heroSlider} />
            <Experience sectionTitle={data.experienceHeading} experiences={data.experiences} />
            <FeaturedProduct sectionTitle={data.featuredProductsHeading} featuredCategories={data.featuredCategories} />
            <Testimonial sectionTitle={data.testimonialsHeading} testimonials={data.testimonials} />
        </div>
    );
}
