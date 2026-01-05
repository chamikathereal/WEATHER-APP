import React, { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import { Calendar } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

interface ExtendedForecastProps {
    dailyForecast: any[];
    activeDate: string;
    onDaySelect: (day: any, index: number) => void;
}

const ExtendedForecast: React.FC<ExtendedForecastProps> = ({ dailyForecast, activeDate, onDaySelect }) => {
    return (
        <div className="bg-black/20 backdrop-blur-2xl rounded-[32px] p-6 border border-white/10 shadow-xl min-w-0">
            <div className="flex items-center gap-2 mb-4 opacity-50">
                <Calendar size={16} />
                <h2 className="text-xs font-bold tracking-wider uppercase">Extended Forecast</h2>
            </div>
            
            <Swiper
                modules={[FreeMode, Pagination]}
                freeMode={true}
                pagination={{ clickable: true }}
                spaceBetween={12}
                slidesPerView={2}
                className="w-full px-2 pb-8"
                breakpoints={{
                    480: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 }
                }}
            >
                {dailyForecast.map((day, index) => {
                    const dateStr = day.dt_txt.split(' ')[0];
                    const isDaySelected = activeDate === dateStr;
                    const dayLabel = index === 0 ? "Today" : new Date(day.dt_txt.replace(' ', 'T')).toLocaleDateString('en-US', { weekday: 'short' });

                    return (
                        <SwiperSlide key={index} className="py-2">
                            <div 
                                onClick={() => onDaySelect(day, index)}
                                className={`
                                    flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer h-full
                                    ${isDaySelected 
                                        ? "bg-blue-500/20 border-blue-400/50 shadow-[0_0_8px_rgba(96,165,250,0.3)] scale-105" 
                                        : "bg-white/5 border-white/5 hover:bg-white/10"
                                    }
                                `}
                            >
                                <span className="mb-2 text-xs font-bold tracking-wide uppercase opacity-70">{dayLabel}</span>
                                <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="icon" className="w-12 h-12 mb-1" loading="lazy" />
                                <span className="text-2xl font-bold tracking-tight">{Math.round(day.main.temp)}°</span>
                                <span className="text-[10px] opacity-50 capitalize mt-1 line-clamp-1">{day.weather[0].description}</span>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default memo(ExtendedForecast);