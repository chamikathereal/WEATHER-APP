import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import { Clock } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

// Define custom styles for the pagination dots
const paginationStyles = `
  .swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.5) !important;
    opacity: 1 !important;
  }
  .swiper-pagination-bullet-active {
    background: #ffffff !important;
  }
  .swiper-pagination {
    bottom: 0px !important;
  }
`;

interface HourlyForecastProps {
    data: any[];
    selectedForecast: any;
    onHourSelect: (hour: any) => void;
    activeDate: string;
    isToday: boolean;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data, selectedForecast, onHourSelect, activeDate, isToday }) => {
    return (
        // Updated container style for premium glass effect
        <div className="md:col-span-2 bg-black/20 backdrop-blur-2xl rounded-[32px] p-6 border border-white/10 flex flex-col min-w-0 justify-center relative shadow-xl">
            <style>{paginationStyles}</style>

            <div className="flex items-center gap-2 mb-2 opacity-50 px-2">
                <Clock size={14} />
                <h2 className="text-xs font-bold uppercase tracking-wider">
                    {isToday ? "Hourly Forecast (Next 24h)" : `Hourly Forecast (${new Date(activeDate).toLocaleDateString(undefined, { weekday: 'short' })})`}
                </h2>
            </div>
            
            {data.length > 0 ? (
                <Swiper
                    modules={[FreeMode, Pagination]}
                    freeMode={true}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    spaceBetween={12}
                    slidesPerView={4}
                    className="w-full py-2 pb-8" 
                    breakpoints={{
                        320: { slidesPerView: 3 },
                        640: { slidesPerView: 5 },
                        1024: { slidesPerView: 6 }
                    }}
                >
                    {data.map((hour, idx) => {
                        const isSelected = selectedForecast?.dt === hour.dt;
                        return (
                            <SwiperSlide key={idx} className="flex flex-col items-center justify-center h-auto">
                                <div 
                                    onClick={() => onHourSelect(hour)}
                                    className={`
                                        flex flex-col items-center p-3 rounded-2xl border transition-all duration-300 cursor-pointer w-full
                                        ${isSelected 
                                            ? "bg-white/20 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105" 
                                            : "bg-white/5 border-white/5 hover:bg-white/10"
                                        }
                                    `}
                                >
                                    <span className="text-[10px] opacity-60 font-medium whitespace-nowrap mb-1">
                                        {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="icon" className="w-10 h-10 mb-1" />
                                    <span className="text-lg font-bold">{Math.round(hour.main.temp)}°</span>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            ) : (
                <div className="h-full flex items-center justify-center opacity-50 text-sm">
                    No hourly data available
                </div>
            )}
        </div>
    );
};

export default HourlyForecast;