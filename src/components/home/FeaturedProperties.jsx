import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import SectionHeading from '../common/SectionHeading';
import ListingCard from '../common/ListingCard';
import { rentals, lands, designs } from '../../data/catalog';

// Combine a few items from different categories to feature
const featuredProperties = [
  { ...rentals[0], category: 'Rental', path: `/catalog/rentals/${rentals[0].id}` },
  { ...lands[0], category: 'Land', path: `/catalog/lands/${lands[0].id}`, price: lands[0].price },
  { ...designs[0], category: 'Design', path: `/catalog/designs/${designs[0].id}`, price: 'Consult' },
  { ...rentals[1], category: 'Rental', path: `/catalog/rentals/${rentals[1].id}` },
  { ...lands[1], category: 'Land', path: `/catalog/lands/${lands[1].id}`, price: lands[1].price },
];

export default function FeaturedProperties() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container">
        <SectionHeading
          subtitle="Featured"
          title="Explore Our Top Properties"
          description="Discover a selection of our finest properties, from luxury rentals to prime development lands."
        />

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12" // Add padding for pagination
        >
          {featuredProperties.map((property) => (
            <SwiperSlide key={`${property.category}-${property.id}`}>
              <ListingCard {...property} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}