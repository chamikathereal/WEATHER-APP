import React, { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import StatCard from './StatCard';

interface StatsDisplayProps {
    stats: any[];
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
    return (
        <div className="w-full min-w-0">
            <Swiper
                modules={[Pagination]}
                spaceBetween={12}
                slidesPerView={2}
                pagination={{ clickable: true }}
                className="px-2 pb-10"
                breakpoints={{
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 }
                }}
            >
                {stats.map((stat, index) => (
                    <SwiperSlide key={index} className="flex justify-center h-full py-1">
                        <StatCard {...stat} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default memo(StatsDisplay);